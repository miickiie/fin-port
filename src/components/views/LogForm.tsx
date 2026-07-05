import React, { useState } from 'react';
import { usePortfolio } from '../../store/PortfolioContext';
import { WRAPPER_TYPES } from '../../constants';
import { PlanCategory, WrapperType } from '../../types';
import { useTranslation } from '../../locales/useTranslation';

interface LogFormProps {
  onComplete: () => void;
}

export const LogForm: React.FC<LogFormProps> = ({ onComplete }) => {
  const { addLog } = usePortfolio();
  const { t } = useTranslation();
  
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [fundName, setFundName] = useState('');
  const [category, setCategory] = useState<PlanCategory>('GLOBAL_EQUITY');
  const [wrapperType, setWrapperType] = useState<WrapperType>('Normal');
  const [investedAmount, setInvestedAmount] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fundName || !investedAmount || !date) return;

    addLog({
      date,
      fundName,
      category,
      wrapperType,
      investedAmount: parseFloat(investedAmount),
      currentValue: currentValue ? parseFloat(currentValue) : undefined,
      notes,
    });
    
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header className="mb-8">
        <h2 className="text-3xl font-light tracking-tight mb-2">{t('addInvestmentLog')}</h2>
        <p className="text-slate-500 dark:text-slate-400">{t('addInvestmentLogDesc')}</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] space-y-5">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('date')}</label>
            <input 
              type="date" 
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border border-white/50 dark:border-slate-800/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white/80 dark:focus:bg-slate-900/80 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('fundAssetName')}</label>
            <input 
              type="text" 
              required
              placeholder="e.g. K-CHANGE-A"
              value={fundName}
              onChange={(e) => setFundName(e.target.value)}
              className="w-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border border-white/50 dark:border-slate-800/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white/80 dark:focus:bg-slate-900/80 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('targetCategory')}</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value as PlanCategory)}
              className="w-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border border-white/50 dark:border-slate-800/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white/80 dark:focus:bg-slate-900/80 outline-none transition-all"
            >
              {(['RMF_FOREIGN_EQUITY', 'GLOBAL_EQUITY', 'THAI_ESG_EQUITY', 'THAI_ESG_FIXED_INCOME', 'GOLD', 'CASH'] as const).map(key => (
                <option key={key} value={key}>{t(key as any)}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('wrapperType')}</label>
            <select 
              value={wrapperType}
              onChange={(e) => setWrapperType(e.target.value as WrapperType)}
              className="w-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border border-white/50 dark:border-slate-800/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white/80 dark:focus:bg-slate-900/80 outline-none transition-all"
            >
              {WRAPPER_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('investedAmount')}</label>
            <input 
              type="number" 
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              value={investedAmount}
              onChange={(e) => setInvestedAmount(e.target.value)}
              className="w-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border border-white/50 dark:border-slate-800/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white/80 dark:focus:bg-slate-900/80 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('currentValueOptional')}</label>
            <input 
              type="number" 
              min="0"
              step="0.01"
              placeholder={t('leaveBlankToUseCost')}
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className="w-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border border-white/50 dark:border-slate-800/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white/80 dark:focus:bg-slate-900/80 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('notesOptional')}</label>
          <textarea 
            rows={3}
            placeholder={t('additionalDetails')}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border border-white/50 dark:border-slate-800/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white/80 dark:focus:bg-slate-900/80 outline-none transition-all resize-none"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button 
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors w-full md:w-auto"
          >
            {t('saveInvestmentLog')}
          </button>
        </div>
      </form>
    </div>
  );
};
