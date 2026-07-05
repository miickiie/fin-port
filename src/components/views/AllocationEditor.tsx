import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../store/PortfolioContext';
import { useTranslation } from '../../locales/useTranslation';

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
      <header className="mb-8">
        <h2 className="text-3xl font-light tracking-tight mb-2">{t('targetAllocation')}</h2>
        <p className="text-slate-500 dark:text-slate-400">{t('targetAllocationDesc')}</p>
      </header>

      <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] space-y-6">
        
        <div className="space-y-4">
          {localTargets.map((target) => (
            <div key={target.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/30 dark:border-slate-700/30">
              <div>
                <h4 className="font-medium">{target.name}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t(target.category as any)}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">฿</span>
                <input 
                  type="number"
                  min="0"
                  step="1000"
                  value={target.targetAmount}
                  onChange={(e) => handleAmountChange(target.id, e.target.value)}
                  className="w-full sm:w-48 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border border-white/50 dark:border-slate-800/50 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:bg-white/80 dark:focus:bg-slate-900/80 outline-none transition-all text-right"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="mb-4 sm:mb-0">
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('totalPlannedPortfolioSize')}</p>
            <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">฿{totalTarget.toLocaleString()}</p>
          </div>
          
          <button 
            onClick={handleSave}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
          >
            {t('saveTargets')}
          </button>
        </div>
      </div>
    </div>
  );
};
