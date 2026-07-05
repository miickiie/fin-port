import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { InvestmentLog, PortfolioSettings, PortfolioState, TargetAllocation } from '../types';
import { DEFAULT_TARGETS } from '../constants';

interface PortfolioContextType extends PortfolioState {
  addLog: (log: Omit<InvestmentLog, 'id' | 'createdAt'>) => void;
  updateLog: (id: string, log: Partial<InvestmentLog>) => void;
  deleteLog: (id: string) => void;
  updateTargets: (targets: TargetAllocation[]) => void;
  updateSettings: (settings: Partial<PortfolioSettings>) => void;
  importData: (data: PortfolioState) => void;
}

const STORAGE_KEY = 'portfolio_tracker_data';

const defaultState: PortfolioState = {
  logs: [],
  targets: DEFAULT_TARGETS,
  settings: {
    theme: 'system',
    language: 'en',
  },
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PortfolioState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse stored portfolio data', e);
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Apply theme
    const root = window.document.documentElement;
    
    const applyTheme = () => {
      root.classList.remove('light', 'dark');
      if (state.settings.theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(state.settings.theme);
      }
    };

    applyTheme();

    if (state.settings.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [state]);

  const addLog = useCallback((logData: Omit<InvestmentLog, 'id' | 'createdAt'>) => {
    const newLog: InvestmentLog = {
      ...logData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      logs: [newLog, ...prev.logs],
    }));
  }, []);

  const updateLog = useCallback((id: string, updates: Partial<InvestmentLog>) => {
    setState((prev) => ({
      ...prev,
      logs: prev.logs.map((log) => (log.id === id ? { ...log, ...updates } : log)),
    }));
  }, []);

  const deleteLog = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      logs: prev.logs.filter((log) => log.id !== id),
    }));
  }, []);

  const updateTargets = useCallback((targets: TargetAllocation[]) => {
    setState((prev) => ({ ...prev, targets }));
  }, []);

  const updateSettings = useCallback((settings: Partial<PortfolioSettings>) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
    }));
  }, []);

  const importData = useCallback((data: PortfolioState) => {
    setState(data);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{ ...state, addLog, updateLog, deleteLog, updateTargets, updateSettings, importData }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
