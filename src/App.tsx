/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { DocumentSidebar } from './components/DocumentSidebar';
import { DocumentViewer } from './components/DocumentViewer';
import { PromptSandbox } from './components/PromptStudio/PromptSandbox';
import { RecipeLibrary } from './components/PromptStudio/RecipeLibrary';
import { ABCompare } from './components/PromptStudio/ABCompare';
import { DocumentChat } from './components/PromptStudio/DocumentChat';
import { NewDocumentModal } from './components/NewDocumentModal';
import { INITIAL_DOCUMENTS } from './data/sampleDocuments';
import { DocumentItem, ActiveTab } from './types';
import { calculateMetrics, extractSections } from './utils/documentUtils';

export default function App() {
  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem('docuprompt_documents');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_DOCUMENTS;
      }
    }
    return INITIAL_DOCUMENTS;
  });

  const [activeDocId, setActiveDocId] = useState<string>(() => {
    return documents[0]?.id || 'doc-msa-legal';
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('sandbox');
  const [selectedText, setSelectedText] = useState<string>('');
  const [jumpLine, setJumpLine] = useState<number | null>(null);
  const [isNewDocModalOpen, setIsNewDocModalOpen] = useState<boolean>(false);

  // Sync documents to localStorage
  useEffect(() => {
    localStorage.setItem('docuprompt_documents', JSON.stringify(documents));
  }, [documents]);

  const activeDocument = documents.find((d) => d.id === activeDocId) || documents[0] || null;

  const handleUpdateContent = (id: string, newContent: string) => {
    const metrics = calculateMetrics(newContent);
    const sections = extractSections(newContent);

    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === id) {
          return {
            ...doc,
            content: newContent,
            updatedAt: new Date().toISOString(),
            wordCount: metrics.wordCount,
            charCount: metrics.charCount,
            estimatedTokens: metrics.estimatedTokens,
            readingTimeMinutes: metrics.readingTimeMinutes,
            sections,
          };
        }
        return doc;
      })
    );
  };

  const handleAddDocument = (newDoc: DocumentItem) => {
    setDocuments((prev) => [newDoc, ...prev]);
    setActiveDocId(newDoc.id);
  };

  const handleDeleteDocument = (id: string) => {
    if (documents.length <= 1) return;
    const remaining = documents.filter((d) => d.id !== id);
    setDocuments(remaining);
    if (activeDocId === id) {
      setActiveDocId(remaining[0].id);
    }
  };

  const handleSendSelectionToPrompt = (text: string) => {
    setSelectedText(text);
    setActiveTab('sandbox');
  };

  const handleApplyRecipeToSandbox = (template: string, sysInst?: string) => {
    setActiveTab('sandbox');
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* 3-Zone Top Navigation Contract */}
      <TopNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenNewDocModal={() => setIsNewDocModalOpen(true)}
        documentCount={documents.length}
      />

      {/* Main Workspace: 3-column / 2-column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Document Library & Table of Contents Outline */}
        <DocumentSidebar
          documents={documents}
          activeDocument={activeDocument}
          onSelectDocument={(doc) => {
            setActiveDocId(doc.id);
            setJumpLine(null);
          }}
          onDeleteDocument={handleDeleteDocument}
          onJumpToSection={(line) => setJumpLine(line)}
        />

        {/* Center: Active Document Viewer & Reader */}
        {activeDocument ? (
          <DocumentViewer
            document={activeDocument}
            onUpdateContent={handleUpdateContent}
            onSendSelectionToPrompt={handleSendSelectionToPrompt}
            jumpLine={jumpLine}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
            No document selected. Add a document to begin.
          </div>
        )}

        {/* Right: Prompt Studio Panel */}
        <main className="w-full lg:w-[48%] flex flex-col h-full bg-slate-950 border-l border-slate-800 shrink-0">
          {activeDocument ? (
            activeTab === 'sandbox' ? (
              <PromptSandbox
                document={activeDocument}
                selectedText={selectedText}
              />
            ) : activeTab === 'recipes' ? (
              <RecipeLibrary
                document={activeDocument}
                onApplyToSandbox={handleApplyRecipeToSandbox}
              />
            ) : activeTab === 'compare' ? (
              <ABCompare document={activeDocument} />
            ) : (
              <DocumentChat document={activeDocument} />
            )
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
              Select or load a document to configure prompts.
            </div>
          )}
        </main>
      </div>

      {/* New Document Modal */}
      <NewDocumentModal
        isOpen={isNewDocModalOpen}
        onClose={() => setIsNewDocModalOpen(false)}
        onAddDocument={handleAddDocument}
      />
    </div>
  );
}
