import React, { useState } from 'react';
import { Menu, Bell, Sun, Moon, Building2 } from 'lucide-react';

const TopBar = ({ 
  theme, 
  onThemeToggle, 
  pressure, 
  onPressureToggle, 
  onMobileMenuToggle, 
  onExitSimulation 
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Sarah (Designer)', desc: 'Sarah moved wireframes to in progress on the shared board.', time: '1 min ago' },
    { id: 2, title: 'Mike (Developer)', desc: 'Mike reviewed the database schemas SQL files.', time: '4 mins ago' }
  ]);

  const userStr = localStorage.getItem('user');
  let user = null;
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch {}

  const isInvited = user && (user.isInvited || (user.company && user.company !== 'Demo Workspace'));
  const companyName = (user && user.company) ? user.company.toUpperCase() : 'ENTERPRISE';

  const clearNotifications = () => setNotifications([]);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="sidebar-toggle-btn" onClick={onMobileMenuToggle} title="Toggle navigation menu">
          <Menu size={20} />
        </button>

        <div className="role-badge">Enterprise Simulation</div>

        {isInvited ? (
          <div 
            className="demo-badge" 
            style={{ 
              background: 'rgba(16, 185, 129, 0.15)', 
              color: '#10b981', 
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span className="demo-dot" style={{ background: '#10b981' }} />
            OFFICIAL ASSESSMENT — {companyName}
          </div>
        ) : (
          <div className="demo-badge">
            <span className="demo-dot" />
            DEMO WORKSPACE
          </div>
        )}
      </div>

      <div className="topbar-center">
        <div 
          className={`pressure-meter ${pressure.toLowerCase()}`}
          onClick={onPressureToggle}
          title="Click to change pressure mode"
        >
          <span className="pressure-dot" />
          <span>Pressure: {pressure}</span>
        </div>
      </div>

      <div className="topbar-right">
        <div className="autosave-pill" title="Auto-saves automatically">● Auto Saved</div>
        
        <button 
          className="theme-toggle-btn"
          onClick={onThemeToggle}
          title="Toggle Light / Dark theme"
        >
          {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
          <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>

        <div style={{ position: 'relative' }}>
          <button 
            className="noti-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <Bell size={18} />
            {notifications.length > 0 && <span className="noti-dot" />}
          </button>

          {showNotifications && (
            <div className="notifications-dropdown">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <strong style={{ fontSize: '14px', color: 'var(--text)' }}>Notifications</strong>
                <button 
                  onClick={clearNotifications}
                  style={{ fontSize: '11px', fontWeight: 700, background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}
                >
                  Clear All
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <p style={{ fontSize: '12px', color: 'var(--subtext)', textAlign: 'center', padding: '12px 0' }}>No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} style={{ padding: '8px', borderRadius: '8px', background: 'var(--card-sub)', border: '1px solid var(--border)', fontSize: '12px', lineHeight: 1.4 }}>
                      <strong style={{ color: 'var(--text)' }}>{n.title}</strong>
                      <p style={{ color: 'var(--subtext)', margin: '2px 0 0' }}>{n.desc}</p>
                      <small style={{ color: 'var(--muted)', fontSize: '10px' }}>{n.time}</small>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
