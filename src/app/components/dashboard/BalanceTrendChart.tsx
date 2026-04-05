import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getMonthlyData, getMonthName } from '../../utils/calculations';
import { useApp } from '../../context/AppContext';

export const BalanceTrendChart: React.FC = () => {
  const { transactions } = useApp();
  const monthlyData = getMonthlyData(transactions);
  
  const chartData = monthlyData.map(d => ({
    month: getMonthName(d.month),
    Income: d.income,
    Expenses: d.expenses,
    Balance: d.balance,
  }));
  
  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Balance Trend</CardTitle>
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
        <CardTitle>Balance Trend</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Monthly income vs expenses over time
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis 
              dataKey="month" 
              className="text-sm"
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
            <Line 
              type="monotone" 
              dataKey="Income" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981' }}
            />
            <Line 
              type="monotone" 
              dataKey="Expenses" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={{ fill: '#ef4444' }}
            />
            <Line 
              type="monotone" 
              dataKey="Balance" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
