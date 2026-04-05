import React from 'react';
import { Link } from 'react-router';
import { Home } from 'lucide-react';
import { Button } from '../components/ui/button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Oops! Page not found
      </p>
      <Link to="/">
        <Button className="gap-2">
          <Home className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
};
