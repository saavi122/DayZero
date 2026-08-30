import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target, Award } from 'lucide-react';

const InsightsPanel = () => {
  const skills = [
    { name: 'Leadership', score: 79 },
    { name: 'Problem Solving', score: 88 },
    { name: 'Communication', score: 84 },
    { name: 'Adaptability', score: 91 },
    { name: 'Execution Speed', score: 86 }
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
          <h3>AI Performance Insights</h3>
          <span className="section-sub">Real-time skill evaluation and behavioral analytics</span>
        </div>
      </div>

      <div className="dashboard-card-box">
        <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)' }}>
          <Brain size={18} color="var(--accent)" /> Live Skill Scores
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {skills.map((s, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>
                <span>{s.name}</span>
                <span>{s.score}/100</span>
              </div>
              <div className="skill-bar-wrap">
                <motion.div 
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${s.score}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="dashboard-card-box" style={{ textAlign: 'center' }}>
          <Zap size={24} color="var(--accent)" style={{ margin: '0 auto 8px' }} />
          <h4 style={{ fontSize: '14px', color: 'var(--text)' }}>Thinking Time</h4>
          <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)' }}>18m</span>
        </div>

        <div className="dashboard-card-box" style={{ textAlign: 'center' }}>
          <Target size={24} color="var(--accent)" style={{ margin: '0 auto 8px' }} />
          <h4 style={{ fontSize: '14px', color: 'var(--text)' }}>Confidence Score</h4>
          <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)' }}>82%</span>
        </div>

        <div className="dashboard-card-box" style={{ textAlign: 'center' }}>
          <Award size={24} color="var(--accent)" style={{ margin: '0 auto 8px' }} />
          <h4 style={{ fontSize: '14px', color: 'var(--text)' }}>Percentile Rank</h4>
          <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)' }}>Top 7%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default InsightsPanel;
