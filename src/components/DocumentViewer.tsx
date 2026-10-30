import React, { useState, useRef, useEffect } from 'react';
import {
  Edit3,
  BookOpen,
  Copy,
  Check,
  Download,
  Sparkles,
  Layers,
  Clock,
  Coins,
  FileCode,
} from 'lucide-react';
import { DocumentItem } from '../types';

interface DocumentViewerProps {
  document: DocumentItem;
  onUpdateContent: (id: string, newContent: string) => void;
  onSendSelectionToPrompt: (selection: string) => void;
  jumpLine: number | null;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  onUpdateContent,
  onSendSelectionToPrompt,
  jumpLine,
}) => {
  const [mode, setMode] = useState<'reader' | 'editor'>('reader');
  const [copied, setCopied] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState<{ x: number; y: number } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const readerContainerRef = useRef<HTMLDivElement>(null);

  // Handle text selection in Reader mode
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 10) {
      const text = selection.toString().trim();
      setSelectedText(text);

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectionPosition({
        x: Math.max(20, rect.left + rect.width / 2 - 120),
        y: Math.max(10, rect.top - 46),
      });
    } else {
      setSelectedText('');
      setSelectionPosition(null);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(document.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([document.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${document.title.toLowerCase().replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Jump to section line when requested from outline
  useEffect(() => {
    if (jumpLine && readerContainerRef.current) {
      const lineElements = readerContainerRef.current.querySelectorAll('[data-line]');
      for (const el of lineElements) {
        const lineNum = parseInt(el.getAttribute('data-line') || '0', 10);
        if (lineNum >= jumpLine) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          break;
        }
      }
    }
  }, [jumpLine]);

  // Markdown-like formatting parser for clean reader display
  const renderFormattedLines = () => {
    const lines = document.content.split('\n');
    return lines.map((line, idx) => {
      const lineNum = idx + 1;
      const trimmed = line.trim();

      if (trimmed.startsWith('# ')) {
        return (
          <h1
            key={idx}
            data-line={lineNum}
            className="text-2xl font-bold tracking-tight text-white mt-6 mb-3 pb-2 border-b border-slate-800"
          >
            {trimmed.replace(/^#\s+/, '')}
          </h1>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={idx}
            data-line={lineNum}
            className="text-lg font-bold tracking-tight text-slate-100 mt-5 mb-2"
          >
            {trimmed.replace(/^##\s+/, '')}
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={idx}
            data-line={lineNum}
            className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mt-4 mb-2"
          >
            {trimmed.replace(/^###\s+/, '')}
          </h3>
        );
      }
      if (trimmed === '---') {
        return <hr key={idx} data-line={lineNum} className="border-slate-800 my-4" />;
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <li
            key={idx}
            data-line={lineNum}
            className="ml-5 list-disc text-slate-300 text-sm leading-relaxed my-1"
          >
            {trimmed.replace(/^[-*]\s+/, '')}
          </li>
        );
      }
      if (/^[0-9]+\.\s+/.test(trimmed)) {
        return (
          <div
            key={idx}
            data-line={lineNum}
            className="text-slate-300 text-sm leading-relaxed my-1.5 font-normal pl-2 border-l border-slate-800"
          >
            {trimmed}
          </div>
        );
      }
      if (!trimmed) {
        return <div key={idx} data-line={lineNum} className="h-3" />;
      }
      return (
        <p key={idx} data-line={lineNum} className="text-slate-300 text-sm leading-relaxed my-2">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <section className="flex-1 flex flex-col h-full bg-slate-950 min-w-0 border-r border-slate-800 relative">
      {/* Document Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/40">
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-bold text-white truncate flex items-center gap-2">
            <span>{document.title}</span>
            <span className="text-xs text-slate-400 font-normal">({document.category})</span>
          </h2>
          {/* Metadata Row */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
            <span className="font-mono tabular-nums text-slate-300">{document.wordCount.toLocaleString()} words</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-slate-300">{document.charCount.toLocaleString()} chars</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-indigo-300 font-medium">~{document.estimatedTokens.toLocaleString()} tokens</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums text-slate-300">{document.readingTimeMinutes} min read</span>
          </div>
        </div>

        {/* View Controls & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center p-0.5 bg-slate-900 rounded-lg border border-slate-800">
            <button
              onClick={() => setMode('reader')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                mode === 'reader'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Reader View"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Reader
            </button>
            <button
              onClick={() => setMode('editor')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                mode === 'editor'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Edit Document Source"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Source
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors"
            title="Copy document text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors"
            title="Download document as Markdown"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Floating Selection Tooltip when text is highlighted */}
      {selectedText && selectionPosition && mode === 'reader' && (
        <div
          style={{ position: 'fixed', left: `${selectionPosition.x}px`, top: `${selectionPosition.y}px`, zIndex: 50 }}
          className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl shadow-indigo-900/50 flex items-center gap-2 cursor-pointer hover:bg-indigo-500 animate-in fade-in zoom-in-95 duration-150"
          onClick={() => {
            onSendSelectionToPrompt(selectedText);
            setSelectedText('');
            setSelectionPosition(null);
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Send Selection to Prompt (&#123;&#123;selected_text&#125;&#125;)</span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 relative" ref={readerContainerRef} onMouseUp={handleMouseUp}>
        {mode === 'reader' ? (
          <div className="max-w-3xl mx-auto selection:bg-indigo-600/40 selection:text-white">
            {renderFormattedLines()}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
              <span>Markdown source editor (changes update token metrics in real time)</span>
              <span className="font-mono tabular-nums">{document.content.split('\n').length} lines</span>
            </div>
            <textarea
              ref={textareaRef}
              value={document.content}
              onChange={(e) => onUpdateContent(document.id, e.target.value)}
              className="flex-1 w-full bg-slate-900/80 text-slate-200 font-mono text-xs leading-relaxed p-4 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 resize-none"
              placeholder="Paste or write document content in Markdown..."
              rows={30}
            />
          </div>
        )}
      </div>

      {/* Footer Metrics Strip */}
      <div className="px-6 py-2 bg-slate-900/70 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 text-indigo-400" />
            Tokens: <strong className="font-mono tabular-nums text-slate-300 font-medium">{document.estimatedTokens.toLocaleString()}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-slate-500" />
            Characters: <strong className="font-mono tabular-nums text-slate-300 font-medium">{document.charCount.toLocaleString()}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Est. Reading: <strong className="tabular-nums text-slate-300 font-medium">{document.readingTimeMinutes} min</strong>
          </span>
        </div>
        <div className="text-slate-400">
          Tip: Highlight text in Reader mode to prompt specific clauses
        </div>
      </div>
    </section>
  );
};
