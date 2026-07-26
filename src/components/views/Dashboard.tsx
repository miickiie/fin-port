import React, { useMemo } from 'react';
import { usePortfolio } from '../../store/PortfolioContext';
import { CATEGORY_COLORS } from '../../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { calculateTaxUnlockDate } from '../../lib/taxEngine';
import { PlanCategory } from '../../types';
import { useTranslation } from '../../locales/useTranslation';

export const Dashboard: React.FC = () => {
  const { logs, targets, settings } = usePortfolio();
  const { t } = useTranslation();

  const { totalInvested, totalCurrent, allocationData, categorySummary } = useMemo(() => {
    let totalInvested = 0;
    let totalCurrent = 0;
    const categoryTotals: Record<PlanCategory, { invested: number; current: number }> = {
      RMF_FOREIGN_EQUITY: { invested: 0, current: 0 },
      GLOBAL_EQUITY: { invested: 0, current: 0 },
      THAI_ESG_EQUITY: { invested: 0, current: 0 },
      THAI_ESG_FIXED_INCOME: { invested: 0, current: 0 },
      GOLD: { invested: 0, current: 0 },
      CASH: { invested: 0, current: 0 },
    };

    logs.forEach((log) => {
      totalInvested += log.investedAmount;
      const current = log.currentValue || log.investedAmount;
      totalCurrent += current;
      
      if (categoryTotals[log.category]) {
        categoryTotals[log.category].invested += log.investedAmount;
        categoryTotals[log.category].current += current;
      }
    });

    const allocationData = Object.entries(categoryTotals)
      .map(([key, value]) => ({
        name: t(key as any),
        value: value.current,
        color: CATEGORY_COLORS[key as PlanCategory],
      }))
      .filter((item) => item.value > 0);

    return { totalInvested, totalCurrent, allocationData, categorySummary: categoryTotals };
  }, [logs, t]);

  const totalTarget = targets.reduce((sum, t) => sum + t.targetAmount, 0);
  const remainingTotal = Math.max(0, totalTarget - totalInvested);

  // Get next unlock dates for RMF/ThaiESG
  const upcomingUnlocks = useMemo(() => {
    return logs
      .filter(l => l.wrapperType === 'RMF' || l.wrapperType === 'ThaiESG')
      .map(log => {
        const { unlockDate, messageKey, formattedDate, canWithdraw } = calculateTaxUnlockDate(log, settings.dateOfBirth);
        return { log, unlockDate, messageKey, formattedDate, canWithdraw };
      })
      .filter(u => u.unlockDate !== null && !u.canWithdraw)
      .sort((a, b) => (a.unlockDate && b.unlockDate ? a.unlockDate.getTime() - b.unlockDate.getTime() : 0))
      .slice(0, 3);
  }, [logs, settings.dateOfBirth]);

  return (
    <div className="space-y-6">
      <header className="view-header">
        <h2 className="view-title">{t('portfolioOverview')}</h2>
        <p className="view-description">{t('portfolioOverviewDesc')}</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel">
          <p className="metric-label">{t('totalTarget')}</p>
          <p className="metric-value">฿{totalTarget.toLocaleString()}</p>
        </div>
        <div className="glass-panel">
          <p className="metric-label">{t('totalInvested')}</p>
          <p className="metric-value metric-value-accent">฿{totalInvested.toLocaleString()}</p>
        </div>
        <div className="glass-panel glass-panel-accent">
          <p className="metric-label metric-label-accent">{t('remainingToInvest')}</p>
          <p className="metric-value">฿{remainingTotal.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Allocation Chart */}
        <div className="glass-panel flex flex-col items-center">
          <h3 className="text-lg font-medium self-start mb-4">{t('currentAllocation')}</h3>
          {allocationData.length > 0 ? (
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `฿${value.toLocaleString()}`}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--fp-shadow-glass)' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-center text-slate-500 dark:text-slate-300">
              {t('noInvestmentsYet')}
            </div>
          )}
        </div>

        {/* Tax Unlocks & Progress */}
        <div className="space-y-6">
          <div className="glass-panel">
            <h3 className="text-lg font-medium mb-4">{t('targetProgress')}</h3>
            <div className="space-y-4">
              {targets.map(target => {
                const invested = categorySummary[target.category]?.invested || 0;
                const progress = Math.min(100, Math.round((invested / target.targetAmount) * 100));
                return (
                  <div key={target.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="truncate">{target.name}</span>
                      <span className="text-slate-500 font-medium">{progress}%</span>
                    </div>
                    <div className="progress-track" aria-label={`${target.name} ${progress}%`}>
                      <div 
                        className="progress-fill"
                        style={{ transform: `scaleX(${progress / 100})`, backgroundColor: CATEGORY_COLORS[target.category] }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="glass-panel unlock-panel">
            <h3 className="text-lg font-medium mb-4 text-emerald-800 dark:text-emerald-400">{t('upcomingTaxUnlocks')}</h3>
            {upcomingUnlocks.length > 0 ? (
              <div className="space-y-3">
                {upcomingUnlocks.map((u, i) => (
                  <div key={i} className="glass-row flex justify-between items-center p-3 text-sm">
                    <div>
                      <p className="font-medium">{u.log.fundName}</p>
                      <p className="text-xs text-slate-500">{u.log.wrapperType}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-emerald-600 dark:text-emerald-400">
                        {t(u.messageKey as any)} {u.formattedDate ? u.formattedDate : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-emerald-600/70 dark:text-emerald-400/70">{t('noPendingTaxLocks')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
