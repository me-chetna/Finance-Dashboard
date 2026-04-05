import React from 'react';
import type{ LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { cn } from '../ui/utils';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
  iconBg,
}) => {
  const isPositive = change !== undefined && change >= 0;
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
            {change !== undefined && (
              <p className={cn(
                'mt-2 text-sm font-medium',
                isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              )}>
                {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(1)}% from last month
              </p>
            )}
          </div>
          <div className={cn('p-3 rounded-lg', iconBg)}>
            <Icon className={cn('w-6 h-6', iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
