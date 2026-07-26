import React from 'react';
import { LayoutDashboard, PlusCircle, List, PieChart, Settings } from 'lucide-react';
import { useTranslation, LocaleKey } from '../locales/useTranslation';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isVibing?: boolean;
  vibeRun?: number;
}

const confettiPieces = Array.from({ length: 28 }, (_, index) => index);

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  isVibing = false,
  vibeRun = 0,
}) => {
  const { t } = useTranslation();

  const tabs: { id: string; label: LocaleKey; icon: any }[] = [
    { id: 'dashboard', label: 'dashboard', icon: LayoutDashboard },
    { id: 'log', label: 'addLog', icon: PlusCircle },
    { id: 'holdings', label: 'history', icon: List },
    { id: 'allocation', label: 'targets', icon: PieChart },
    { id: 'settings', label: 'settings', icon: Settings },
  ];

  return (
    <>
      <div className={`app-shell ${isVibing ? 'app-vibe-shake' : ''}`}>
        {/* Desktop Sidebar */}
        <aside className="nav-rail">
          <div className="app-brand app-brand-desktop">
            <img
              src={`${import.meta.env.BASE_URL}favicon.svg`}
              alt=""
              className="app-brand-logo"
              aria-hidden="true"
            />
            <h1 className="app-brand-name">FinPort</h1>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`nav-item ${activeTab === tab.id ? 'nav-item-active' : ''}`}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                >
                  <Icon size={20} />
                  <span>{t(tab.label)}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="app-main">
          <div className="app-brand app-brand-mobile">
            <img
              src={`${import.meta.env.BASE_URL}favicon.svg`}
              alt=""
              className="app-brand-logo"
              aria-hidden="true"
            />
            <span className="app-brand-name">FinPort</span>
          </div>
          <div className="app-content">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="mobile-nav md:hidden">
          <div className="flex justify-around items-center h-16">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`mobile-nav-item ${activeTab === tab.id ? 'mobile-nav-item-active' : ''}`}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                >
                  <Icon size={20} className={activeTab === tab.id ? 'stroke-[2.5px]' : ''} />
                  <span className="mobile-nav-label">{t(tab.label)}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {isVibing && (
        <div key={vibeRun} className="vibe-effect-layer" aria-hidden="true">
          {confettiPieces.map((piece) => (
            <span key={piece} className="vibe-confetti" />
          ))}
        </div>
      )}
    </>
  );
};
