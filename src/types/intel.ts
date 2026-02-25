export interface PersonaIntel {
  status: string;
  date: string;
  idType: string;
  selfieMatch?: number | string;
  addr?: string;
  pep: string;
  nameMatch?: string;
  watchlist?: string;
  adverseMedia?: string;
  tamperChecks?: string;
  behavioral?: string;
  ip?: string;
  device?: string;
}

export interface PlaidIntel {
  institution: string;
  accountType: string;
  nameScore: number | string;
  emailScore: number | string;
  phoneScore: number | string;
  addressScore: number | string;
  balance?: string;
  trustIndex: number | string;
  networkSignals?: string;
}

export interface FlinksIntel {
  incomeSource: string;
  monthlyIncome: string;
  frequency: string;
  cashFlow: string;
  liabilities?: string;
  nsf?: string;
  largeDeposits?: string;
  cryptoTransfers?: string;
  anomaly?: string;
}

export interface ChainalysisEntry {
  wallet: string;
  risk: string;
  score: number;
  direct?: string;
  indirect?: string;
  counterparty?: string;
  crossChain?: string;
  alertType?: string;
  categories?: string;
  cluster?: string;
}

export interface TRMEntry {
  wallet: string;
  rl: string;
  riskScore: number;
  ownership: string;
  counterparty?: string;
  indirect?: string;
  vasp: string;
  volume30d: string;
  txCount?: string;
  riskVolPct?: string;
  crossChain?: string;
}

export interface EllipticEntry {
  wallet: string;
  hs: number;
  rl: string;
  wr: string;
  tr: string;
  er: string;
  crossChain?: string;
  ne?: string;
  rf: string[];
  rt: number;
}

export interface ScreeningIntel {
  sanctions: string;
  lists: string;
  pep?: string;
  adverseMedia?: string;
  lastScreened?: string;
  monitoring?: string;
}

export interface CaseIntel {
  persona?: PersonaIntel;
  plaid?: PlaidIntel;
  flinks?: FlinksIntel;
  chainalysis?: ChainalysisEntry[];
  trm?: TRMEntry[];
  elliptic?: EllipticEntry[];
  screening?: ScreeningIntel;
}

export type IntelMap = Record<string, CaseIntel>;
