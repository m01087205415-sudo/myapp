import React, { useState } from 'react';
import { GitCompare, Play, Copy, Check, Clock, Layers } from 'lucide-react';
import { DocumentItem } from '../../types';

interface ABCompareProps {
  document: DocumentItem;
}

export const ABCompare: React.FC<ABCompareProps> = ({ document }) => {
  const [promptA, setPromptA] = useState<string>(
    `Summarize the key points and deliverables of "{{doc_title}}" in 4 concise executive bullet points.`
  );
  const [promptB, setPromptB] = useState<string>(
    `Perform a thorough risk audit on "{{doc_title}}". Identify 3 uncapped liabilities or operational vulnerabilities, quote the exact clause or statement, and recommend mitigations.`
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultA, setResultA] = useState<{ text: string; latencyMs: number } | null>(null);
  const [resultB, setResultB] = useState<{ text: string; latencyMs: number } | null>(null);
  const [copiedA, setCopiedA] = useState<boolean>(false);
  const [copiedB, setCopiedB] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRunComparison = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setResultA(null);
    setResultB(null);

    const compiledA = promptA.replace(/\{\{\s*doc_title\s*\}\}/g, document.title);
    const compiledB = promptB.replace(/\{\{\s*doc_title\s*\}\}/g, document.title);

    try {
      const response = await fetch('/api/gemini/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptA: compiledA,
          promptB: compiledB,
          documentContext: document.content,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Comparison failed');
      }

      setResultA(data.resultA);
      setResultB(data.resultB);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Comparison request failed');
    } finally {
      setIsLoading(false);
    }
  };

  const copyText = (text: string, isA: boolean) => {
    navigator.clipboard.writeText(text);
    if (isA) {
      setCopiedA(true);
      setTimeout(() => setCopiedA(false), 2000);
    } else {
      setCopiedB(true);
      setTimeout(() => setCopiedB(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full p-5 overflow-y-auto bg-slate-950">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-indigo-400" />
              Side-by-Side Prompt Evaluation (A/B)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Benchmark two different prompt variations against the active document simultaneously using Gemini 3.8 Flash.
            </p>
          </div>

          <button
            onClick={handleRunComparison}
            disabled={isLoading || !promptA.trim() || !promptB.trim()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm shadow-indigo-600/30 transition-all shrink-0"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Benchmarking Both Prompts...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run A/B Benchmark</span>
              </>
            )}
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="my-3 p-3 bg-rose-950/40 border border-rose-800/60 rounded text-rose-300 text-xs">
          {errorMessage}
        </div>
      )}

      {/* Side by Side Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {/* Prompt Variant A */}
        <div className="flex flex-col bg-slate-900/50 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              Prompt Variant A
            </span>
            {resultA?.latencyMs && (
              <span className="text-xs font-mono tabular-nums text-emerald-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {resultA.latencyMs}ms
              </span>
            )}
          </div>

          <textarea
            value={promptA}
            onChange={(e) => setPromptA(e.target.value)}
            rows={3}
            className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-xs text-slate-200 font-mono resize-none focus:outline-none focus:border-indigo-500 mb-3"
            placeholder="Prompt A template..."
          />

          <div className="flex-1 bg-slate-950 border border-slate-800/80 rounded p-3 overflow-y-auto min-h-[220px]">
            {resultA ? (
              <div>
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => copyText(resultA.text, true)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                  >
                    {copiedA ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedA ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed select-text font-sans">
                  {resultA.text}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-600 text-xs italic">
                Output for Prompt A will appear here
              </div>
            )}
          </div>
        </div>

        {/* Prompt Variant B */}
        <div className="flex flex-col bg-slate-900/50 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Prompt Variant B
            </span>
            {resultB?.latencyMs && (
              <span className="text-xs font-mono tabular-nums text-emerald-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {resultB.latencyMs}ms
              </span>
            )}
          </div>

          <textarea
            value={promptB}
            onChange={(e) => setPromptB(e.target.value)}
            rows={3}
            className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-xs text-slate-200 font-mono resize-none focus:outline-none focus:border-amber-500 mb-3"
            placeholder="Prompt B template..."
          />

          <div className="flex-1 bg-slate-950 border border-slate-800/80 rounded p-3 overflow-y-auto min-h-[220px]">
            {resultB ? (
              <div>
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => copyText(resultB.text, false)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                  >
                    {copiedB ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedB ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed select-text font-sans">
                  {resultB.text}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-600 text-xs italic">
                Output for Prompt B will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
