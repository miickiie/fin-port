import React, { useState } from 'react';
import { usePortfolio } from '../../store/PortfolioContext';
import { useTranslation } from '../../locales/useTranslation';
import { Trash2 } from 'lucide-react';

export const Settings: React.FC = () => {
  const { settings, updateSettings, logs, targets } = usePortfolio();
  const { t } = useTranslation();
  
  const [syncStatus, setSyncStatus] = useState<string>('');
  const [tempGasUrl, setTempGasUrl] = useState<string>('');

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ dateOfBirth: e.target.value });
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ theme: e.target.value as 'light' | 'dark' | 'system' });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ language: e.target.value as 'en' | 'th' });
  };

  const handleSaveGasUrl = () => {
    if (tempGasUrl.trim()) {
      updateSettings({ gasSyncUrl: tempGasUrl.trim() });
      setTempGasUrl('');
    }
  };

  const handleClearGasUrl = () => {
    updateSettings({ gasSyncUrl: undefined });
  };

  const handleSyncToGas = async () => {
    const gasUrl = settings.gasSyncUrl;
    if (!gasUrl) {
      setSyncStatus(t('configureGasFirst'));
      return;
    }
    setSyncStatus(t('syncing'));
    try {
      const payload = { logs, targets, settings };
      // Using standard fetch with no-cors or expecting standard CORS if properly setup in GAS
      const response = await fetch(gasUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload)
      });
      
      setSyncStatus(t('syncComplete'));
      setTimeout(() => setSyncStatus(''), 3000);
    } catch (err) {
      console.error(err);
      setSyncStatus(t('syncFailed'));
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({logs, targets, settings}, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "portfolio_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header className="mb-8">
        <h2 className="text-3xl font-light tracking-tight mb-2">{t('settings')}</h2>
        <p className="text-slate-500 dark:text-slate-400">{t('configurePreferences')}</p>
      </header>

      <div className="space-y-6">
        
        {/* Personal Details */}
        <section className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
          <h3 className="text-lg font-medium mb-4">{t('personalDetails')}</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('dateOfBirth')}</label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{t('dobRequiredForRmf')}</p>
            <input 
              type="date"
              value={settings.dateOfBirth || ''}
              onChange={handleDobChange}
              className="w-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border border-white/50 dark:border-slate-800/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white/80 dark:focus:bg-slate-900/80 outline-none transition-all"
            />
          </div>
        </section>

        {/* Appearance */}
        <section className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
          <h3 className="text-lg font-medium mb-4">{t('appearance')}</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('theme')}</label>
              <select 
                value={settings.theme}
                onChange={handleThemeChange}
                className="w-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border border-white/50 dark:border-slate-800/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white/80 dark:focus:bg-slate-900/80 outline-none transition-all"
              >
                <option value="light">{t('light')}</option>
                <option value="dark">{t('dark')}</option>
                <option value="system">{t('systemDefault')}</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('language')}</label>
              <select 
                value={settings.language || 'en'}
                onChange={handleLanguageChange}
                className="w-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border border-white/50 dark:border-slate-800/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white/80 dark:focus:bg-slate-900/80 outline-none transition-all"
              >
                <option value="en">{t('english')}</option>
                <option value="th">{t('thai')}</option>
              </select>
            </div>
          </div>
        </section>

        {/* Sync & Backup */}
        <section className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
          <h3 className="text-lg font-medium mb-4">{t('backupSync')}</h3>
          <div className="space-y-4">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('gasWebhookUrl')}</label>
              
              {!settings.gasSyncUrl ? (
                <>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{t('gasWebhookUrlDesc')}</p>
                  <div className="flex gap-2">
                    <input 
                      type="url"
                      placeholder="https://script.google.com/macros/s/.../exec"
                      value={tempGasUrl}
                      onChange={(e) => setTempGasUrl(e.target.value)}
                      className="w-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border border-white/50 dark:border-slate-800/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:bg-white/80 dark:focus:bg-slate-900/80 outline-none transition-all"
                    />
                    <button 
                      onClick={handleSaveGasUrl}
                      disabled={!tempGasUrl.trim()}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors whitespace-nowrap"
                    >
                      {t('save')}
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border border-white/50 dark:border-slate-800/50 rounded-xl px-4 py-2.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium text-sm flex items-center gap-2">
                    ✅ {t('webhookUrlConfigured')}
                  </span>
                  <button 
                    onClick={handleClearGasUrl}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title={t('clearWebhookUrl')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button 
                onClick={handleSyncToGas}
                disabled={!settings.gasSyncUrl}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
              >
                {t('syncToGoogleDrive')}
              </button>
              <button 
                onClick={handleExportJson}
                className="flex-1 px-4 py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 font-medium rounded-xl transition-colors"
              >
                {t('exportJsonBackup')}
              </button>
            </div>
            
            {syncStatus && (
              <p className="text-sm text-center font-medium mt-2 text-slate-600 dark:text-slate-400">
                {syncStatus}
              </p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};
