import type{ Transaction, TransactionCategory } from '../types';

// Generate realistic mock transactions
export const generateMockTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [
    // January 2026
    { id: '1', date: '2026-01-05', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly salary deposit' },
    { id: '2', date: '2026-01-07', amount: 450, category: 'Bills & Utilities', type: 'expense', description: 'Electricity bill' },
    { id: '3', date: '2026-01-10', amount: 120, category: 'Food & Dining', type: 'expense', description: 'Grocery shopping' },
    { id: '4', date: '2026-01-12', amount: 80, category: 'Transport', type: 'expense', description: 'Fuel' },
    { id: '5', date: '2026-01-15', amount: 200, category: 'Shopping', type: 'expense', description: 'Clothing' },
    { id: '6', date: '2026-01-18', amount: 60, category: 'Entertainment', type: 'expense', description: 'Movie tickets' },
    { id: '7', date: '2026-01-20', amount: 800, category: 'Freelance', type: 'income', description: 'Freelance project payment' },
    { id: '8', date: '2026-01-22', amount: 150, category: 'Healthcare', type: 'expense', description: 'Doctor consultation' },
    { id: '9', date: '2026-01-25', amount: 90, category: 'Food & Dining', type: 'expense', description: 'Restaurant dinner' },
    { id: '10', date: '2026-01-28', amount: 500, category: 'Education', type: 'expense', description: 'Online course subscription' },
    
    // February 2026
    { id: '11', date: '2026-02-05', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly salary deposit' },
    { id: '12', date: '2026-02-06', amount: 470, category: 'Bills & Utilities', type: 'expense', description: 'Internet & phone bill' },
    { id: '13', date: '2026-02-08', amount: 135, category: 'Food & Dining', type: 'expense', description: 'Grocery shopping' },
    { id: '14', date: '2026-02-10', amount: 250, category: 'Shopping', type: 'expense', description: 'Electronics' },
    { id: '15', date: '2026-02-12', amount: 1200, category: 'Investment', type: 'income', description: 'Stock dividends' },
    { id: '16', date: '2026-02-15', amount: 75, category: 'Transport', type: 'expense', description: 'Public transport pass' },
    { id: '17', date: '2026-02-18', amount: 100, category: 'Entertainment', type: 'expense', description: 'Concert tickets' },
    { id: '18', date: '2026-02-20', amount: 600, category: 'Freelance', type: 'income', description: 'Consulting work' },
    { id: '19', date: '2026-02-22', amount: 180, category: 'Food & Dining', type: 'expense', description: 'Groceries' },
    { id: '20', date: '2026-02-25', amount: 50, category: 'Other', type: 'expense', description: 'Pet supplies' },
    
    // March 2026
    { id: '21', date: '2026-03-05', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly salary deposit' },
    { id: '22', date: '2026-03-07', amount: 420, category: 'Bills & Utilities', type: 'expense', description: 'Water & gas bill' },
    { id: '23', date: '2026-03-09', amount: 160, category: 'Food & Dining', type: 'expense', description: 'Grocery shopping' },
    { id: '24', date: '2026-03-11', amount: 85, category: 'Transport', type: 'expense', description: 'Car maintenance' },
    { id: '25', date: '2026-03-13', amount: 300, category: 'Shopping', type: 'expense', description: 'Home decor' },
    { id: '26', date: '2026-03-15', amount: 120, category: 'Entertainment', type: 'expense', description: 'Streaming subscriptions' },
    { id: '27', date: '2026-03-18', amount: 950, category: 'Freelance', type: 'income', description: 'Web development project' },
    { id: '28', date: '2026-03-20', amount: 200, category: 'Healthcare', type: 'expense', description: 'Dental checkup' },
    { id: '29', date: '2026-03-22', amount: 140, category: 'Food & Dining', type: 'expense', description: 'Restaurant' },
    { id: '30', date: '2026-03-25', amount: 75, category: 'Other', type: 'expense', description: 'Gifts' },
    
    // April 2026 (Current month)
    { id: '31', date: '2026-04-01', amount: 110, category: 'Food & Dining', type: 'expense', description: 'Grocery shopping' },
    { id: '32', date: '2026-04-02', amount: 450, category: 'Bills & Utilities', type: 'expense', description: 'Rent contribution' },
    { id: '33', date: '2026-04-03', amount: 65, category: 'Entertainment', type: 'expense', description: 'Video games' },
  ];

  return transactions;
};

export const categoryColors: Record<TransactionCategory, string> = {
  'Salary': '#10b981',
  'Freelance': '#3b82f6',
  'Investment': '#8b5cf6',
  'Food & Dining': '#f59e0b',
  'Shopping': '#ec4899',
  'Transport': '#14b8a6',
  'Entertainment': '#f97316',
  'Healthcare': '#ef4444',
  'Bills & Utilities': '#6366f1',
  'Education': '#06b6d4',
  'Other': '#64748b',
};

export const initialTransactions = generateMockTransactions();
