import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Eye,
  Sliders,
  Sparkles,
  Terminal,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  Radio,
  FileJson,
} from 'lucide-react';
import { DocumentItem, PromptVariable } from '../../types';
import { resolvePromptVariables } from '../../utils/documentUtils';

interface PromptSandboxProps {
  document: DocumentItem;
  selectedText: string;
}

export const PromptSandbox: React.FC<PromptSandboxProps> = ({
  document,
  selectedText,
}) => {
  const [promptTemplate, setPromptTemplate] = useState<string>(
    `Analyze the key commitments, critical liabilities, and structural risks in "{{doc_title}}".\n\nStructure your assessment as follows:\n1. Executive Synthesis & Scope\n2. Key Operational & Financial Commitments\n3. Highest Liability Exposure Points\n4. Recommended Protective Actions\n\nTone: {{tone}}\nTarget Decision Maker: {{audience}}\n\nDocument Context:\n"""\n{{document_full}}\n"""`
  );

  const [systemInstruction, setSystemInstruction] = useState<string>(
    'You are an expert Document Intelligence Analyst. Provide direct, objective, highly rigorous analysis strictly grounded in the provided document text.'
  );
  const [showSystemInstruction, setShowSystemInstruction] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [useStreaming, setUseStreaming] = useState<boolean>(true);

  // Dynamic variables
  const [variables, setVariables] = useState<PromptVariable[]>([
    { key: 'tone', label: 'Tone', value: 'Objective, executive, rigorous' },
    { key: 'audience', label: 'Audience', value: 'General Counsel & Chief Financial Officer' },
  ]);

  // Execution state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultText, setResultText] = useState<string>('');
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [tokenUsage, setTokenUsage] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Compute resolved prompt for live preview
  const varMap: Record<string, string> = {};
  variables.forEach((v) => {
    varMap[v.key] = v.value;
  });
  const compiledPrompt = resolvePromptVariables(
    promptTemplate,
    varMap,
    document.content,
    document.title,
    selectedText
  );

  const handleInsertToken = (token: string) => {
    setPromptTemplate((prev) => `${prev} {{${token}}}`);
  };

  const handleUpdateVariable = (index: number, val: string) => {
    const updated = [...variables];
    updated[index].value = val;
    setVariables(updated);
  };

  const handleAddVariable = () => {
    const newKey = `var_${variables.length + 1}`;
    setVariables([...variables, { key: newKey, label: `Custom Var ${variables.length + 1}`, value: '' }]);
    setPromptTemplate((prev) => `${prev}\n{{${newKey}}}`);
  };

  const handleExecute = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setResultText('');
    setLatencyMs(null);
    setTokenUsage(null);

    const startTime = Date.now();

    try {
      if (useStreaming) {
        const response = await fetch('/api/gemini/stream', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: compiledPrompt,
            documentContext: document.content,
            systemInstruction: systemInstruction.trim() || undefined,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Server responded with ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('Readable stream not supported');

        const decoder = new TextDecoder();
        let buffer = '';
        let accumulated = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6).trim();
              if (dataStr === '[DONE]') break;
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.text) {
                  accumulated += parsed.text;
                  setResultText(accumulated);
                }
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
              } catch (e) {
                // Ignore parse errors on partial chunks
              }
            }
          }
        }
        setLatencyMs(Date.now() - startTime);
      } else {
        const response = await fetch('/api/gemini/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: compiledPrompt,
            documentContext: document.content,
            systemInstruction: systemInstruction.trim() || undefined,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to generate response');
        }

        setResultText(data.text || '');
        setTokenUsage(data.usageMetadata || null);
        setLatencyMs(Date.now() - startTime);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'An error occurred during prompt execution.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Studio Header / Variable Token Bar */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/60 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Document Context Tokens (Click to Insert)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border transition-colors ${
                showPreview
                  ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                  : 'text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              {showPreview ? 'Hide Compiled' : 'Live Preview'}
            </button>
            <button
              onClick={() => setShowSystemInstruction(!showSystemInstruction)}
              className="flex items-center gap-1 px-2 py-1 text-xs text-slate-400 hover:text-slate-200 rounded-md border border-slate-800 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5" />
              System Persona
              {showSystemInstruction ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Token Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleInsertToken('document_full')}
            className="px-2 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded border border-indigo-500/30 transition-colors"
            title="Inject entire active document"
          >
            + &#123;&#123;document_full&#125;&#125;
          </button>
          <button
            onClick={() => handleInsertToken('selected_text')}
            className={`px-2 py-1 text-xs font-mono rounded border transition-colors ${
              selectedText
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="Inject text highlighted in Reader"
          >
            + &#123;&#123;selected_text&#125;&#125; {selectedText ? '✓ active' : ''}
          </button>
          <button
            onClick={() => handleInsertToken('doc_title')}
            className="px-2 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
            title="Inject active document title"
          >
            + &#123;&#123;doc_title&#125;&#125;
          </button>

          {variables.map((v) => (
            <button
              key={v.key}
              onClick={() => handleInsertToken(v.key)}
              className="px-2 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-amber-300 rounded border border-amber-500/30 transition-colors"
              title={`Inject variable: ${v.label}`}
            >
              + &#123;&#123;{v.key}&#125;&#125;
            </button>
          ))}

          <button
            onClick={handleAddVariable}
            className="px-2 py-1 text-xs text-slate-400 hover:text-white border border-dashed border-slate-700 rounded hover:border-slate-500 transition-colors"
          >
            + New Variable
          </button>
        </div>

        {/* Collapsible System Instruction */}
        {showSystemInstruction && (
          <div className="mt-3 pt-3 border-t border-slate-800">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              System Instruction / Persona Steering
            </label>
            <textarea
              value={systemInstruction}
              onChange={(e) => setSystemInstruction(e.target.value)}
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              placeholder="Define model role, constraints, or guardrails..."
            />
          </div>
        )}

        {/* Dynamic Variables Inputs */}
        {variables.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {variables.map((v, i) => (
              <div key={v.key} className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-mono mb-1">
                  &#123;&#123;{v.key}&#125;&#125; ({v.label})
                </span>
                <input
                  type="text"
                  value={v.value}
                  onChange={(e) => handleUpdateVariable(i, e.target.value)}
                  placeholder={`Value for ${v.key}...`}
                  className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor & Execution Split */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left/Top: Prompt Editor Canvas */}
        <div className="flex-1 flex flex-col p-4 border-b lg:border-b-0 lg:border-r border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              Prompt Template Editor
            </span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useStreaming}
                  onChange={(e) => setUseStreaming(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0"
                />
                <span>Stream Token-by-Token</span>
              </label>
            </div>
          </div>

          <div className="flex-1 relative">
            <textarea
              value={promptTemplate}
              onChange={(e) => setPromptTemplate(e.target.value)}
              className="w-full h-full bg-slate-900/60 text-slate-200 font-mono text-xs leading-relaxed p-3.5 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 resize-none"
              placeholder="Compose your document prompt template..."
            />
          </div>

          {/* Action Row */}
          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setPromptTemplate('');
                setResultText('');
              }}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>

            <button
              onClick={handleExecute}
              disabled={isLoading || !promptTemplate.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm shadow-indigo-600/30 transition-all"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Reasoning over Document...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Execute with Gemini 3.8 Flash</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right/Bottom: Live Output Canvas OR Compiled Preview */}
        <div className="flex-1 flex flex-col p-4 bg-slate-950 overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300">
                {showPreview ? 'Compiled Prompt Resolution' : 'Document Intelligence Output'}
              </span>
              {latencyMs !== null && (
                <span className="text-[11px] font-mono tabular-nums text-emerald-400">
                  {latencyMs}ms
                </span>
              )}
            </div>

            {resultText && (
              <button
                onClick={handleCopyOutput}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Output'}</span>
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            {showPreview ? (
              <div className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed select-text">
                {compiledPrompt}
              </div>
            ) : errorMessage ? (
              <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-lg text-rose-300 text-xs">
                <strong className="block font-semibold mb-1">Execution Error:</strong>
                {errorMessage}
              </div>
            ) : resultText ? (
              <div className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed font-sans select-text">
                {resultText}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 text-xs p-6">
                <Sparkles className="w-8 h-8 text-slate-600 mb-2 stroke-1" />
                <p className="font-medium text-slate-400">Ready to execute</p>
                <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                  Compose your prompt with document context tokens and press "Execute with Gemini 3.8 Flash".
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
