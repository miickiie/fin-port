import { registerSW } from 'virtual:pwa-register';

const INSTALL_DISMISSAL_KEY = 'finport_pwa_install_dismissed_at';
const INSTALL_DISMISSAL_MS = 30 * 24 * 60 * 60 * 1000;
const UPDATE_CHECK_INTERVAL_MS = 60 * 60 * 1000;
const FOCUS_CHECK_INTERVAL_MS = 15 * 60 * 1000;

export type InstallKind = 'native' | 'ios' | 'macos' | null;

export interface PwaState {
  installAvailable: boolean;
  installKind: InstallKind;
  installPromptVisible: boolean;
  updateAvailable: boolean;
  updatePromptVisible: boolean;
  isInstalling: boolean;
  isUpdating: boolean;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

type PwaListener = () => void;
type UpdateServiceWorker = (reloadPage?: boolean) => Promise<void>;

const listeners = new Set<PwaListener>();

let snapshot: PwaState = {
  installAvailable: false,
  installKind: null,
  installPromptVisible: false,
  updateAvailable: false,
  updatePromptVisible: false,
  isInstalling: false,
  isUpdating: false,
};

let initialized = false;
let installPrompt: BeforeInstallPromptEvent | null = null;
let registration: ServiceWorkerRegistration | undefined;
let updateServiceWorker: UpdateServiceWorker | null = null;
let lastUpdateCheckAt = 0;

function publish(patch: Partial<PwaState>) {
  const next = { ...snapshot, ...patch };
  const changed = Object.keys(next).some(
    (key) =>
      next[key as keyof PwaState] !== snapshot[key as keyof PwaState],
  );

  if (!changed) return;

  snapshot = next;
  listeners.forEach((listener) => listener());
}

function isStandalone() {
  const navigatorWithStandalone = navigator as Navigator & {
    standalone?: boolean;
  };

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    navigatorWithStandalone.standalone === true
  );
}

function isInstallDismissed() {
  try {
    const dismissedAt = Number(localStorage.getItem(INSTALL_DISMISSAL_KEY));
    return Number.isFinite(dismissedAt) &&
      dismissedAt > 0 &&
      Date.now() - dismissedAt < INSTALL_DISMISSAL_MS;
  } catch {
    return false;
  }
}

function rememberInstallDismissal() {
  try {
    localStorage.setItem(INSTALL_DISMISSAL_KEY, String(Date.now()));
  } catch {
    // The prompt still closes when storage is unavailable.
  }
}

function getSafariInstallKind(): InstallKind {
  const userAgent = navigator.userAgent;
  const navigatorWithPlatform = navigator as Navigator & {
    platform?: string;
    maxTouchPoints?: number;
  };
  const isSafari =
    /Safari/i.test(userAgent) &&
    !/(Chrome|Chromium|CriOS|Edg|OPR|FxiOS)/i.test(userAgent);

  if (!isSafari) return null;

  const isAppleMobile =
    /iPad|iPhone|iPod/i.test(userAgent) ||
    (navigatorWithPlatform.platform === 'MacIntel' &&
      (navigatorWithPlatform.maxTouchPoints ?? 0) > 1);

  return isAppleMobile ? 'ios' : 'macos';
}

async function checkForUpdate(force = false) {
  if (!registration || !navigator.onLine) return;

  const now = Date.now();
  if (!force && now - lastUpdateCheckAt < FOCUS_CHECK_INTERVAL_MS) return;

  lastUpdateCheckAt = now;

  try {
    await registration.update();
  } catch {
    // A later focus or interval retries transient network failures.
  }
}

function handleFocus() {
  void checkForUpdate();
}

function handleVisibilityChange() {
  if (document.visibilityState === 'visible') {
    void checkForUpdate();
  }
}

function handleBeforeInstallPrompt(event: Event) {
  event.preventDefault();

  if (isStandalone() || isInstallDismissed()) return;

  installPrompt = event as BeforeInstallPromptEvent;
  publish({
    installAvailable: true,
    installKind: 'native',
    installPromptVisible: true,
  });
}

function handleAppInstalled() {
  installPrompt = null;
  publish({
    installAvailable: false,
    installKind: null,
    installPromptVisible: false,
    isInstalling: false,
  });
}

export function initializePwa() {
  if (initialized || !import.meta.env.PROD) return;
  initialized = true;

  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  window.addEventListener('appinstalled', handleAppInstalled);
  window.addEventListener('focus', handleFocus);
  document.addEventListener('visibilitychange', handleVisibilityChange);

  if (!isStandalone() && !isInstallDismissed()) {
    const safariInstallKind = getSafariInstallKind();
    if (safariInstallKind) {
      publish({
        installAvailable: true,
        installKind: safariInstallKind,
        installPromptVisible: true,
      });
    }
  }

  updateServiceWorker = registerSW({
    immediate: true,
    onNeedRefresh() {
      publish({
        updateAvailable: true,
        updatePromptVisible: true,
      });
    },
    onRegisteredSW(_serviceWorkerUrl, serviceWorkerRegistration) {
      registration = serviceWorkerRegistration;
      lastUpdateCheckAt = Date.now();
    },
  });

  window.setInterval(
    () => void checkForUpdate(true),
    UPDATE_CHECK_INTERVAL_MS,
  );
}

export function subscribeToPwa(listener: PwaListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getPwaSnapshot() {
  return snapshot;
}

export async function promptInstall() {
  if (!installPrompt || snapshot.installKind !== 'native') return;

  publish({ isInstalling: true });

  try {
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;

    if (choice.outcome === 'dismissed') {
      rememberInstallDismissal();
    }
  } finally {
    installPrompt = null;
    publish({
      installAvailable: false,
      installKind: null,
      installPromptVisible: false,
      isInstalling: false,
    });
  }
}

export function dismissInstall() {
  rememberInstallDismissal();
  installPrompt = null;
  publish({
    installAvailable: false,
    installKind: null,
    installPromptVisible: false,
    isInstalling: false,
  });
}

export function dismissUpdate() {
  publish({ updatePromptVisible: false });
}

export async function refreshApp() {
  if (!updateServiceWorker) return;

  publish({ isUpdating: true });

  try {
    await updateServiceWorker(true);
  } catch {
    publish({ isUpdating: false });
  }
}
