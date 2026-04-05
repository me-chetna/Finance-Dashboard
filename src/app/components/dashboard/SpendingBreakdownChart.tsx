import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getCategoryTotals } from '../../utils/calculations';
import { useApp } from '../../context/AppContext';
import { categoryColors } from '../../data/mockData';

export const SpendingBreakdownChart: React.FC = () => {
  const { transactions } = useApp();
  const categoryTotals = getCategoryTotals(transactions, 'expense');
  
  const chartData = categoryTotals.map(ct => ({
    name: ct.category,
    value: ct.total,
    percentage: ct.percentage.toFixed(1),
  }));
  
  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Spending Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-80 text-gray-500">
            No expense data available
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ${payload[0].value.toLocaleString()} ({payload[0].payload.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Breakdown</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Expenses by category
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry.payload.percentage}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={categoryColors[entry.name as keyof typeof categoryColors]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry: any) => (
                <span className="text-sm">
                  {value} (${entry.payload.value.toLocaleString()})
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
