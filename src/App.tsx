import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PortfolioProvider } from './store/PortfolioContext';
import { Layout } from './components/Layout';
import { Dashboard } from './components/views/Dashboard';
import { LogForm } from './components/views/LogForm';
import { Holdings } from './components/views/Holdings';
import { AllocationEditor } from './components/views/AllocationEditor';
import { Settings } from './components/views/Settings';

const VIBE_DURATION_MS = 1100;

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isVibing, setIsVibing] = useState(false);
  const [vibeRun, setVibeRun] = useState(0);
  const vibeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleVibe = useCallback(() => {
    if (vibeTimerRef.current) {
      clearTimeout(vibeTimerRef.current);
    }

    setVibeRun((currentRun) => currentRun + 1);
    setIsVibing(true);
    vibeTimerRef.current = setTimeout(() => {
      setIsVibing(false);
      vibeTimerRef.current = null;
    }, VIBE_DURATION_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (vibeTimerRef.current) {
        clearTimeout(vibeTimerRef.current);
      }
    };
  }, []);

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isVibing={isVibing}
      vibeRun={vibeRun}
    >
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'log' && <LogForm onComplete={() => setActiveTab('dashboard')} />}
        {activeTab === 'holdings' && <Holdings />}
        {activeTab === 'allocation' && <AllocationEditor />}
        {activeTab === 'settings' && <Settings onVibe={handleVibe} />}
      </div>
    </Layout>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}
