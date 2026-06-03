import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useStore } from '../../shared/services/store';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useStore();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const items = [
    { route: '/dashboard', icon: '🏠', label: 'Inicio' },
    { route: '/quote', icon: '📐', label: 'Cotizar' },
    { route: '/history', icon: '📂', label: 'Historial' },
    { route: '/settings', icon: '⚙️', label: 'Ajustes' },
  ];

  const isActive = (route: string) => location.pathname === route;

  const handleNavigate = (route: string) => {
    navigate(route);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className={`sidebar-overlay ${open ? 'open' : ''}`} onClick={onClose} />

      {/* Sidebar */}
      <aside ref={sidebarRef} className={`sidebar ${open ? 'open' : ''}`}>
        {/* Logo header */}
        <div style={{ padding: '0 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 22 }}>🏗️</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>ELEMENT</span>
          </div>
          <p className="small" style={{ fontSize: 12, margin: 0 }}>Cotizador Profesional</p>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '0 12px' }}>
          <p className="small" style={{ padding: '12px 12px 8px', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>Menú Principal</p>
          {items.map((item) => (
            <div
              key={item.route}
              className={`sidebar-item ${isActive(item.route) ? 'active' : ''}`}
              onClick={() => handleNavigate(item.route)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNavigate(item.route)}
            >
              <span style={{ fontSize: 20, width: 28, textAlign: 'center' }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '12px 24px 0', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 'auto' }}>
          <div
            className="sidebar-item"
            onClick={() => {
              logout();
              onClose();
              navigate('/login');
            }}
            style={{ color: '#ff3b30' }}
            role="button"
            tabIndex={0}
          >
            <span style={{ fontSize: 20, width: 28, textAlign: 'center' }}>🚪</span>
            <span>Cerrar Sesión</span>
          </div>
        </div>
      </aside>
    </>
  );
}
