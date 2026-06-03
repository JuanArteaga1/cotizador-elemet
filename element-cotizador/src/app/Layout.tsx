import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { TopNav } from '../shared/components/TopNav';
import { Sidebar } from '../shared/components/Sidebar';
import { NotificationContainer } from '../shared/hooks/useNotifications';
import { useStore } from '../shared/services/store';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAuthenticated = useStore((s) => s.isAuthenticated);
  const loadFromBackend = useStore((s) => s.loadFromBackend);

  // Load quotes and config from SaaS on mount if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      loadFromBackend();
    }
  }, [isAuthenticated, loadFromBackend]);

  return (
    <>
      <NotificationContainer />
      <TopNav onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="wrap">
        {children}
      </div>
    </>
  );
}
