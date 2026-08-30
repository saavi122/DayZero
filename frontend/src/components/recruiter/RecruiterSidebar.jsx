import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  BarChart3, 
  Star, 
  CalendarDays, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut,
  ChevronLeft,
  Menu
} from 'lucide-react';

const RecruiterSidebar = ({ 
  activeNav, 
  setActiveNav, 
  isCollapsed, 
  setIsCollapsed, 
  recruiter,
  onLogout,
  candidatesCount = 0,
  shortlistCount = 0,
  interviewCount = 0
}) => {
  const navSections = [
    {
      title: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'candidates', label: 'Candidates', icon: Users, badge: String(candidatesCount), badgeColor: 'blue' },
        { id: 'projects', label: 'Projects', icon: Target },
      ]
    },
    {
      title: 'Evaluation',
      items: [
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'shortlist', label: 'Shortlist', icon: Star, badge: String(shortlistCount), badgeColor: 'purple' },
        { id: 'interviews', label: 'Interviews', icon: CalendarDays, badge: interviewCount > 0 ? String(interviewCount) : null, badgeColor: 'blue' }
      ]
    },
    {
      title: 'Tools',
      items: [
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: '2', badgeColor: 'red' },
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];
  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Top Header */}
      <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="logo-mark" style={{ width: '36px', height: '36px', background: '#312A44', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '14px' }}>
            DZ
          </div>
          {!isCollapsed && (
            <div className="logo-text">
              <h2 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--rec-text, #312A44)', margin: 0 }}>DayZero</h2>
              <p style={{ fontSize: '11px', color: 'var(--rec-muted, #847D94)', margin: 0 }}>Recruiter OS</p>
            </div>
          )}
        </div>

        <button 
          className="collapse-btn" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          style={{ background: 'transparent', border: '1px solid var(--rec-border)', borderRadius: '8px', padding: '6px', cursor: 'pointer', color: 'var(--rec-text)' }}
        >
          {isCollapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Sidebar Nav Sections */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 10px' }}>
        {navSections.map((section, idx) => (
          <div key={idx} className="sidebar-section" style={{ marginBottom: '16px' }}>
            {!isCollapsed && (
              <div 
                className="sidebar-label" 
                style={{ fontSize: '10px', fontWeight: 800, color: 'var(--rec-muted, #847D94)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px', marginBottom: '6px' }}
              >
                {section.title}
              </div>
            )}

            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav(item.id);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '9px 12px',
                    borderRadius: '9px',
                    fontSize: '13.5px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#88709E' : 'var(--rec-subtext, #554D66)',
                    background: isActive ? 'rgba(136, 112, 158, 0.12)' : 'transparent',
                    textDecoration: 'none',
                    marginBottom: '2px',
                    transition: 'all 0.15s ease',
                    justifyContent: isCollapsed ? 'center' : 'flex-start'
                  }}
                >
                  <Icon size={18} />
                  {!isCollapsed && <span>{item.label}</span>}
                  
                  {!isCollapsed && item.badge && (
                    <span 
                      style={{
                        marginLeft: 'auto',
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: '10px',
                        background: item.badgeColor === 'blue' ? 'rgba(77, 163, 255, 0.15)' : 'rgba(136, 112, 158, 0.15)',
                        color: item.badgeColor === 'blue' ? '#3b82f6' : '#88709e'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        ))}
      </div>

      {/* Recruiter Profile Footer */}
      <div 
        className="sidebar-footer"
        style={{
          padding: '16px',
          borderTop: '1px solid var(--rec-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div 
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4A3B66 0%, #312A44 100%)',
            color: '#fff',
            fontWeight: 800,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          {recruiter?.recruiterInitials || "AM"}
        </div>

        {!isCollapsed && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rec-text, #312A44)', truncate: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {recruiter?.recruiterName || "Alex Morgan"}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--rec-muted, #847D94)', truncate: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {recruiter?.companyName ? `${recruiter.companyName} • ${recruiter.role || 'Recruiter'}` : "Google • Senior Recruiter"}
            </div>
          </div>
        )}

        {!isCollapsed && (
          <button
            onClick={onLogout}
            title="Log out"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ef4444',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );
};

export default RecruiterSidebar;
