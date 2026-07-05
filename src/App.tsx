import React, { useState } from 'react';
import { PortfolioProvider } from './store/PortfolioContext';
import { Layout } from './components/Layout';
import { Dashboard } from './components/views/Dashboard';
import { LogForm } from './components/views/LogForm';
import { Holdings } from './components/views/Holdings';
import { AllocationEditor } from './components/views/AllocationEditor';
import { Settings } from './components/views/Settings';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'log' && <LogForm onComplete={() => setActiveTab('dashboard')} />}
        {activeTab === 'holdings' && <Holdings />}
        {activeTab === 'allocation' && <AllocationEditor />}
        {activeTab === 'settings' && <Settings />}
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
