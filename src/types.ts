export type PlanCategory =
  | 'RMF_FOREIGN_EQUITY'
  | 'GLOBAL_EQUITY'
  | 'THAI_ESG_EQUITY'
  | 'THAI_ESG_FIXED_INCOME'
  | 'GOLD'
  | 'CASH';

export interface TargetAllocation {
  id: string;
  category: PlanCategory;
  name: string;
  targetAmount: number;
}

export type WrapperType = 'RMF' | 'ThaiESG' | 'Normal' | 'Cash' | 'Gold';

export interface InvestmentLog {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  fundName: string;
  category: PlanCategory;
  wrapperType: WrapperType;
  investedAmount: number;
  units?: number;
  nav?: number;
  currentValue?: number;
  notes?: string;
  createdAt: string; // ISO timestamp
}

export interface PortfolioSettings {
  dateOfBirth?: string; // ISO date string (YYYY-MM-DD)
  gasSyncUrl?: string;
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'th';
}

export interface PortfolioState {
  logs: InvestmentLog[];
  targets: TargetAllocation[];
  settings: PortfolioSettings;
}
