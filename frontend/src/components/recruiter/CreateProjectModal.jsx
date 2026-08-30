import React, { useState } from 'react';
import { X, Plus, Clock } from 'lucide-react';

const CreateProjectModal = ({ isOpen, onClose, onAddProject, showToast }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [deadline, setDeadline] = useState('29/06/2026');
  const [timeDuration, setTimeDuration] = useState('45 mins');
  const [status, setStatus] = useState('Active');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const newProject = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim() || 'Custom technical assessment project.',
      techStack: techStack.split(',').map(s => s.trim()).filter(Boolean),
      status: status,
      deadline: deadline,
      timeDuration: timeDuration || '45 mins',
      time: timeDuration || '45 mins',
      created: new Date().toISOString().slice(0, 10),
      candidatesCount: 0
    };

    onAddProject(newProject);
    if (showToast) showToast(`Project "${title}" (${timeDuration}) created successfully!`, 'success');

    // Reset & close
    setTitle('');
    setDescription('');
    setTechStack('');
    onClose();
  };

  return (
    <div 
      className="modal-overlay active"
      onClick={(e) => e.target.classList.contains('modal-overlay') && onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(11, 12, 22, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div 
        style={{
          width: '540px',
          maxWidth: '100%',
          background: 'var(--rec-surface, #ffffff)',
          color: 'var(--rec-text, #312A44)',
          borderRadius: '20px',
          border: '1px solid var(--rec-border, rgba(49, 42, 68, 0.15))',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div 
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--rec-border, rgba(49, 42, 68, 0.1))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--rec-text, #312A44)', margin: 0 }}>
            Create Technical Project
          </h3>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--rec-muted, #847D94)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--rec-text)' }}>
              Project Title *
            </label>
            <input 
              type="text" 
              placeholder="e.g. AI Resume Screener"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '9px',
                border: '1px solid var(--rec-border, rgba(49, 42, 68, 0.2))',
                background: 'var(--rec-surface2, #FCFBFE)',
                color: 'inherit',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--rec-text)' }}>
              Description *
            </label>
            <textarea 
              rows={3}
              placeholder="Provide a brief description of the technical assessment..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '9px',
                border: '1px solid var(--rec-border, rgba(49, 42, 68, 0.2))',
                background: 'var(--rec-surface2, #FCFBFE)',
                color: 'inherit',
                fontSize: '13px',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--rec-text)' }}>
              Tech Stack * (Comma separated)
            </label>
            <input 
              type="text" 
              placeholder="e.g. React, Node.js, Tailwind"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '9px',
                border: '1px solid var(--rec-border, rgba(49, 42, 68, 0.2))',
                background: 'var(--rec-surface2, #FCFBFE)',
                color: 'inherit',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          {/* Time Duration & Deadline & Status Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--rec-text)' }}>
                <Clock size={13} color="#88709e" /> Assessment Fixed Timespan *
              </label>
              <select
                value={timeDuration}
                onChange={(e) => setTimeDuration(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '9px',
                  border: '1px solid var(--rec-border, rgba(49, 42, 68, 0.2))',
                  background: 'var(--rec-surface2, #FCFBFE)',
                  color: 'inherit',
                  fontSize: '13px',
                  outline: 'none',
                  fontWeight: 600
                }}
              >
                <option value="30 mins">30 Minutes Timebox</option>
                <option value="45 mins">45 Minutes Timebox</option>
                <option value="60 mins">60 Minutes (1 Hour)</option>
                <option value="90 mins">90 Minutes (1.5 Hours)</option>
                <option value="120 mins">120 Minutes (2 Hours)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--rec-text)' }}>
                Deadline *
              </label>
              <input 
                type="text" 
                placeholder="29/06/2026"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '9px',
                  border: '1px solid var(--rec-border, rgba(49, 42, 68, 0.2))',
                  background: 'var(--rec-surface2, #FCFBFE)',
                  color: 'inherit',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px', paddingTop: '16px', borderTop: '1px solid var(--rec-border)' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                borderRadius: '9px',
                border: '1px solid var(--rec-border)',
                background: 'transparent',
                color: 'var(--rec-text)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={{
                padding: '10px 24px',
                borderRadius: '9px',
                border: 'none',
                background: '#312A44',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Plus size={14} /> Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
