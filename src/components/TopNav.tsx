import React from 'react';
import { FileText, Plus, Sparkles, SlidersHorizontal, GitCompare, MessageSquareCode } from 'lucide-react';
import { ActiveTab } from '../types';

interface TopNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenNewDocModal: () => void;
  documentCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenNewDocModal,
  documentCount,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-900 border-b border-slate-800 shrink-0">
      {/* Zone 1: Brand wordmark (single element) */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
          <FileText className="w-4 h-4" />
        </div>
        <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
          DocuPrompt Studio
        </span>
      </div>

      {/* Zone 2: Navigation Links (Single-line whitespace-nowrap) */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => onSelectTab('sandbox')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-white ${
            activeTab === 'sandbox' ? 'text-indigo-400 font-semibold' : ''
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Prompt Sandbox
        </button>
        <button
          onClick={() => onSelectTab('recipes')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-white ${
            activeTab === 'recipes' ? 'text-indigo-400 font-semibold' : ''
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Recipe Library
        </button>
        <button
          onClick={() => onSelectTab('compare')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-white ${
            activeTab === 'compare' ? 'text-indigo-400 font-semibold' : ''
          }`}
        >
          <GitCompare className="w-4 h-4" />
          A/B Compare
        </button>
        <button
          onClick={() => onSelectTab('chat')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-white ${
            activeTab === 'chat' ? 'text-indigo-400 font-semibold' : ''
          }`}
        >
          <MessageSquareCode className="w-4 h-4" />
          Q&A Interrogation
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden lg:inline text-xs text-slate-400 tabular-nums">
          {documentCount} documents loaded
        </span>
        <button
          onClick={onOpenNewDocModal}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors shadow-sm shadow-indigo-600/30 whitespace-nowrap shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Document
        </button>
      </div>
    </header>
  );
};
