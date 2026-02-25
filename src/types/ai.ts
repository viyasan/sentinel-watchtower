export type AIAction = 'summary' | 'str' | 'typology';

export interface MockAIResponse {
  caseId: string;
  action: AIAction;
  text: string;
}
