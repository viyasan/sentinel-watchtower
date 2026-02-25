export interface LogEntry {
  time: string;
  date: string;
  type: 'alert' | 'view' | 'calibration' | 'risk' | 'account' | 'ai' | 'decision' | 'qa' | 'export';
  icon: string;
  actor: string;
  action: string;
  detail?: string;
}

export type LogsMap = Record<string, LogEntry[]>;
