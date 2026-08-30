import React from 'react';
import { Plus, Edit2, Trash2, Play, ExternalLink } from 'lucide-react';

const ChallengeBuilder = ({ 
  projects = [], 
  onOpenAddProject, 
  onDeleteProject, 
  showToast, 
  onNavigate,
  onOpenSimulationsControl 
}) => {
  const handleCandidateView = (proj) => {
    const taskDetails = {
      id: proj.id,
      company: 'Google',
      title: proj.title,
      label: proj.title,
      role: 'Backend Engineer',
      difficulty: 'Medium',
      description: proj.description,
      skills: proj.techStack || ['React', 'Python', 'OpenAI', 'MongoDB']
    };

    localStorage.setItem('dayzero_task_id', proj.id);
    localStorage.setItem('dayzero_selected_task_details', JSON.stringify(taskDetails));

    if (showToast) {
      showToast(`Opening Candidate View for ${proj.title}...`, 'info');
    }

    setTimeout(() => {
      if (onNavigate) {
        onNavigate('/dashboard');
      } else {
        window.location.href = '/dashboard';
      }
    }, 300);
  };

  const handleOpenSimulation = (proj) => {
    if (showToast) {
      showToast(`Opening Simulation Control Panel for ${proj.title}...`, 'success');
    }

    if (onOpenSimulationsControl) {
      onOpenSimulationsControl(proj);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--rec-text)', margin: 0 }}>Company Projects</h2>
          <p style={{ fontSize: '13px', color: 'var(--rec-muted)', marginTop: '4px', margin: 0 }}>
            Manage and monitor technical assessment projects
          </p>
        </div>

        <button
          onClick={onOpenAddProject}
          style={{
            padding: '10px 18px',
            borderRadius: '10px',
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
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {projects.map((proj) => (
          <div
            key={proj.id}
            style={{
              background: 'var(--rec-surface, #ffffff)',
              border: '1px solid var(--rec-border, rgba(49, 42, 68, 0.15))',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
              position: 'relative'
            }}
          >
            {/* Title & Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--rec-text)', margin: 0 }}>
                  {proj.title}
                </h3>
                <span 
                  style={{
                    display: 'inline-block',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    marginTop: '6px',
                    background: proj.status === 'Active' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(136, 112, 158, 0.12)',
                    color: proj.status === 'Active' ? '#10b981' : '#88709e'
                  }}
                >
                  {proj.status || 'Active'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => showToast && showToast(`Editing ${proj.title}...`, 'info')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--rec-muted)', cursor: 'pointer', padding: '4px' }}
                  title="Edit Project"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => onDeleteProject && onDeleteProject(proj.id)}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                  title="Delete Project"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: '12.5px', color: 'var(--rec-subtext)', margin: 0, lineHeight: 1.5 }}>
              {proj.description}
            </p>

            {/* Tech Stack Pills */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {(proj.techStack || ['React', 'Python', 'OpenAI']).map((tech, idx) => (
                <span 
                  key={idx} 
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: 'var(--rec-surface2, #FCFBFE)',
                    border: '1px solid var(--rec-border)',
                    color: 'var(--rec-subtext)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Meta dates */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--rec-muted)', paddingTop: '10px', borderTop: '1px solid var(--rec-border)' }}>
              <span>Deadline: {proj.deadline || '2026-06-30'}</span>
              <span>Created: {proj.created || '2026-05-15'}</span>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button
                onClick={() => handleCandidateView(proj)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--rec-border)',
                  background: 'var(--rec-surface2)',
                  color: 'var(--rec-text)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <ExternalLink size={12} /> Candidate View
              </button>

              <button
                onClick={() => handleOpenSimulation(proj)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#312A44',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Play size={12} /> Open Simulation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeBuilder;
