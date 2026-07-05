import { TargetAllocation, PlanCategory, WrapperType } from './types';
import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_TARGETS: TargetAllocation[] = [
  { id: '1', category: 'RMF_FOREIGN_EQUITY', name: 'RMF หุ้นต่างประเทศ', targetAmount: 150000 },
  { id: '2', category: 'GLOBAL_EQUITY', name: 'กองทุนหุ้นโลกปกติ', targetAmount: 375000 },
  { id: '3', category: 'THAI_ESG_EQUITY', name: 'ThaiESG หุ้นไทย', targetAmount: 150000 },
  { id: '4', category: 'THAI_ESG_FIXED_INCOME', name: 'ThaiESG ตราสารหนี้/ผสม', targetAmount: 150000 },
  { id: '5', category: 'GOLD', name: 'ทองคำ', targetAmount: 75000 },
  { id: '6', category: 'CASH', name: 'เงินฝากดอกเบี้ยสูง/เงินสด', targetAmount: 100000 },
];

export const WRAPPER_TYPES: WrapperType[] = ['RMF', 'ThaiESG', 'Normal', 'Cash', 'Gold'];

export const CATEGORY_LABELS: Record<PlanCategory, string> = {
  RMF_FOREIGN_EQUITY: 'RMF หุ้นต่างประเทศ',
  GLOBAL_EQUITY: 'กองทุนหุ้นโลกปกติ',
  THAI_ESG_EQUITY: 'ThaiESG หุ้นไทย',
  THAI_ESG_FIXED_INCOME: 'ThaiESG ตราสารหนี้/ผสม',
  GOLD: 'ทองคำ',
  CASH: 'เงินฝากดอกเบี้ยสูง/เงินสด',
};

export const CATEGORY_COLORS: Record<PlanCategory, string> = {
  RMF_FOREIGN_EQUITY: '#8b5cf6', // violet-500
  GLOBAL_EQUITY: '#3b82f6', // blue-500
  THAI_ESG_EQUITY: '#10b981', // emerald-500
  THAI_ESG_FIXED_INCOME: '#f59e0b', // amber-500
  GOLD: '#eab308', // yellow-500
  CASH: '#64748b', // slate-500
};
