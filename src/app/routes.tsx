import { createBrowserRouter } from 'react-router';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { InsightsPage } from './pages/InsightsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <DashboardPage />
      </Layout>
    ),
  },
  {
    path: '/transactions',
    element: (
      <Layout>
        <TransactionsPage />
      </Layout>
    ),
  },
  {
    path: '/insights',
    element: (
      <Layout>
        <InsightsPage />
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <NotFoundPage />
      </Layout>
    ),
  },
]);
