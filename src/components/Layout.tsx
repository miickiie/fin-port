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
      <div className={`min-h-screen bg-transparent text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans ${isVibing ? 'app-vibe-shake' : ''}`}>
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-white/40 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-2xl">
          <div className="p-6">
            <h1 className="text-xl font-semibold tracking-tight">FinPort</h1>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Icon size={20} />
                  <span>{t(tab.label)}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-y-auto pb-24 md:pb-0 h-screen">
          <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-white/40 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl pb-safe z-50 shadow-[0_-8px_32px_0_rgba(0,0,0,0.05)]">
          <div className="flex justify-around items-center h-16">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                    activeTab === tab.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <Icon size={20} className={activeTab === tab.id ? 'stroke-[2.5px]' : ''} />
                  <span className="text-[10px] font-medium">{t(tab.label)}</span>
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
