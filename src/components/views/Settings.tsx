import React, { useState } from 'react';
import { usePortfolio } from '../../store/PortfolioContext';
import { useTranslation } from '../../locales/useTranslation';
import { Trash2 } from 'lucide-react';

interface SettingsProps {
  onVibe: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onVibe }) => {
  const { settings, updateSettings, logs, targets } = usePortfolio();
  const { t } = useTranslation();
  
  const [syncStatus, setSyncStatus] = useState<string>('');
  const [tempGasUrl, setTempGasUrl] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState(false);

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
    setIsSyncing(true);
    try {
      const payload = { logs, targets, settings };
      // Using standard fetch with no-cors or expecting standard CORS if properly setup in GAS
      await fetch(gasUrl, {
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
    } finally {
      setIsSyncing(false);
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
      <header className="view-header">
        <h2 className="view-title">{t('settings')}</h2>
        <p className="view-description">{t('configurePreferences')}</p>
      </header>

      <div className="space-y-6">
        
        {/* Personal Details */}
        <section className="glass-panel">
          <h3 className="text-lg font-medium mb-4">{t('personalDetails')}</h3>
          <div className="space-y-2 min-w-0">
            <label className="field-label">{t('dateOfBirth')}</label>
            <p className="field-help">{t('dobRequiredForRmf')}</p>
            <input 
              type="date"
              value={settings.dateOfBirth || ''}
              onChange={handleDobChange}
              className="field-control"
            />
          </div>
        </section>

        {/* Appearance */}
        <section className="glass-panel">
          <h3 className="text-lg font-medium mb-4">{t('appearance')}</h3>
          <div className="space-y-4">
            <div className="space-y-2 min-w-0">
              <label className="field-label">{t('theme')}</label>
              <select 
                value={settings.theme}
                onChange={handleThemeChange}
                className="field-control"
              >
                <option value="light">{t('light')}</option>
                <option value="dark">{t('dark')}</option>
                <option value="system">{t('systemDefault')}</option>
              </select>
            </div>

            <div className="space-y-2 min-w-0">
              <label className="field-label">{t('language')}</label>
              <select 
                value={settings.language || 'en'}
                onChange={handleLanguageChange}
                className="field-control"
              >
                <option value="en">{t('english')}</option>
                <option value="th">{t('thai')}</option>
              </select>
            </div>
          </div>
        </section>

        {/* Sync & Backup */}
        <section className="glass-panel">
          <h3 className="text-lg font-medium mb-4">{t('backupSync')}</h3>
          <div className="space-y-4">

            <div className="space-y-2 min-w-0">
              <label className="field-label">{t('gasWebhookUrl')}</label>
              
              {!settings.gasSyncUrl ? (
                <>
                  <p className="field-help">{t('gasWebhookUrlDesc')}</p>
                  <div className="flex gap-2">
                    <input 
                      type="url"
                      placeholder="https://script.google.com/macros/s/.../exec"
                      value={tempGasUrl}
                      onChange={(e) => setTempGasUrl(e.target.value)}
                      className="field-control"
                    />
                    <button 
                      onClick={handleSaveGasUrl}
                      disabled={!tempGasUrl.trim()}
                      className="btn btn-primary whitespace-nowrap"
                    >
                      {t('save')}
                    </button>
                  </div>
                </>
              ) : (
                <div className="glass-row flex items-center justify-between px-4 py-2.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium text-sm flex items-center gap-2">
                    ✅ {t('webhookUrlConfigured')}
                  </span>
                  <button 
                    onClick={handleClearGasUrl}
                    className="icon-btn icon-btn-danger"
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
                disabled={!settings.gasSyncUrl || isSyncing}
                className="btn btn-primary flex-1"
              >
                {isSyncing ? t('syncing') : t('syncToGoogleDrive')}
              </button>
              <button 
                onClick={handleExportJson}
                className="btn btn-secondary flex-1"
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

      <footer className="pt-2 text-center">
        <button
          type="button"
          onClick={onVibe}
          className="vibe-credit inline-flex min-h-9 items-center justify-center rounded-full px-3 text-xs font-medium text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300"
          aria-label="Vibe with love by Miickiie"
        >
          Vibe with <span aria-hidden="true" className="mx-1">❤️</span> by Miickiie
        </button>
      </footer>
    </div>
  );
};
