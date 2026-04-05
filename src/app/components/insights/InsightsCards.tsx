import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  getTopSpendingCategory,
  getMonthlyComparison,
  formatCurrency,
} from '../../utils/calculations';
import { categoryColors } from '../../data/mockData';
import { cn } from '../ui/utils';

export const InsightsCards: React.FC = () => {
  const { transactions } = useApp();
  
  const topCategory = getTopSpendingCategory(transactions);
  const monthlyComparison = getMonthlyComparison(transactions);
  
  const insights = [
    {
      title: 'Highest Spending Category',
      value: topCategory ? topCategory.category : 'N/A',
      subtitle: topCategory ? `${formatCurrency(topCategory.total)} (${topCategory.percentage.toFixed(1)}%)` : 'No data',
      icon: Target,
      color: topCategory ? categoryColors[topCategory.category] : '#64748b',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Monthly Expense Change',
      value: monthlyComparison.expenseChange !== 0 
        ? `${monthlyComparison.expenseChange > 0 ? '+' : ''}${monthlyComparison.expenseChange.toFixed(1)}%`
        : 'No change',
      subtitle: `${formatCurrency(monthlyComparison.current.totalExpenses)} this month`,
      icon: monthlyComparison.expenseChange > 0 ? TrendingUp : TrendingDown,
      color: monthlyComparison.expenseChange > 0 ? '#ef4444' : '#10b981',
      bgColor: monthlyComparison.expenseChange > 0 
        ? 'bg-red-50 dark:bg-red-900/20' 
        : 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Monthly Income Change',
      value: monthlyComparison.incomeChange !== 0
        ? `${monthlyComparison.incomeChange > 0 ? '+' : ''}${monthlyComparison.incomeChange.toFixed(1)}%`
        : 'No change',
      subtitle: `${formatCurrency(monthlyComparison.current.totalIncome)} this month`,
      icon: monthlyComparison.incomeChange > 0 ? TrendingUp : TrendingDown,
      color: monthlyComparison.incomeChange > 0 ? '#10b981' : '#ef4444',
      bgColor: monthlyComparison.incomeChange > 0 
        ? 'bg-green-50 dark:bg-green-900/20' 
        : 'bg-red-50 dark:bg-red-900/20',
    },
    {
      title: 'Average Transaction',
      value: transactions.length > 0
        ? formatCurrency(transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length)
        : '$0',
      subtitle: `Across ${transactions.length} transactions`,
      icon: DollarSign,
      color: '#3b82f6',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {insights.map((insight, index) => {
        const Icon = insight.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {insight.title}
              </CardTitle>
              <div className={cn('p-2 rounded-lg', insight.bgColor)}>
                <Icon className="w-4 h-4" style={{ color: insight.color }} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: insight.color }}>
                {insight.value}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {insight.subtitle}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
