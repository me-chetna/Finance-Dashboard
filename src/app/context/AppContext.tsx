import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Transaction, UserRole } from '../types';
import { initialTransactions } from '../data/mockData';

interface AppContextType {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // User & Role
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  
  // Transactions
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  
  // UI State
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  TRANSACTIONS: 'finance_dashboard_transactions',
  THEME: 'finance_dashboard_theme',
  ROLE: 'finance_dashboard_role',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or defaults
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    return saved === 'dark';
  });
  
  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as UserRole) || 'viewer';
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return saved ? JSON.parse(saved) : initialTransactions;
  });
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, userRole);
  }, [userRole]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
  };
  
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };
  
  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    );
  };
  
  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  
  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        userRole,
        setUserRole,
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        isSidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
