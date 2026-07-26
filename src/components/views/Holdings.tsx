import React from 'react';
import { usePortfolio } from '../../store/PortfolioContext';
import { calculateTaxUnlockDate } from '../../lib/taxEngine';
import { format, parseISO } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { useTranslation } from '../../locales/useTranslation';

export const Holdings: React.FC = () => {
  const { logs, deleteLog, settings } = usePortfolio();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <header className="view-header">
        <h2 className="view-title">{t('historyHoldings')}</h2>
        <p className="view-description">{t('historyHoldingsDesc')}</p>
      </header>

      {logs.length === 0 ? (
        <div className="empty-panel">
          <p className="text-slate-600 dark:text-slate-300">{t('noInvestmentLogsFound')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => {
            const { messageKey, formattedDate, canWithdraw, unlockDate } = calculateTaxUnlockDate(log, settings.dateOfBirth);
            const showTaxLock = log.wrapperType === 'RMF' || log.wrapperType === 'ThaiESG';
            const isLocked = !canWithdraw && unlockDate;
            
            return (
              <div 
                key={log.id} 
                className="glass-panel glass-panel-compact glass-panel-interactive flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-semibold text-lg">{log.fundName}</h4>
                    <span className="status-chip">
                      {log.wrapperType}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    {format(parseISO(log.date), 'dd MMM yyyy')} • {t(log.category as any)}
                  </p>
                  
                  {showTaxLock && (
                    <p className={`text-xs font-medium ${isLocked ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {isLocked ? t('locked') : t('unlocked')}
                      {t(messageKey as any)} {formattedDate ? formattedDate : ''}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-slate-200/80 dark:border-slate-800/80 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <p className="text-sm text-slate-600 dark:text-slate-300">{t('investedCost')}</p>
                    <p className="font-medium">฿{log.investedAmount.toLocaleString()}</p>
                  </div>
                  {(log.currentValue !== undefined && log.currentValue > 0) && (
                    <div className="text-left md:text-right hidden sm:block">
                      <p className="text-sm text-slate-600 dark:text-slate-300">{t('currentValue')}</p>
                      <p className="font-medium text-blue-600 dark:text-blue-400">฿{log.currentValue.toLocaleString()}</p>
                    </div>
                  )}
                  <button 
                    onClick={() => {
                      if (window.confirm(t('confirmRevertLog'))) {
                        deleteLog(log.id);
                      }
                    }}
                    className="icon-btn icon-btn-danger"
                    title="Revert / Delete"
                    aria-label="Revert / Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
