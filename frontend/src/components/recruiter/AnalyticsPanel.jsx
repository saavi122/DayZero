import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

const AnalyticsPanel = () => {
  return (
    <div className="candidate-table-container">
      <div className="table-filter-row">
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--rec-text)' }}>Pipeline Analytics</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '20px', background: 'var(--rec-surface2)', borderRadius: '12px', border: '1px solid var(--rec-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--rec-text)', fontWeight: 700, marginBottom: '12px' }}>
            <TrendingUp size={18} color="var(--rec-accent)" /> Hiring Velocity
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--rec-text)' }}>4.2 Days</div>
          <p style={{ fontSize: '12px', color: 'var(--rec-subtext)', marginTop: '4px' }}>Average time from simulation launch to offer stage</p>
        </div>

        <div style={{ padding: '20px', background: 'var(--rec-surface2)', borderRadius: '12px', border: '1px solid var(--rec-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--rec-text)', fontWeight: 700, marginBottom: '12px' }}>
            <BarChart3 size={18} color="var(--rec-accent)" /> Skill Match Accuracy
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#10b981' }}>94.8%</div>
          <p style={{ fontSize: '12px', color: 'var(--rec-subtext)', marginTop: '4px' }}>Correlation with on-job performance reviews</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
