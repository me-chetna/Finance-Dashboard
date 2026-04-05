import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/calculations';
import { cn } from '../ui/utils';

export const RecentTransactions: React.FC = () => {
  const { transactions } = useApp();
  
  // Get the 5 most recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  if (recentTransactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 text-gray-500">
            No transactions yet
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Latest 5 transactions
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'p-2 rounded-full',
                    transaction.type === 'income'
                      ? 'bg-green-100 dark:bg-green-900/20'
                      : 'bg-red-100 dark:bg-red-900/20'
                  )}
                >
                  {transaction.type === 'income' ? (
                    <ArrowDownRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {transaction.category} • {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  'font-semibold',
                  transaction.type === 'income'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                )}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
