import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Clock, ArrowRight, Lock, Globe } from 'lucide-react';

const ProjectsPanel = ({ onSelectProject, onNavigate }) => {
  const [filterRole, setFilterRole] = useState('All');

  const userStr = localStorage.getItem('user');
  let user = null;
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch {}

  const isInvited = user && (user.isInvited || (user.company && user.company !== 'Demo Workspace'));

  const openSourceProjects = [
    {
      id: 'open-source-fraud-detector',
      company: 'Open Source',
      logo: 'OS',
      title: 'Build a Real-time Fraud Detection Engine',
      description: 'Join an open source community team to build a high-throughput transaction anomaly monitor.',
      roles: ['Backend Engineer', 'Data Analyst'],
      team: '3/4 Students',
      suggested: true,
      isUnlocked: true
    },
    {
      id: 'open-source-search-quality',
      company: 'Open Source',
      logo: 'OS',
      title: 'Search Ranking & Quality Recovery Sprint',
      description: 'A 5-day open source sprint balancing ranking quality, backend constraints, and performance tradeoffs.',
      roles: ['Backend Engineer', 'Data Analyst'],
      team: '5 Days',
      sprint: true,
      isUnlocked: false
    },
    {
      id: 'open-source-recommendation',
      company: 'Open Source',
      logo: 'OS',
      title: 'Optimize Recommendation Engine Algorithms',
      description: 'Analyze user engagement patterns and submit open source algorithm enhancements.',
      roles: ['Backend Engineer', 'Data Analyst'],
      team: '1/3 Students',
      isUnlocked: false
    },
    {
      id: 'open-source-rate-limiter',
      company: 'Open Source',
      logo: 'OS',
      title: 'Distributed API Rate Limiter Microservice',
      description: 'Build a scalable token bucket rate limiter handling 10k requests per second.',
      roles: ['Backend Engineer', 'QA Engineer'],
      team: '2/4 Students',
      isUnlocked: false
    }
  ];

  const handleTaskAction = (proj) => {
    const unlocked = proj.isUnlocked;
    if (unlocked) {
      localStorage.setItem('dayzero_task_id', proj.id);
      const targetUrl = `/simulation?roomId=${proj.id}&mode=candidate`;
      if (onNavigate) {
        onNavigate(targetUrl);
      } else {
        window.location.href = targetUrl;
      }
    } else {
      if (onNavigate) {
        onNavigate('/?signup=true');
      } else {
        window.location.href = '/?signup=true';
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
    >
      <div className="section-title-row">
        <div>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={18} color="var(--accent)" /> Open Source Collaborative Projects
          </h3>
          <span className="section-sub">
            Community-driven open source engineering sprints for skill development and practice
          </span>
        </div>

        <div className="filter-pills">
          {['All', 'Frontend', 'Backend', 'Data', 'QA'].map((role) => (
            <button
              key={role}
              className={`filter-pill ${filterRole === role ? 'active' : ''}`}
              onClick={() => setFilterRole(role)}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="project-grid">
        {openSourceProjects.map((proj) => {
          const unlocked = proj.isUnlocked;

          return (
            <motion.div
              key={proj.id}
              className="project-card"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              style={{ opacity: unlocked ? 1 : 0.85 }}
            >
              <div className="proj-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--highlight-gradient)', color: '#fff', fontWeight: 800, display: 'grid', placeItems: 'center', fontSize: '10px' }}>
                    {proj.logo}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)' }}>{proj.company}</span>
                </div>

                {unlocked ? (
                  proj.suggested && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Sparkles size={12} /> AI Suggested
                    </span>
                  )
                ) : (
                  <span style={{ fontSize: 10.5, fontWeight: 800, padding: '3px 8px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Lock size={11} /> Locked
                  </span>
                )}
              </div>

              <h4 className="proj-title">{proj.title}</h4>
              <p className="proj-desc">{proj.description}</p>

              <div className="proj-meta">
                <div className="role-tags">
                  {proj.roles.map((r, i) => (
                    <span key={i} className="role-tag">{r}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--subtext)', fontSize: 12 }}>
                  {proj.sprint ? <Clock size={14} /> : <Users size={14} />} {proj.team}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="primary-btn full-width" 
                  onClick={() => handleTaskAction(proj)}
                  style={{
                    background: unlocked ? 'var(--highlight-gradient)' : 'var(--card-sub)',
                    color: unlocked ? '#ffffff' : 'var(--text)',
                    border: unlocked ? 'none' : '1px solid var(--border)'
                  }}
                >
                  {unlocked ? (
                    <>Start Practice Sprint <ArrowRight size={14} /></>
                  ) : (
                    <><Lock size={14} color="#ef4444" /> Sign up to Unlock</>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProjectsPanel;
