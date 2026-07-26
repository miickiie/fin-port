import {
  Download,
  RefreshCw,
  Share2,
  X,
} from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { useTranslation } from '../locales/useTranslation';
import {
  dismissInstall,
  dismissUpdate,
  getPwaSnapshot,
  promptInstall,
  refreshApp,
  subscribeToPwa,
} from '../pwa';

export function PwaPrompt() {
  const { t } = useTranslation();
  const state = useSyncExternalStore(
    subscribeToPwa,
    getPwaSnapshot,
    getPwaSnapshot,
  );
  const showUpdate = state.updateAvailable && state.updatePromptVisible;
  const showInstall =
    !showUpdate && state.installAvailable && state.installPromptVisible;

  if (!showUpdate && !showInstall) return null;

  const isNativeInstall = state.installKind === 'native';
  const isSafariInstall =
    state.installKind === 'ios' || state.installKind === 'macos';
  const title = showUpdate ? t('pwaUpdateTitle') : t('pwaInstallTitle');
  const description = showUpdate
    ? t('pwaUpdateDescription')
    : state.installKind === 'ios'
      ? t('pwaIosInstallDescription')
      : state.installKind === 'macos'
        ? t('pwaMacosInstallDescription')
        : t('pwaInstallDescription');
  const Icon = showUpdate
    ? RefreshCw
    : isSafariInstall
      ? Share2
      : Download;
  const dismiss = showUpdate ? dismissUpdate : dismissInstall;

  return (
    <section
      className="pwa-prompt"
      role="status"
      aria-live="polite"
      aria-label={title}
    >
      <div className="pwa-prompt-icon" aria-hidden="true">
        <Icon
          size={21}
          className={state.isUpdating ? 'pwa-prompt-icon-spin' : undefined}
        />
      </div>

      <div className="pwa-prompt-copy">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <button
        type="button"
        className="icon-btn pwa-prompt-close"
        onClick={dismiss}
        aria-label={showUpdate ? t('pwaLater') : t('pwaInstallDismiss')}
        title={showUpdate ? t('pwaLater') : t('pwaInstallDismiss')}
      >
        <X size={18} />
      </button>

      <div className="pwa-prompt-actions">
        {showUpdate && (
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={dismissUpdate}
              disabled={state.isUpdating}
            >
              {t('pwaLater')}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => void refreshApp()}
              disabled={state.isUpdating}
            >
              <RefreshCw
                size={17}
                className={state.isUpdating ? 'pwa-prompt-icon-spin' : undefined}
              />
              {state.isUpdating
                ? t('pwaRefreshing')
                : t('pwaRefreshAction')}
            </button>
          </>
        )}

        {showInstall && isNativeInstall && (
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={dismissInstall}
              disabled={state.isInstalling}
            >
              {t('pwaInstallDismiss')}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => void promptInstall()}
              disabled={state.isInstalling}
            >
              <Download size={17} />
              {state.isInstalling
                ? t('pwaInstalling')
                : t('pwaInstallAction')}
            </button>
          </>
        )}

        {showInstall && isSafariInstall && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={dismissInstall}
          >
            {t('pwaGotIt')}
          </button>
        )}
      </div>
    </section>
  );
}
