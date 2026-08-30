import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

const InviteCandidateModal = ({ isOpen, onClose, projects = [], onAddCandidate, showToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [simType, setSimType] = useState('Individual');
  const [skills, setSkills] = useState('');
  const [role, setRole] = useState('Frontend Engineer');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [experience, setExperience] = useState('Intermediate');
  const [message, setMessage] = useState('Hi, we are excited to invite you to our live engineering assessment sprint room. Please enter the sprint room to tackle real tasks.');
  const [assignTeam, setAssignTeam] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const selectedProj = (projects || []).find(p => String(p.id) === String(selectedProjectId)) || {
      id: selectedProjectId || 'ai-resume-screener',
      title: 'AI Resume Screener',
      description: 'Custom engineering assessment project assigned by your recruiter.',
      techStack: ['React', 'Python', 'OpenAI']
    };

    const newCandidate = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      college: college.trim() || 'Tech Institute',
      role: role,
      score: Math.floor(Math.random() * 15) + 82,
      progress: '0%',
      topSkill: skills.split(',')[0]?.trim() || 'Problem Solving',
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      status: 'Invited',
      lastActive: 'Just invited',
      simType: simType,
      experience: experience,
      projectId: selectedProj.id,
      projectTitle: selectedProj.title,
      projectDescription: selectedProj.description,
      techStack: selectedProj.techStack,
      timeDuration: selectedProj.timeDuration || selectedProj.time || '45 mins',
      time: selectedProj.timeDuration || selectedProj.time || '45 mins',
      companyName: 'LinkedIn'
    };

    // Save to dayzero_invited_candidates in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('dayzero_invited_candidates')) || [];
      const updated = [newCandidate, ...existing.filter(c => c.email !== newCandidate.email)];
      localStorage.setItem('dayzero_invited_candidates', JSON.stringify(updated));
    } catch {}

    onAddCandidate(newCandidate);
    if (showToast) showToast(`Invitation sent to ${name} (${email}) for ${selectedProj.title}!`, 'success');
    
    // Reset form & close
    setName('');
    setEmail('');
    setCollege('');
    setSkills('');
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
          width: '560px',
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
        {/* Modal Header */}
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
            Invite Candidate
          </h3>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--rec-muted, #847D94)',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '6px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '80vh', overflowY: 'auto' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--rec-text)' }}>
              Candidate Name *
            </label>
            <input 
              type="text" 
              placeholder="e.g. Rahul Verma"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              Candidate Email *
            </label>
            <input 
              type="email" 
              placeholder="e.g. rahul@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--rec-text)' }}>
                College/University *
              </label>
              <input 
                type="text" 
                placeholder="e.g. BITS Pilani"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
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
                Simulation Type
              </label>
              <select
                value={simType}
                onChange={(e) => setSimType(e.target.value)}
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
              >
                <option value="Individual">Individual</option>
                <option value="Group Team">Group Team</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--rec-text)' }}>
              Skills * (Comma separated)
            </label>
            <input 
              type="text" 
              placeholder="e.g. React, Node.js, Problem Solving"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--rec-text)' }}>
                Role Applying For
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
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
              >
                <option value="Frontend Engineer">Frontend Engineer</option>
                <option value="Backend Engineer">Backend Engineer</option>
                <option value="Fullstack Engineer">Fullstack Engineer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Data Analyst">Data Analyst</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--rec-text)' }}>
                Project Simulation *
              </label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
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
              >
                <option value="">Select a project</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--rec-text)' }}>
              Experience Level
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
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
            >
              <option value="Entry Level">Entry Level</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--rec-text)' }}>
              Invite Message
            </label>
            <textarea 
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--rec-subtext)', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={assignTeam} 
              onChange={(e) => setAssignTeam(e.target.checked)}
              style={{ accentColor: '#312A44' }}
            />
            Assign to active team workspace
          </label>

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
              <Send size={14} /> Send Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteCandidateModal;
