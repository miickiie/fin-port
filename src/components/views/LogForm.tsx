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
      <header className="view-header">
        <h2 className="view-title">{t('addInvestmentLog')}</h2>
        <p className="view-description">{t('addInvestmentLogDesc')}</p>
      </header>

      <form onSubmit={handleSubmit} className="glass-panel glass-panel-roomy space-y-5">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="field-label">{t('date')}</label>
            <input 
              type="date" 
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="field-control"
            />
          </div>

          <div className="space-y-2">
            <label className="field-label">{t('fundAssetName')}</label>
            <input 
              type="text" 
              required
              placeholder="e.g. K-CHANGE-A"
              value={fundName}
              onChange={(e) => setFundName(e.target.value)}
              className="field-control"
            />
          </div>

          <div className="space-y-2">
            <label className="field-label">{t('targetCategory')}</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value as PlanCategory)}
              className="field-control"
            >
              {(['RMF_FOREIGN_EQUITY', 'GLOBAL_EQUITY', 'THAI_ESG_EQUITY', 'THAI_ESG_FIXED_INCOME', 'GOLD', 'CASH'] as const).map(key => (
                <option key={key} value={key}>{t(key as any)}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="field-label">{t('wrapperType')}</label>
            <select 
              value={wrapperType}
              onChange={(e) => setWrapperType(e.target.value as WrapperType)}
              className="field-control"
            >
              {WRAPPER_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="field-label">{t('investedAmount')}</label>
            <input 
              type="number" 
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              value={investedAmount}
              onChange={(e) => setInvestedAmount(e.target.value)}
              className="field-control"
            />
          </div>

          <div className="space-y-2">
            <label className="field-label">{t('currentValueOptional')}</label>
            <input 
              type="number" 
              min="0"
              step="0.01"
              placeholder={t('leaveBlankToUseCost')}
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className="field-control"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="field-label">{t('notesOptional')}</label>
          <textarea 
            rows={3}
            placeholder={t('additionalDetails')}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="field-control resize-none"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button 
            type="submit"
            className="btn btn-primary w-full md:w-auto"
          >
            {t('saveInvestmentLog')}
          </button>
        </div>
      </form>
    </div>
  );
};
