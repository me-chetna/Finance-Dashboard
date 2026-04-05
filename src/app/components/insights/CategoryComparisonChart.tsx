import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getCategoryTotals } from '../../utils/calculations';
import { useApp } from '../../context/AppContext';
import { categoryColors } from '../../data/mockData';

export const CategoryComparisonChart: React.FC = () => {
  const { transactions } = useApp();
  
  const incomeByCategory = getCategoryTotals(transactions, 'income');
  const expenseByCategory = getCategoryTotals(transactions, 'expense');
  
  // Merge both into a single dataset
  const allCategories = new Set([
    ...incomeByCategory.map(c => c.category),
    ...expenseByCategory.map(c => c.category),
  ]);
  
  const chartData = Array.from(allCategories).map(category => ({
    category,
    Income: incomeByCategory.find(c => c.category === category)?.total || 0,
    Expenses: expenseByCategory.find(c => c.category === category)?.total || 0,
  }));
  
  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Income vs Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-80 text-gray-500">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expenses by Category</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Compare income and expenses across different categories
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis 
              dataKey="category" 
              angle={-45}
              textAnchor="end"
              height={100}
              className="text-xs"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis 
              className="text-sm"
              tick={{ fill: 'currentColor' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
