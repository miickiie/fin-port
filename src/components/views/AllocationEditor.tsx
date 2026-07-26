import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../store/PortfolioContext';
import { useTranslation } from '../../locales/useTranslation';
import { CATEGORY_COLORS } from '../../constants';

export const AllocationEditor: React.FC = () => {
  const { targets, updateTargets } = usePortfolio();
  const [localTargets, setLocalTargets] = useState(targets);
  const { t } = useTranslation();

  useEffect(() => {
    setLocalTargets(targets);
  }, [targets]);

  const handleAmountChange = (id: string, amount: string) => {
    const val = parseFloat(amount) || 0;
    setLocalTargets(prev => 
      prev.map(t => t.id === id ? { ...t, targetAmount: val } : t)
    );
  };

  const handleSave = () => {
    updateTargets(localTargets);
    alert(t('targetsUpdatedSuccessfully'));
  };

  const totalTarget = localTargets.reduce((sum, t) => sum + t.targetAmount, 0);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <header className="view-header">
        <h2 className="view-title">{t('targetAllocation')}</h2>
        <p className="view-description">{t('targetAllocationDesc')}</p>
      </header>

      <div className="glass-panel space-y-6">
        
        <div className="space-y-4">
          {localTargets.map((target) => (
            <div key={target.id} className="glass-row flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
              <div className="flex items-start gap-3">
                <span
                  className="mt-1 h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[target.category] }}
                  aria-hidden="true"
                />
                <div>
                  <h4 className="font-medium">{target.name}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{t(target.category as any)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">฿</span>
                <input 
                  type="number"
                  min="0"
                  step="1000"
                  value={target.targetAmount}
                  onChange={(e) => handleAmountChange(target.id, e.target.value)}
                  className="field-control field-control-amount"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="mb-4 sm:mb-0">
            <p className="text-sm text-slate-600 dark:text-slate-300">{t('totalPlannedPortfolioSize')}</p>
            <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">฿{totalTarget.toLocaleString()}</p>
          </div>
          
          <button 
            onClick={handleSave}
            className="btn btn-neutral w-full sm:w-auto"
          >
            {t('saveTargets')}
          </button>
        </div>
      </div>
    </div>
  );
};
