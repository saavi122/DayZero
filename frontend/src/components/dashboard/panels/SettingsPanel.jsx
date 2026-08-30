import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCog, Zap, ShieldAlert } from 'lucide-react';

const SettingsPanel = ({ user, onUpdateUser }) => {
  const [role, setRole] = useState(user?.role || 'Frontend');
  const [level, setLevel] = useState('Intermediate');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [speed, setSpeed] = useState('1');

  const handleSaveRole = (newRole) => {
    setRole(newRole);
    if (onUpdateUser) {
      onUpdateUser({ ...user, role: newRole });
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset local storage preferences?")) {
      localStorage.clear();
      window.location.reload();
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
          <h3>System Preferences</h3>
          <span className="section-sub">Configure your interactive simulator profile and preferences</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {/* Simulator Identity */}
        <div className="dashboard-card-box">
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserCog size={18} color="var(--accent)" /> Simulator Identity
          </h4>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--subtext)', display: 'block', marginBottom: '6px' }}>
              Active Candidate Role
            </label>
            <select
              value={role}
              onChange={(e) => handleSaveRole(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'var(--card-sub)', border: '1px solid var(--border)', color: 'var(--text)', fontWeight: 600, outline: 'none' }}
            >
              <option value="Frontend">Frontend Developer</option>
              <option value="Backend">Backend Engineer</option>
              <option value="PM">Product Manager</option>
              <option value="QA">QA Engineer</option>
              <option value="Data">Data Analyst</option>
              <option value="Design">Product Designer</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--subtext)', display: 'block', marginBottom: '6px' }}>
              Experience Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'var(--card-sub)', border: '1px solid var(--border)', color: 'var(--text)', fontWeight: 600, outline: 'none' }}
            >
              <option value="Beginner">Beginner (Fast Track)</option>
              <option value="Intermediate">Intermediate (Standard)</option>
              <option value="Advanced">Advanced (Hackathon-Winning)</option>
            </select>
          </div>
        </div>

        {/* Haptics & Speed */}
        <div className="dashboard-card-box">
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} color="var(--accent)" /> Haptics & Speed
          </h4>

          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '13px', color: 'var(--text)', display: 'block' }}>Audio Sound Alerts</strong>
              <span style={{ fontSize: '11px', color: 'var(--subtext)' }}>Web Audio sound alerts on teammate chats</span>
            </div>
            <input
              type="checkbox"
              checked={audioEnabled}
              onChange={(e) => setAudioEnabled(e.target.checked)}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--subtext)', display: 'block', marginBottom: '6px' }}>
              Sprint Simulation Speed
            </label>
            <select
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'var(--card-sub)', border: '1px solid var(--border)', color: 'var(--text)', fontWeight: 600, outline: 'none' }}
            >
              <option value="1">1x Speed (Standard)</option>
              <option value="2">2x Speed (Accelerated)</option>
              <option value="5">5x Speed (Fast Pace)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div style={{ padding: '20px', borderRadius: '14px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
        <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={18} /> Danger Zone
        </h4>
        <p style={{ fontSize: '12px', color: 'var(--subtext)', marginBottom: '14px' }}>
          Wipe all local storage states, saved runs, and theme preferences to reload standard configurations.
        </p>
        <button onClick={handleReset} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
          Reset Workspace Storage
        </button>
      </div>
    </motion.div>
  );
};

export default SettingsPanel;
