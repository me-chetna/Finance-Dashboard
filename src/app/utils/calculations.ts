import type{ Transaction, DashboardStats, CategoryTotal, MonthlyData, TransactionCategory } from '../types';

export const calculateStats = (transactions: Transaction[]): DashboardStats => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return {
    totalBalance: totalIncome - totalExpenses,
    totalIncome,
    totalExpenses,
    transactionCount: transactions.length,
  };
};

export const getCategoryTotals = (transactions: Transaction[], type: 'income' | 'expense'): CategoryTotal[] => {
  const filtered = transactions.filter(t => t.type === type);
  const total = filtered.reduce((sum, t) => sum + t.amount, 0);
  
  const categoryMap = new Map<TransactionCategory, number>();
  
  filtered.forEach(t => {
    const current = categoryMap.get(t.category) || 0;
    categoryMap.set(t.category, current + t.amount);
  });
  
  const categoryTotals: CategoryTotal[] = Array.from(categoryMap.entries()).map(([category, amount]) => ({
    category,
    total: amount,
    percentage: total > 0 ? (amount / total) * 100 : 0,
  }));
  
  return categoryTotals.sort((a, b) => b.total - a.total);
};

export const getMonthlyData = (transactions: Transaction[]): MonthlyData[] => {
  const monthMap = new Map<string, { income: number; expenses: number }>();
  
  transactions.forEach(t => {
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    const current = monthMap.get(monthKey) || { income: 0, expenses: 0 };
    
    if (t.type === 'income') {
      current.income += t.amount;
    } else {
      current.expenses += t.amount;
    }
    
    monthMap.set(monthKey, current);
  });
  
  const monthlyData: MonthlyData[] = Array.from(monthMap.entries())
    .map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
      balance: data.income - data.expenses,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
  
  return monthlyData;
};

export const getTopSpendingCategory = (transactions: Transaction[]): CategoryTotal | null => {
  const categoryTotals = getCategoryTotals(transactions, 'expense');
  return categoryTotals.length > 0 ? categoryTotals[0] : null;
};

export const getMonthlyComparison = (transactions: Transaction[]) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  
  const currentMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
  
  const lastMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
  });
  
  const currentStats = calculateStats(currentMonthTransactions);
  const lastStats = calculateStats(lastMonthTransactions);
  
  return {
    current: currentStats,
    last: lastStats,
    expenseChange: lastStats.totalExpenses > 0 
      ? ((currentStats.totalExpenses - lastStats.totalExpenses) / lastStats.totalExpenses) * 100 
      : 0,
    incomeChange: lastStats.totalIncome > 0 
      ? ((currentStats.totalIncome - lastStats.totalIncome) / lastStats.totalIncome) * 100 
      : 0,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const getMonthName = (monthString: string): string => {
  const [year, month] = monthString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};
