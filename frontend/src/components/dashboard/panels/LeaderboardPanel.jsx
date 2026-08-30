import React from 'react';
import { motion } from 'framer-motion';
import { Medal } from 'lucide-react';

const LeaderboardPanel = ({ user }) => {
  const leaderboardData = [
    { rank: '#1', name: 'Alex M.', skill: 'Strategy', score: '99.9%', top: true },
    { rank: '#2', name: 'Sarah K.', skill: 'Leadership', score: '99.5%', top: true },
    { rank: '#3', name: 'Rohan P.', skill: 'Execution', score: '98.8%', top: true },
    { rank: '#32', name: `${user?.name || 'You'} (You)`, skill: 'Adaptability', score: '92.0%', highlight: true },
    { rank: '#33', name: 'Jessica T.', skill: 'QA Testing', score: '91.8%' }
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
          <h3>Global Leaderboard</h3>
          <span className="section-sub">Top 100 Candidates worldwide</span>
        </div>
      </div>

      <div className="dashboard-card-box">
        <div className="leaderboard-table">
          <div className="lb-row header">
            <span>Rank</span>
            <span>Candidate</span>
            <span>Top Skill</span>
            <span>Percentile</span>
          </div>

          {leaderboardData.map((row, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`lb-row ${row.highlight ? 'highlight' : ''}`}
            >
              <span style={{ fontWeight: 800, color: row.top ? 'var(--highlight-gold)' : 'var(--text)' }}>
                {row.rank}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                {row.top && <Medal size={16} color="var(--highlight-gold)" />}
                {row.name}
              </span>
              <span>{row.skill}</span>
              <span style={{ fontWeight: 800, color: 'var(--accent)' }}>{row.score}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LeaderboardPanel;
