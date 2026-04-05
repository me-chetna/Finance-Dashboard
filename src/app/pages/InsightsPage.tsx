import React from 'react';
import { InsightsCards } from '../components/insights/InsightsCards';
import { CategoryComparisonChart } from '../components/insights/CategoryComparisonChart';
import { SpendingRecommendations } from '../components/insights/SpendingRecommendations';

export const InsightsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Financial Insights
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Analyze your spending patterns and get personalized recommendations
        </p>
      </div>
      
      {/* Insights Cards */}
      <InsightsCards />
      
      {/* Charts and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryComparisonChart />
        <SpendingRecommendations />
      </div>
    </div>
  );
};
