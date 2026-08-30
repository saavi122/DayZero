import React from 'react';
import { motion } from 'framer-motion';

const RecruiterStats = ({ candidateCount, avgScore, activeSims }) => {
  const stats = [
    { title: 'Total Applicants', value: candidateCount || 24, desc: 'Verified candidate profiles' },
    { title: 'Avg Match Score', value: `${avgScore || 86}%`, desc: 'Across technical & soft skills' },
    { title: 'Active Simulations', value: activeSims || 8, desc: 'Live candidate workspace runs' },
    { title: 'Shortlisted', value: '6', desc: 'Ready for final interview' }
  ];

  return (
    <div className="recruiter-stats-grid">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          className="recruiter-stat-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <div className="recruiter-stat-title">{stat.title}</div>
          <div className="recruiter-stat-value">{stat.value}</div>
          <div className="recruiter-stat-desc">{stat.desc}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default RecruiterStats;
