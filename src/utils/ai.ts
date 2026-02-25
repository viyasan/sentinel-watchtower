import type { AIAction } from '../types/index.js';
import { MOCK_AI_RESPONSES } from '../data/mock-ai-responses.js';

export function getMockResponse(caseId: string, action: AIAction): string {
  return MOCK_AI_RESPONSES[caseId]?.[action] || "No analysis available for this case and action.";
}

export async function streamMockResponse(
  caseId: string,
  action: AIAction,
  onChunk: (text: string) => void
): Promise<string> {
  const full = getMockResponse(caseId, action);
  for (let i = 0; i < full.length; i += 4) {
    await new Promise(r => setTimeout(r, 6));
    onChunk(full.slice(0, i + 4));
  }
  onChunk(full);
  return full;
}
