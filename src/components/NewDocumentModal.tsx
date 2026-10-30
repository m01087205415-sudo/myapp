import React, { useState } from 'react';
import { X, Upload, FileText, Check } from 'lucide-react';
import { DocumentCategory, DocumentItem } from '../types';
import { calculateMetrics, extractSections } from '../utils/documentUtils';

interface NewDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDocument: (doc: DocumentItem) => void;
}

const CATEGORIES: DocumentCategory[] = [
  'Legal & Contracts',
  'Technical & Engineering',
  'Research & Clinical',
  'Financial & Corporate',
  'Custom',
];

export const NewDocumentModal: React.FC<NewDocumentModalProps> = ({
  isOpen,
  onClose,
  onAddDocument,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DocumentCategory>('Legal & Contracts');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setContent(text || '');
    };
    reader.readAsText(file);
  };

  const handleCreate = () => {
    if (!title.trim() || !content.trim()) return;

    const metrics = calculateMetrics(content);
    const sections = extractSections(content);
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title: title.trim(),
      category,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      wordCount: metrics.wordCount,
      charCount: metrics.charCount,
      estimatedTokens: metrics.estimatedTokens,
      readingTimeMinutes: metrics.readingTimeMinutes,
      sections,
      tags: tags.length > 0 ? tags : ['Document'],
    };

    onAddDocument(newDoc);
    onClose();
  };

  const currentMetrics = calculateMetrics(content);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full p-6 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">
              Add New Document to Workspace
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-4 my-4 overflow-y-auto flex-1 pr-1">
          {/* File Upload Zone */}
          <div className="border border-dashed border-slate-700 rounded-lg p-4 bg-slate-950/40 text-center hover:border-indigo-500/60 transition-colors relative">
            <Upload className="w-6 h-6 text-slate-500 mx-auto mb-2" />
            <p className="text-xs text-slate-300 font-medium">
              {fileName ? `Loaded: ${fileName}` : 'Upload text file or drag and drop'}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Supports .txt, .md, .json, .csv, .doc exports
            </p>
            <input
              type="file"
              accept=".txt,.md,.markdown,.json,.csv"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          {/* Title & Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Document Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Master Services Agreement 2026"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Domain / Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DocumentCategory)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Enterprise, Delaware, Confidential, Tier-1"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Content Area */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-300">
                Document Content (Markdown or Plain Text) *
              </label>
              {content && (
                <span className="text-[11px] font-mono tabular-nums text-indigo-400">
                  {currentMetrics.wordCount} words · ~{currentMetrics.estimatedTokens} tokens
                </span>
              )}
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              placeholder="Paste or type document text here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            Parsed tokens are automatically calculated on ingest
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!title.trim() || !content.trim()}
              className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg shadow-sm shadow-indigo-600/30 transition-all flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              Ingest Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
