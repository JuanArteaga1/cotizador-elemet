import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LandingPage } from '../features/landing/LandingPage';
import { LoginPage } from '../features/auth/LoginPage';
import { RegisterPage } from '../features/auth/RegisterPage';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { QuotePage } from '../features/quote/QuotePage';
import { HistoryPage } from '../features/history/HistoryPage';
import { InvoicePage } from '../features/invoice/InvoicePage';
import { SettingsPage } from '../features/settings/SettingsPage';
import { Layout } from './Layout';
import { useStore } from '../shared/services/store';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useStore((s) => s.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><Layout><DashboardPage /></Layout></ProtectedRoute>,
  },
  {
    path: '/quote',
    element: <ProtectedRoute><Layout><QuotePage /></Layout></ProtectedRoute>,
  },
  {
    path: '/history',
    element: <ProtectedRoute><Layout><HistoryPage /></Layout></ProtectedRoute>,
  },
  {
    path: '/invoice/:quoteId',
    element: <ProtectedRoute><Layout><InvoicePage /></Layout></ProtectedRoute>,
  },
  {
    path: '/settings',
    element: <ProtectedRoute><Layout><SettingsPage /></Layout></ProtectedRoute>,
  },
]);
