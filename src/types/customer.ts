export interface Transaction {
  date: string;
  type: string;
  amount: number;
  dir: 'in' | 'out';
  flag: boolean;
}

export interface BehavioralMetric {
  label: string;
  baseline: string;
  current: string;
  change: string;
  dir: 'up' | 'down' | 'new';
  sev: 'critical' | 'warning' | 'info';
}

export interface TrajectoryPoint {
  d: string;
  l: 'low' | 'medium' | 'high' | 'severe';
}

export interface Behavioral {
  bp: string;
  cp: string;
  severity: 'critical' | 'warning' | 'info';
  metrics: BehavioralMetric[];
  bd: string;
  traj: TrajectoryPoint[];
  confidence: string;
  exp: string;
}

export interface CalibrationResponse {
  analyst: string;
  role: string;
  decision: string | null;
  confidence: string | null;
  note: string | null;
}

export interface Calibration {
  active: boolean;
  question: string;
  responses: CalibrationResponse[];
}

export interface LinkedAccount {
  name: string;
  age: number;
  bank: string;
}

export interface ActiveCustomer {
  id: string;
  tier: 'high' | 'medium';
  name: string;
  age: number | null;
  location: string;
  occupation: string;
  accountOpened: string;
  riskScore: number;
  typology: string;
  typologyTag: string;
  summary: string;
  slaAssigned: string;
  slaTier: '4h' | '24h';
  qaStatus: 'pending' | 'approved' | null;
  calibration: Calibration | null;
  linked?: LinkedAccount[];
  transactions: Transaction[];
  flags: string[];
  report: string;
  behavioral: Behavioral;
}

export interface ResolvedCustomer {
  id: string;
  tier: 'low';
  name: string;
  riskScore: number;
  typologyTag: string;
  summary: string;
  resolution: string;
}

export type Customer = ActiveCustomer | ResolvedCustomer;

export type CustomersMap = Record<string, Customer>;
