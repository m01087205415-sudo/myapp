import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '15mb' }));

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set. Requests will fail if API is called.');
  }
  return new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Route: Standard Prompt Execution with document context
app.post('/api/gemini/generate', async (req, res) => {
  try {
    const { prompt, documentContext, systemInstruction, responseMimeType, schema } = req.body;

    if (!prompt && !documentContext) {
      return res.status(400).json({ error: 'Prompt or document context is required.' });
    }

    const ai = getGeminiClient();

    let fullContents = prompt;
    if (documentContext && !prompt.includes(documentContext)) {
      fullContents = `[DOCUMENT CONTEXT START]\n${documentContext}\n[DOCUMENT CONTEXT END]\n\nTASK / PROMPT:\n${prompt}`;
    }

    const config: any = {};
    if (systemInstruction) {
      config.systemInstruction = systemInstruction;
    }
    if (responseMimeType) {
      config.responseMimeType = responseMimeType;
    }
    if (schema) {
      config.responseSchema = schema;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: fullContents,
      config: Object.keys(config).length > 0 ? config : undefined,
    });

    return res.json({
      text: response.text || '',
      usageMetadata: response.usageMetadata,
    });
  } catch (error: any) {
    console.error('Error generating content:', error);
    const status = error?.status || 500;
    const message = error?.message || 'Failed to process document prompt';
    return res.status(status).json({ error: message });
  }
});

// API Route: Streaming Prompt Execution
app.post('/api/gemini/stream', async (req, res) => {
  try {
    const { prompt, documentContext, systemInstruction } = req.body;

    if (!prompt && !documentContext) {
      return res.status(400).json({ error: 'Prompt or document context is required.' });
    }

    const ai = getGeminiClient();

    let fullContents = prompt;
    if (documentContext && !prompt.includes(documentContext)) {
      fullContents = `[DOCUMENT CONTEXT START]\n${documentContext}\n[DOCUMENT CONTEXT END]\n\nTASK / PROMPT:\n${prompt}`;
    }

    const config: any = {};
    if (systemInstruction) {
      config.systemInstruction = systemInstruction;
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const streamResponse = await ai.models.generateContentStream({
      model: 'gemini-3.8-flash',
      contents: fullContents,
      config: Object.keys(config).length > 0 ? config : undefined,
    });

    for await (const chunk of streamResponse) {
      const text = chunk.text || '';
      res.write(`data: ${JSON.stringify({ text })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('Streaming error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: error?.message || 'Streaming failed' });
    } else {
      res.write(`data: ${JSON.stringify({ error: error?.message || 'Stream disrupted' })}\n\n`);
      res.end();
    }
  }
});

// API Route: Side-by-Side Prompt Comparison
app.post('/api/gemini/compare', async (req, res) => {
  try {
    const { promptA, promptB, documentContext, systemInstructionA, systemInstructionB } = req.body;

    if (!promptA || !promptB) {
      return res.status(400).json({ error: 'Both promptA and promptB are required for comparison.' });
    }

    const ai = getGeminiClient();

    const buildContent = (p: string) => {
      if (documentContext && !p.includes(documentContext)) {
        return `[DOCUMENT CONTEXT START]\n${documentContext}\n[DOCUMENT CONTEXT END]\n\nTASK / PROMPT:\n${p}`;
      }
      return p;
    };

    const startA = Date.now();
    const runA = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: buildContent(promptA),
      config: systemInstructionA ? { systemInstruction: systemInstructionA } : undefined,
    }).then((r) => ({ text: r.text || '', latencyMs: Date.now() - startA, usage: r.usageMetadata }))
      .catch((err) => ({ text: `Error: ${err.message}`, latencyMs: Date.now() - startA, error: true }));

    const startB = Date.now();
    const runB = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: buildContent(promptB),
      config: systemInstructionB ? { systemInstruction: systemInstructionB } : undefined,
    }).then((r) => ({ text: r.text || '', latencyMs: Date.now() - startB, usage: r.usageMetadata }))
      .catch((err) => ({ text: `Error: ${err.message}`, latencyMs: Date.now() - startB, error: true }));

    const [resultA, resultB] = await Promise.all([runA, runB]);

    return res.json({ resultA, resultB });
  } catch (error: any) {
    console.error('Error comparing prompts:', error);
    return res.status(500).json({ error: error?.message || 'Failed to compare prompts' });
  }
});

// API Route: Multi-turn Q&A Interrogation over Document
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { messages, documentContext } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are an expert Document Intelligence Analyst. You have direct access to the provided source document.
Answer user inquiries strictly grounded in the document content. Always quote specific clauses, sections, figures, or verbatim evidence where appropriate.
If information is not explicitly mentioned or cannot be inferred with certainty from the text, clearly state that the document does not contain that information.

Source Document:
"""
${documentContext || ''}
"""`;

    // Map conversation into contents
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
      },
    });

    return res.json({
      reply: response.text || '',
      usageMetadata: response.usageMetadata,
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    return res.status(500).json({ error: error?.message || 'Chat query failed' });
  }
});

// Setup Vite in Dev or Static in Production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`DocuPrompt Studio server running on port ${port} (mode: ${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
