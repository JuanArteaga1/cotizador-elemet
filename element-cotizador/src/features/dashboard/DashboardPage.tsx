import { useNavigate } from 'react-router-dom';
import { useStore } from '../../shared/services/store';
import logoSinBaner from '../../assets/LOGO SIN BANER/ELEMENThaus - Transparent White.png';

export function DashboardPage() {
  const navigate = useNavigate();
  const { quotes, config, user } = useStore();

  const quickActions = [
    { icon: '📐', title: 'Nueva Cotización', desc: 'Crear cotización profesional', color: '#b69462', route: '/quote' },
    { icon: '⚙️', title: 'Ajustes', desc: 'Configurar tarifas y pagos', color: '#999', route: '/settings' },
    { icon: '📂', title: 'Historial', desc: `${quotes.length} cotizaciones guardadas`, color: '#34c759', route: '/history' },
    { icon: '📋', title: 'Cuenta de Cobro', desc: 'Generar factura profesional', color: '#ff9500', route: '/history' },
  ];

  const recentQuotes = quotes.slice(0, 3);

  return (
    <main>
      {/* Header with logo */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: 32,
        paddingBottom: 24,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 8 }}>
            Hola {user?.name?.trim() || 'Usuario'} 👋
          </h1>
          <p className="small" style={{ fontSize: 16 }}>
            Bienvenido a ELEMENThaus Cotizador
          </p>
        </div>
        <img 
          src={logoSinBaner} 
          alt="ELEMENThaus" 
          style={{ 
            width: 120, 
            height: 'auto',
            opacity: 0.7,
          }} 
        />
      </div>

      {/* Quick Actions Grid */}
      <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', marginBottom: 40 }}>
        {quickActions.map((action, i) => (
          <div
            key={i}
            className="feature-card"
            onClick={() => navigate(action.route)}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ fontSize: 36, marginBottom: 12 }}>{action.icon}</div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{action.title}</h3>
            <p className="small">{action.desc}</p>
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                background: action.color,
                opacity: 0.5,
              }}
            />
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      {recentQuotes.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Cotizaciones Recientes</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {recentQuotes.map((quote) => (
              <div
                key={quote.id}
                className="card"
                onClick={() => navigate('/history')}
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600 }}>{quote.client}</h3>
                  <p className="small">{quote.project}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 700, color: '#b69462' }}>
                    ${quote.price.toLocaleString('es-CO')}
                  </span>
                  <p className="small">{quote.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div className="stat-card">
          <div className="stat-number">{quotes.length}</div>
          <p className="small">Cotizaciones</p>
        </div>
        <div className="stat-card">
          <div className="stat-number">{Object.keys(config.services).length || 8}</div>
          <p className="small">Servicios</p>
        </div>
        <div className="stat-card">
          <div className="stat-number">{config.paymentPlan.payments.length}</div>
          <p className="small">Pagos Configurados</p>
        </div>
      </div>
    </main>
  );
}
