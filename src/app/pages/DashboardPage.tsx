import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/dashboard/StatCard';
import { BalanceTrendChart } from '../components/dashboard/BalanceTrendChart';
import { SpendingBreakdownChart } from '../components/dashboard/SpendingBreakdownChart';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { calculateStats, getMonthlyComparison, formatCurrency } from '../utils/calculations';

export const DashboardPage: React.FC = () => {
  const { transactions } = useApp();
  const stats = calculateStats(transactions);
  const monthlyComparison = getMonthlyComparison(transactions);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Track your financial activity at a glance
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Balance"
          value={formatCurrency(stats.totalBalance)}
          icon={Wallet}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-900/20"
        />
        <StatCard
          title="Total Income"
          value={formatCurrency(stats.totalIncome)}
          change={monthlyComparison.incomeChange}
          icon={TrendingUp}
          iconColor="text-green-600 dark:text-green-400"
          iconBg="bg-green-50 dark:bg-green-900/20"
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(stats.totalExpenses)}
          change={monthlyComparison.expenseChange}
          icon={TrendingDown}
          iconColor="text-red-600 dark:text-red-400"
          iconBg="bg-red-50 dark:bg-red-900/20"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>
      
      {/* Recent Transactions */}
      <RecentTransactions />
    </div>
  );
};
