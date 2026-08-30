import React, { useState, useEffect } from 'react';
import { X, Star, CheckCircle2, Calendar } from 'lucide-react';

const CandidateDetailModal = ({ candidate, onClose, onShortlist, onInterview }) => {
  if (!candidate) return null;

  const [status, setStatus] = useState(candidate.status || 'On Track');

  useEffect(() => {
    if (candidate) {
      setStatus(candidate.status || 'On Track');
    }
  }, [candidate?.id, candidate?.status]);

  const handleShortlistClick = (e) => {
    e.stopPropagation();
    const nextStatus = status === 'Shortlisted' ? 'On Track' : 'Shortlisted';
    setStatus(nextStatus);
    if (onShortlist) {
      onShortlist(candidate);
    }
  };

  const handleInterviewClick = (e) => {
    e.stopPropagation();
    const nextStatus = 'Interview Scheduled';
    setStatus(nextStatus);
    if (onInterview) {
      onInterview(candidate);
    }
  };

  const initials = candidate.name ? candidate.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'RY';

  return (
    <div 
      className="profile-modal-overlay active"
      onClick={(e) => e.target.classList.contains('profile-modal-overlay') && onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(11, 12, 22, 0.70)',
        backdropFilter: 'blur(8px)',
        zIndex: 100000,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <div 
        className="profile-modal-panel"
        style={{
          width: '520px',
          maxWidth: '100%',
          height: '100%',
          background: 'var(--rec-surface, #ffffff)',
          color: 'var(--rec-text, #312A44)',
          borderLeft: '1px solid var(--rec-border, rgba(49, 42, 68, 0.15))',
          padding: '28px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.15)'
        }}
      >
        {/* Modal Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--rec-muted, #847D94)', margin: 0 }}>
              Candidate Detail
            </h4>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--rec-subtext, #554D66)', marginTop: '2px' }}>
              {candidate.name} · {candidate.college || 'IIT Guwahati'}
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(136, 112, 158, 0.12)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--rec-text)'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Profile Card Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textCenter: 'center', padding: '16px 0', borderBottom: '1px solid var(--rec-border)' }}>
          <div 
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #312A44 0%, #4A3B66 100%)',
              color: '#ffffff',
              fontSize: '28px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              boxShadow: '0 8px 20px rgba(49, 42, 68, 0.2)'
            }}
          >
            {initials}
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--rec-text, #312A44)', margin: 0 }}>
            {candidate.name}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--rec-muted, #847D94)', marginTop: '4px', marginBottom: '12px' }}>
            {candidate.college || 'IIT Guwahati'}
          </p>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ 
              fontSize: '11px', 
              fontWeight: 700, 
              padding: '4px 12px', 
              borderRadius: '20px', 
              background: status === 'Shortlisted' ? 'rgba(16, 185, 129, 0.15)' : status === 'Interview Scheduled' ? 'rgba(136, 112, 158, 0.18)' : 'rgba(136, 112, 158, 0.12)', 
              color: status === 'Shortlisted' ? '#10b981' : status === 'Interview Scheduled' ? '#88709e' : 'var(--rec-subtext)' 
            }}>
              ● {status}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', background: 'rgba(136, 112, 158, 0.12)', color: '#88709e' }}>
              {candidate.topSkill || 'Prioritization'}
            </span>
          </div>
        </div>

        {/* Scores Metric Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div style={{ background: 'var(--rec-surface2, #FCFBFE)', border: '1px solid var(--rec-border)', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#10b981', margin: 0, lineHeight: 1 }}>
              {candidate.score || 95}
            </h2>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rec-muted)', textTransform: 'uppercase', marginTop: '6px', margin: 0 }}>
              Overall Score
            </p>
          </div>

          <div style={{ background: 'var(--rec-surface2, #FCFBFE)', border: '1px solid var(--rec-border)', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#88709e', margin: 0, lineHeight: 1 }}>
              {candidate.progress || '82%'}
            </h2>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rec-muted)', textTransform: 'uppercase', marginTop: '6px', margin: 0 }}>
              Sprint Progress
            </p>
          </div>
        </div>

        {/* Core Skills Breakdown */}
        <div>
          <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--rec-muted)', marginBottom: '12px' }}>
            Core Skills
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Leadership', val: 91 },
              { label: 'Communication', val: 84 },
              { label: 'Execution', val: 79 },
              { label: 'Problem Solving', val: 88 },
              { label: 'Adaptability', val: 95 }
            ].map(skill => (
              <div key={skill.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '110px', fontSize: '12px', fontWeight: 600, color: 'var(--rec-subtext)' }}>
                  {skill.label}
                </span>
                <div style={{ flex: 1, height: '8px', background: 'rgba(136, 112, 158, 0.12)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${skill.val}%`, height: '100%', background: '#10b981', borderRadius: '4px' }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--rec-text)', width: '24px', textAlign: 'right' }}>
                  {skill.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Detailed Report: Gain Points & Pain Points */}
        <div>
          <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--rec-muted)', marginBottom: '12px' }}>
            Detailed Assessment Report
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Gain Points */}
            <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '12px', padding: '14px' }}>
              <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#10b981', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={15} /> Gain Points (Key Strengths)
              </div>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: 'var(--rec-subtext)', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>Prioritization & problem framing are standout competencies.</li>
                <li>Proactive evidence-backed communication with team during sprint.</li>
                <li>Resilient decision making under high pressure signals.</li>
              </ul>
            </div>

            {/* Pain Points */}
            <div style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '12px', padding: '14px' }}>
              <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#ef4444', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Star size={15} color="#ef4444" /> Pain Points (Growth Areas & Risks)
              </div>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: 'var(--rec-subtext)', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>Boundary test coverage can be expanded for rare edge-cases.</li>
                <li>Initial sprint time allocated to visual polish before locking contracts.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div>
          <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--rec-muted)', marginBottom: '12px' }}>
            Milestones
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'var(--rec-subtext)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="#10b981" /> Completed Day 1 Onboarding
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="#10b981" /> Submitted Strategy Task
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="#10b981" /> Passed Skill Authentication
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="#10b981" /> Joined Team Collaboration
            </div>
          </div>
        </div>

        {/* Bottom Actions - Sticky at bottom of inspector panel */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '12px', 
            marginTop: 'auto', 
            paddingTop: '16px', 
            paddingBottom: '4px',
            borderTop: '1px solid var(--rec-border)',
            position: 'sticky',
            bottom: 0,
            background: 'var(--rec-surface)',
            zIndex: 10
          }}
        >
          <button 
            type="button"
            onClick={handleShortlistClick}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '10px',
              border: status === 'Shortlisted' ? '1px solid #88709e' : '1px solid var(--rec-border)',
              background: status === 'Shortlisted' ? 'rgba(136, 112, 158, 0.22)' : 'var(--rec-surface2, #FCFBFE)',
              color: status === 'Shortlisted' ? '#88709e' : 'var(--rec-text, #312A44)',
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.15s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          >
            <Star size={16} fill={status === 'Shortlisted' ? "#88709e" : "none"} color="#88709e" />
            {status === 'Shortlisted' ? 'Shortlisted ✓' : 'Shortlist'}
          </button>

          <button 
            type="button"
            onClick={handleInterviewClick}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '10px',
              border: 'none',
              background: status === 'Interview Scheduled' ? '#10b981' : '#312A44',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.15s ease',
              boxShadow: '0 4px 14px rgba(49, 42, 68, 0.25)'
            }}
          >
            <Calendar size={16} />
            {status === 'Interview Scheduled' ? 'Interview Scheduled ✓' : 'Schedule Interview'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailModal;
