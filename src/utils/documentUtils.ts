import { DocumentSection } from '../types';

export function calculateMetrics(text: string) {
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  // Standard token estimate for English prose / markdown: ~1 token per 4 characters / 0.75 words
  const estimatedTokens = Math.max(1, Math.round(words * 1.33));
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 225));

  return {
    charCount: chars,
    wordCount: words,
    estimatedTokens,
    readingTimeMinutes,
  };
}

export function extractSections(text: string): DocumentSection[] {
  const lines = text.split('\n');
  const sections: DocumentSection[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ') || trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
      const title = trimmed.replace(/^#+\s*/, '');
      sections.push({
        id: `sec-${index}`,
        title,
        startLine: index + 1,
        preview: lines.slice(index + 1, index + 3).join(' ').trim().slice(0, 100),
      });
    } else if (/^SECTION\s+[0-9IVX]+/i.test(trimmed) || /^[0-9]+\.\s+[A-Z]/.test(trimmed)) {
      sections.push({
        id: `sec-${index}`,
        title: trimmed.slice(0, 60),
        startLine: index + 1,
        preview: lines.slice(index + 1, index + 3).join(' ').trim().slice(0, 100),
      });
    }
  });

  return sections;
}

export function resolvePromptVariables(
  template: string,
  variables: Record<string, string>,
  documentText: string,
  docTitle: string,
  selectedText?: string
): string {
  let resolved = template;

  // Reserved document tokens
  resolved = resolved.replace(/\{\{\s*document_full\s*\}\}/g, documentText);
  resolved = resolved.replace(/\{\{\s*selected_text\s*\}\}/g, selectedText || documentText);
  resolved = resolved.replace(/\{\{\s*doc_title\s*\}\}/g, docTitle);

  // Custom variables
  for (const [key, val] of Object.entries(variables)) {
    const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
    resolved = resolved.replace(regex, val || '');
  }

  return resolved;
}
