import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, FileSpreadsheet, Braces, Database, FolderOpen } from 'lucide-react';

const filesData = {
  sprint_spec: {
    name: 'sprint_spec.md',
    type: 'MARKDOWN',
    lines: '45 lines',
    icon: FileText,
    content: `# Product Sprint: Stripe & Spotify Integration

## Objective
Enable seamless billing subscriptions and automated payouts for verified creator playlists.

## Requirements
1. Validate transaction tokens in backend.
2. Form-level error reporting in UI.
3. Decisive rollback gates on DB locks.`
  },
  user_feedback: {
    name: 'user_feedback.csv',
    type: 'CSV',
    lines: '120 lines',
    icon: FileSpreadsheet,
    content: `user_id,rating,comment,timestamp
1024,5,"Checkout was smooth!",2026-04-12
1025,2,"Failed to authorize card",2026-04-12
1026,4,"Great experience overall",2026-04-13`
  },
  api_endpoints: {
    name: 'api_endpoints.yaml',
    type: 'YAML',
    lines: '68 lines',
    icon: Braces,
    content: `version: "3.0"
paths:
  /api/v1/checkout:
    post:
      summary: Initiate checkout session
      responses:
        '200':
          description: OK`
  },
  db_schema: {
    name: 'db_schema.sql',
    type: 'SQL',
    lines: '89 lines',
    icon: Database,
    content: `CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`
  }
};

const FilesPanel = () => {
  const [selectedFileKey, setSelectedFileKey] = useState('sprint_spec');
  const activeFile = filesData[selectedFileKey];

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
          <h3>Simulation Artifacts</h3>
          <span className="section-sub">Inspect shared specification documents, schemas, and configurations</span>
        </div>
      </div>

      <div className="dashboard-card-box">
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', minHeight: '400px' }}>
          {/* File Selector Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--muted)', letterSpacing: '0.05em' }}>
              FILES REPOSITORY
            </div>
            {Object.keys(filesData).map((key) => {
              const file = filesData[key];
              const Icon = file.icon;
              const isSelected = selectedFileKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedFileKey(key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                    background: isSelected ? 'var(--highlight-gradient)' : 'var(--card-sub)',
                    color: isSelected ? '#ffffff' : 'var(--text)',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={16} />
                  <span>{file.name}</span>
                </button>
              );
            })}
          </div>

          {/* File Viewer */}
          <div style={{ background: 'var(--card-sub)', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FolderOpen size={16} color="var(--accent)" />
                <strong style={{ fontSize: '14px', color: 'var(--text)' }}>{activeFile.name}</strong>
                <span style={{ fontSize: '11px', color: 'var(--subtext)' }}>{activeFile.lines}</span>
              </div>
              <span className="role-tag">{activeFile.type}</span>
            </div>

            <pre style={{ flex: 1, padding: '20px', fontFamily: 'monospace', fontSize: '13px', color: 'var(--text)', overflowY: 'auto', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
              {activeFile.content}
            </pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilesPanel;
