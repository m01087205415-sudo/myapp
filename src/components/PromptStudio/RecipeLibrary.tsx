import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  Copy,
  Check,
  Code2,
  Send,
  Layers,
  ShieldAlert,
  FileSpreadsheet,
  Cpu,
  Presentation,
  CheckCircle2,
} from 'lucide-react';
import { DocumentItem, PromptRecipe } from '../../types';
import { PROMPT_RECIPES } from '../../data/promptRecipes';
import { resolvePromptVariables } from '../../utils/documentUtils';

interface RecipeLibraryProps {
  document: DocumentItem;
  onApplyToSandbox: (template: string, sysInst?: string) => void;
}

export const RecipeLibrary: React.FC<RecipeLibraryProps> = ({
  document,
  onApplyToSandbox,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<PromptRecipe>(PROMPT_RECIPES[0]);
  const [variableValues, setVariableValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    PROMPT_RECIPES[0].defaultVariables.forEach((v) => {
      initial[v.key] = v.value;
    });
    return initial;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);

  const handleSelectRecipe = (recipe: PromptRecipe) => {
    setSelectedRecipe(recipe);
    const newVars: Record<string, string> = {};
    recipe.defaultVariables.forEach((v) => {
      newVars[v.key] = v.value;
    });
    setVariableValues(newVars);
    setResultText('');
    setErrorMessage(null);
    setLatencyMs(null);
  };

  const handleExecuteRecipe = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setResultText('');
    setLatencyMs(null);

    const compiled = resolvePromptVariables(
      selectedRecipe.promptTemplate,
      variableValues,
      document.content,
      document.title
    );

    const startTime = Date.now();

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: compiled,
          documentContext: document.content,
          systemInstruction: selectedRecipe.systemInstruction,
          responseMimeType: selectedRecipe.responseMimeType,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to execute recipe');
      }

      setResultText(data.text || '');
      setLatencyMs(Date.now() - startTime);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Execution error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Attempt to parse JSON if output is JSON
  const isJsonOutput = selectedRecipe.responseMimeType === 'application/json';
  let formattedJson: string | null = null;
  if (isJsonOutput && resultText) {
    try {
      const parsed = JSON.parse(resultText);
      formattedJson = JSON.stringify(parsed, null, 2);
    } catch (e) {
      formattedJson = null;
    }
  }

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      {/* Recipe Catalog Sidebar */}
      <div className="w-full lg:w-80 bg-slate-900/60 border-b lg:border-b-0 lg:border-r border-slate-800 p-4 overflow-y-auto shrink-0 flex flex-col gap-2">
        <div className="mb-2">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Document Prompt Recipes
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Pre-tuned prompt architectures for deep document extraction and reasoning.
          </p>
        </div>

        {PROMPT_RECIPES.map((recipe) => {
          const isSelected = selectedRecipe.id === recipe.id;
          return (
            <div
              key={recipe.id}
              onClick={() => handleSelectRecipe(recipe)}
              className={`p-3 rounded-lg cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-slate-800 border-indigo-500/50 shadow-sm'
                  : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-xs font-semibold text-slate-200">
                  {recipe.title}
                </span>
                <span className="text-[10px] text-indigo-400 font-mono">
                  {recipe.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {recipe.description}
              </p>
              <div className="text-[10px] text-slate-400 mt-2 font-medium">
                Category: {recipe.category}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recipe Configuration & Execution View */}
      <div className="flex-1 flex flex-col p-5 overflow-y-auto bg-slate-950">
        {/* Header of Active Recipe */}
        <div className="pb-4 border-b border-slate-800">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  {selectedRecipe.title}
                </h2>
                <span className="text-xs text-indigo-400 font-mono bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/60">
                  {selectedRecipe.badge}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {selectedRecipe.description}
              </p>
            </div>

            <button
              onClick={() =>
                onApplyToSandbox(
                  selectedRecipe.promptTemplate,
                  selectedRecipe.systemInstruction
                )
              }
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
              title="Open in Prompt Sandbox to customize code"
            >
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              Customize in Sandbox
            </button>
          </div>

          {/* Dynamic Recipe Parameters Form */}
          {selectedRecipe.defaultVariables.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Recipe Parameters & Steering
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedRecipe.defaultVariables.map((v) => (
                  <div key={v.key} className="flex flex-col">
                    <span className="text-[11px] text-slate-400 mb-1 font-medium">
                      {v.label} (&#123;&#123;{v.key}&#125;&#125;)
                    </span>
                    <input
                      type="text"
                      value={variableValues[v.key] ?? v.value}
                      onChange={(e) =>
                        setVariableValues({
                          ...variableValues,
                          [v.key]: e.target.value,
                        })
                      }
                      className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Run Button */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-[11px] text-slate-400">
              Target Document: <strong className="text-slate-300">{document.title}</strong>
            </div>

            <button
              onClick={handleExecuteRecipe}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm shadow-indigo-600/30 transition-all"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing Recipe with Gemini...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Execute Recipe</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Canvas */}
        <div className="mt-4 flex-1 flex flex-col min-h-[300px]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300">
                Recipe Analysis Result
              </span>
              {latencyMs !== null && (
                <span className="text-[11px] font-mono tabular-nums text-emerald-400">
                  {latencyMs}ms
                </span>
              )}
            </div>

            {resultText && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            )}
          </div>

          <div className="flex-1 bg-slate-900/60 border border-slate-800 rounded-lg p-4 overflow-y-auto">
            {errorMessage ? (
              <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded text-rose-300 text-xs">
                {errorMessage}
              </div>
            ) : formattedJson ? (
              <pre className="font-mono text-xs text-indigo-300 leading-relaxed whitespace-pre-wrap select-text">
                {formattedJson}
              </pre>
            ) : resultText ? (
              <div className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed font-sans select-text">
                {resultText}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 text-xs p-6">
                <Sparkles className="w-8 h-8 text-slate-600 mb-2 stroke-1" />
                <p className="font-medium text-slate-400">Recipe ready</p>
                <p className="text-[11px] text-slate-500 mt-1 max-w-sm">
                  Click "Execute Recipe" to generate a tailored {selectedRecipe.title.toLowerCase()} for the active document.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
