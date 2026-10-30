import React, { useState } from 'react';
import { Search, FileText, ChevronRight, Hash, Trash2, Layers } from 'lucide-react';
import { DocumentCategory, DocumentItem } from '../types';

interface DocumentSidebarProps {
  documents: DocumentItem[];
  activeDocument: DocumentItem | null;
  onSelectDocument: (doc: DocumentItem) => void;
  onDeleteDocument: (id: string) => void;
  onJumpToSection: (startLine: number) => void;
}

const CATEGORIES: ('All' | DocumentCategory)[] = [
  'All',
  'Legal & Contracts',
  'Technical & Engineering',
  'Research & Clinical',
  'Financial & Corporate',
];

export const DocumentSidebar: React.FC<DocumentSidebarProps> = ({
  documents,
  activeDocument,
  onSelectDocument,
  onDeleteDocument,
  onJumpToSection,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | DocumentCategory>('All');
  const [viewMode, setViewMode] = useState<'docs' | 'outline'>('docs');

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <aside className="w-80 bg-slate-900/90 border-r border-slate-800 flex flex-col h-full shrink-0 select-none">
      {/* Sidebar View Switcher */}
      <div className="p-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1 p-0.5 bg-slate-950 rounded-lg border border-slate-800/80">
          <button
            onClick={() => setViewMode('docs')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'docs'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Documents ({documents.length})
          </button>
          <button
            onClick={() => setViewMode('outline')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'outline'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Outline ({activeDocument?.sections.length || 0})
          </button>
        </div>
      </div>

      {viewMode === 'docs' ? (
        <>
          {/* Search Bar */}
          <div className="p-3 border-b border-slate-800">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search documents or tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {cat === 'All' ? 'All' : cat.split('&')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Document List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 p-2 space-y-1">
            {filteredDocs.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-xs">
                No documents match your search criteria.
              </div>
            ) : (
              filteredDocs.map((doc) => {
                const isActive = activeDocument?.id === doc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => onSelectDocument(doc)}
                    className={`group relative p-3 rounded-lg cursor-pointer transition-all ${
                      isActive
                        ? 'bg-slate-800/90 border border-indigo-500/40 shadow-sm'
                        : 'hover:bg-slate-800/50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-400'
                          }`}
                        />
                        <h4 className="text-xs font-semibold text-slate-200 truncate group-hover:text-white">
                          {doc.title}
                        </h4>
                      </div>
                      {documents.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteDocument(doc.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                          title="Delete document"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Unboxed Metadata with Typographic Separators */}
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-400">
                      <span>{doc.category}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="font-mono tabular-nums text-slate-400">{doc.estimatedTokens.toLocaleString()} tokens</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="tabular-nums text-slate-400">{doc.readingTimeMinutes} min read</span>
                    </div>

                    {/* Tags preview */}
                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      {doc.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] text-slate-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      ) : (
        /* Outline / Table of Contents View */
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="mb-3 px-2">
            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Document Sections
            </h5>
            <p className="text-[11px] text-slate-400 mt-0.5 truncate">
              {activeDocument?.title}
            </p>
          </div>

          {!activeDocument?.sections.length ? (
            <div className="p-4 text-xs text-slate-400 italic text-center">
              No distinct headers found in this document. Add markdown headers (# or Section) to build an outline.
            </div>
          ) : (
            activeDocument.sections.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => onJumpToSection(section.startLine)}
                className="w-full text-left p-2 rounded-md hover:bg-slate-800 transition-colors group flex items-start gap-2"
              >
                <Hash className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-slate-300 group-hover:text-white font-medium truncate">
                    {section.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono tabular-nums mt-0.5">
                    Line {section.startLine}
                  </div>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-slate-400 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))
          )}
        </div>
      )}
    </aside>
  );
};
