import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateStats, getTopSpendingCategory } from '../../utils/calculations';

export const SpendingRecommendations: React.FC = () => {
  const { transactions } = useApp();
  const stats = calculateStats(transactions);
  const topCategory = getTopSpendingCategory(transactions);
  
  const recommendations = [];
  
  // Generate recommendations based on data
  const savingsRate = stats.totalIncome > 0 
    ? ((stats.totalIncome - stats.totalExpenses) / stats.totalIncome) * 100 
    : 0;
  
  if (savingsRate < 20 && stats.totalIncome > 0) {
    recommendations.push({
      type: 'warning' as const,
      title: 'Low Savings Rate',
      message: `Your current savings rate is ${savingsRate.toFixed(1)}%. Financial experts recommend saving at least 20% of your income.`,
    });
  } else if (savingsRate >= 20) {
    recommendations.push({
      type: 'success' as const,
      title: 'Great Savings Rate!',
      message: `You're saving ${savingsRate.toFixed(1)}% of your income. Keep up the excellent work!`,
    });
  }
  
  if (topCategory && topCategory.percentage > 40) {
    recommendations.push({
      type: 'warning' as const,
      title: 'High Category Concentration',
      message: `${topCategory.category} accounts for ${topCategory.percentage.toFixed(1)}% of your expenses. Consider diversifying your spending or reviewing if this category can be optimized.`,
    });
  }
  
  if (stats.totalExpenses > stats.totalIncome) {
    recommendations.push({
      type: 'alert' as const,
      title: 'Spending Exceeds Income',
      message: 'Your expenses are higher than your income. Review your budget and identify areas where you can cut back.',
    });
  }
  
  if (recommendations.length === 0) {
    recommendations.push({
      type: 'info' as const,
      title: 'Looking Good!',
      message: 'Your finances are in good shape. Continue tracking your transactions and maintaining healthy financial habits.',
    });
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Recommendations</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Personalized insights based on your spending patterns
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => {
            const Icon = rec.type === 'success' 
              ? CheckCircle2 
              : rec.type === 'alert' 
              ? AlertCircle 
              : Info;
            
            const colors = {
              success: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
              warning: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20',
              alert: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
              info: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
            };
            
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  rec.type === 'success' ? 'border-green-200 dark:border-green-800' :
                  rec.type === 'warning' ? 'border-yellow-200 dark:border-yellow-800' :
                  rec.type === 'alert' ? 'border-red-200 dark:border-red-800' :
                  'border-blue-200 dark:border-blue-800'
                } ${colors[rec.type]}`}
              >
                <div className="flex gap-3">
                  <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">{rec.title}</h4>
                    <p className="text-sm opacity-90">{rec.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
