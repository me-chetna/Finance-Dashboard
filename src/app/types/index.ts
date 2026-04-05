// Core types for the Finance Dashboard
export type TransactionType = 'income' | 'expense';

export type TransactionCategory = 
  | 'Salary'
  | 'Freelance'
  | 'Investment'
  | 'Food & Dining'
  | 'Shopping'
  | 'Transport'
  | 'Entertainment'
  | 'Healthcare'
  | 'Bills & Utilities'
  | 'Education'
  | 'Other';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: TransactionCategory;
  type: TransactionType;
  description: string;
}

export type UserRole = 'admin' | 'viewer';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface FilterOptions {
  search: string;
  type: TransactionType | 'all';
  category: TransactionCategory | 'all';
  dateRange: 'all' | 'today' | 'week' | 'month' | 'year';
  sortBy: 'date' | 'amount';
  sortOrder: 'asc' | 'desc';
}

export interface DashboardStats {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  transactionCount: number;
}

export interface CategoryTotal {
  category: TransactionCategory;
  total: number;
  percentage: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}
