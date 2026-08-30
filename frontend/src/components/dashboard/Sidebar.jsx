import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Calendar, 
  Folder, 
  Brain, 
  Award, 
  Trophy, 
  CheckSquare, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  ChevronLeft
} from 'lucide-react';
import UserProfileCard from './UserProfileCard';

const navItems = [
  { id: 'panel-workspace', label: 'Workspace', icon: LayoutDashboard },
  { id: 'panel-projects', label: 'Projects', icon: Briefcase },
  { id: 'panel-calendar', label: 'Schedule', icon: Calendar },
  { id: 'panel-files', label: 'Files', icon: Folder },
  { id: 'panel-insights', label: 'AI Insights', icon: Brain },
  { id: 'panel-skillrecord', label: 'SkillRecord', icon: Award },
  { id: 'panel-leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'panel-achievements', label: 'Achievements', icon: CheckSquare },
  { id: 'panel-messages', label: 'Messages', icon: MessageSquare },
  { id: 'panel-settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ 
  activePanel, 
  setActivePanel, 
  isCollapsed, 
  setIsCollapsed, 
  isMobileShow, 
  setIsMobileShow,
  user,
  onLogout 
}) => {
  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileShow ? 'show' : ''}`}>
      {/* Top Logo */}
      <div>
        <div className="sidebar-top">
          <div className="logo-wrap">
            <div className="logo-glow" />
            <div className="logo-icon">DZ</div>
            {!isCollapsed && (
              <div>
                <div className="logo-brand-title">DayZero</div>
                <div className="logo-brand-sub">Simulation OS</div>
              </div>
            )}
          </div>
          <button 
            className="collapse-btn" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="sidebar-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`menu-item ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActivePanel(item.id);
                  if (window.innerWidth <= 960) {
                    setIsMobileShow(false);
                  }
                }}
              >
                <Icon size={18} />
                {!isCollapsed && <span>{item.label}</span>}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Logout */}
      <div className="sidebar-bottom-section">
        <a
          href="#logout"
          className="menu-item"
          onClick={(e) => {
            e.preventDefault();
            onLogout();
          }}
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </a>

        {!isCollapsed && (
          <UserProfileCard 
            user={user} 
            onClick={() => setActivePanel('panel-settings')} 
          />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
