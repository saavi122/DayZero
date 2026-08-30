import React from 'react';
import { Search, Moon, Sun, ArrowLeft, UserPlus, Download, Menu } from 'lucide-react';

const RecruiterHeader = ({ 
  theme, 
  onThemeToggle, 
  searchQuery, 
  setSearchQuery, 
  onNavigate,
  onOpenInviteModal,
  showToast,
  onSidebarToggle
}) => {
  return (
    <header className="recruiter-header">
      <div className="recruiter-header-left">
        <button 
          className="sidebar-toggle-btn"
          onClick={onSidebarToggle}
          title="Toggle Navigation Menu"
          style={{ background: 'var(--rec-surface2)', border: '1px solid var(--rec-border)', borderRadius: '9px', padding: '8px 10px', color: 'var(--rec-text)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
        >
          <Menu size={18} />
        </button>

        <button 
          onClick={() => onNavigate && onNavigate('/')}
          style={{ background: 'transparent', border: 'none', color: 'var(--rec-text)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '13px' }}
        >
          <ArrowLeft size={16} /> Home
        </button>

        <div className="recruiter-search-bar">
          <Search size={16} color="var(--rec-muted)" />
          <input
            className="recruiter-search-input"
            type="text"
            placeholder="Search candidates by name, skill, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => showToast && showToast('Exporting candidate dataset (CSV)...', 'info')}
          style={{
            padding: '8px 14px',
            borderRadius: '9px',
            border: '1px solid var(--rec-border)',
            background: 'var(--rec-surface2)',
            color: 'var(--rec-text)',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Download size={14} /> Export CSV
        </button>

        <button
          onClick={onOpenInviteModal}
          style={{
            padding: '8px 16px',
            borderRadius: '9px',
            border: 'none',
            background: '#312A44',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <UserPlus size={14} /> + Invite Candidate
        </button>

        <button
          className="theme-toggle-btn"
          onClick={onThemeToggle}
          title="Toggle Light / Dark theme"
          style={{
            padding: '8px 12px',
            borderRadius: '9px',
            border: '1px solid var(--rec-border)',
            background: 'var(--rec-surface2)',
            color: 'var(--rec-text)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
          <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>
      </div>
    </header>
  );
};

export default RecruiterHeader;
