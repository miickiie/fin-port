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
      <header className="mb-8">
        <h2 className="text-3xl font-light tracking-tight mb-2">{t('portfolioOverview')}</h2>
        <p className="text-slate-500 dark:text-slate-400">{t('portfolioOverviewDesc')}</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{t('totalTarget')}</p>
          <p className="text-2xl font-semibold">฿{totalTarget.toLocaleString()}</p>
        </div>
        <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{t('totalInvested')}</p>
          <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">฿{totalInvested.toLocaleString()}</p>
        </div>
        <div className="bg-blue-500/10 dark:bg-blue-500/20 backdrop-blur-2xl rounded-3xl p-6 border border-blue-200/50 dark:border-blue-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">{t('remainingToInvest')}</p>
          <p className="text-2xl font-semibold">฿{remainingTotal.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Allocation Chart */}
        <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] flex flex-col items-center">
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
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400">
              {t('noInvestmentsYet')}
            </div>
          )}
        </div>

        {/* Tax Unlocks & Progress */}
        <div className="space-y-6">
          <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
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
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%`, backgroundColor: CATEGORY_COLORS[target.category] }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 backdrop-blur-2xl rounded-3xl p-6 border border-emerald-200/50 dark:border-emerald-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="text-lg font-medium mb-4 text-emerald-800 dark:text-emerald-400">{t('upcomingTaxUnlocks')}</h3>
            {upcomingUnlocks.length > 0 ? (
              <div className="space-y-3">
                {upcomingUnlocks.map((u, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-3 rounded-2xl border border-white/30 dark:border-slate-700/30 text-sm">
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
