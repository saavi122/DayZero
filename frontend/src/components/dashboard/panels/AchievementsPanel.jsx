import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldAlert, CheckCircle, Timer, ListTodo } from 'lucide-react';

const AchievementsPanel = () => {
  const badges = [
    { title: 'Fast Thinker', desc: 'Responded to crisis events under 30 seconds', icon: Timer, color: '#f59e0b' },
    { title: 'Great Prioritizer', desc: 'Consistently selected high-impact tasks first', icon: ListTodo, color: '#3b82f6' },
    { title: 'Crisis Solver', desc: 'Resolved 3+ live engineering outages', icon: ShieldAlert, color: '#ef4444' },
    { title: 'Execution Excellence', desc: 'Maintained 90%+ code quality rating', icon: CheckCircle, color: '#10b981' }
  ];

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
          <h3>Unlocked Achievements</h3>
          <span className="section-sub">Badges earned during simulation sprints</span>
        </div>
      </div>

      <div className="project-grid">
        {badges.map((b, idx) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={idx}
              className="dashboard-card-box"
              whileHover={{ scale: 1.02 }}
              style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--card-sub)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center' }}>
                <Icon size={24} color={b.color} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>{b.title}</h4>
                <p style={{ fontSize: '12px', color: 'var(--subtext)', marginTop: '2px' }}>{b.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AchievementsPanel;
