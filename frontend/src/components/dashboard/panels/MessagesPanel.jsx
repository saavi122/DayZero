import React from 'react';
import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';

const MessagesPanel = () => {
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
          <h3>Messages</h3>
          <span className="section-sub">Direct messages from teammates and AI evaluators</span>
        </div>
      </div>

      <div className="dashboard-card-box" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <Inbox size={36} color="var(--muted)" style={{ margin: '0 auto 12px' }} />
        <h4 style={{ fontSize: '15px', color: 'var(--text)', marginBottom: '4px' }}>Inbox is empty</h4>
        <p style={{ fontSize: '13px', color: 'var(--subtext)' }}>No new direct messages. Sprint notifications will show in the top right bell menu.</p>
      </div>
    </motion.div>
  );
};

export default MessagesPanel;
