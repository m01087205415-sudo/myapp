export type DocumentCategory = 'Legal & Contracts' | 'Technical & Engineering' | 'Financial & Corporate' | 'Research & Clinical' | 'Custom';

export interface DocumentSection {
  id: string;
  title: string;
  startLine: number;
  preview: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: DocumentCategory;
  content: string;
  createdAt: string;
  updatedAt: string;
  wordCount: number;
  charCount: number;
  estimatedTokens: number;
  readingTimeMinutes: number;
  sections: DocumentSection[];
  tags: string[];
}

export interface PromptVariable {
  key: string;
  label: string;
  value: string;
  placeholder?: string;
  description?: string;
}

export interface PromptRecipe {
  id: string;
  title: string;
  category: string;
  description: string;
  badge: string;
  promptTemplate: string;
  systemInstruction?: string;
  responseMimeType?: string;
  schema?: any;
  defaultVariables: PromptVariable[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export type ActiveTab = 'sandbox' | 'recipes' | 'compare' | 'chat';
