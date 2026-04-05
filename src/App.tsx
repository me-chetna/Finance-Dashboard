import { RouterProvider } from 'react-router-dom';
import { AppProvider } from './app/context/AppContext';
import { Toaster } from './app/components/ui/sonner';
import { router } from './app/routes';

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </AppProvider>
  );
}
