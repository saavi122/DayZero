import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const SchedulePanel = () => {
  const events = [
    {
      time: '09:00 AM',
      title: 'PM Strategy Sync',
      priority: 'High',
      owner: 'You (Available)',
      desc: 'Established the primary product vision and growth metrics.',
      progress: '100%',
      completed: true
    },
    {
      time: '10:30 AM',
      title: 'Design Review',
      priority: 'Medium',
      owner: 'Sarah (Busy)',
      desc: 'Evaluating wireframes for the new feature dashboard.',
      progress: '85%',
      completed: false
    },
    {
      time: 'Now',
      title: 'Execution Block',
      priority: 'High',
      owner: 'You (Available)',
      desc: 'Awaiting final metrics definition to proceed with coding.',
      progress: 'In Progress',
      active: true
    },
    {
      time: '02:00 PM',
      title: 'Engineering Huddle',
      priority: 'Low',
      owner: 'Mike (Offline)',
      desc: 'Technical feasibility check for the new API endpoints.',
      progress: '0%',
      future: true
    }
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
          <h3>Simulation Schedule</h3>
          <span className="section-sub">Live events based on AI teammate actions</span>
        </div>
      </div>

      <div className="dashboard-card-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h4>Day 2 of Simulation</h4>
          <span className="role-tag"><CalendarIcon size={14} /> April 2026</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {events.map((ev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr',
                gap: '16px',
                padding: '16px',
                borderRadius: '12px',
                background: ev.active ? 'rgba(124, 92, 255, 0.08)' : 'var(--card-sub)',
                border: ev.active ? '1px solid var(--accent)' : '1px solid var(--border)'
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--subtext)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} /> {ev.time}
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h5 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>{ev.title}</h5>
                  <span className="role-tag" style={{ fontSize: '10px' }}>{ev.priority}</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--subtext)', marginBottom: '8px' }}>{ev.desc}</p>
                <div style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {ev.completed ? <CheckCircle2 size={14} color="var(--success)" /> : <AlertCircle size={14} color="var(--accent)" />}
                  {ev.owner} • {ev.progress}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SchedulePanel;
