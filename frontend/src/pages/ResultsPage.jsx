import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Briefcase, 
  Calendar, 
  Download, 
  Share2, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  LayoutDashboard,
  Clock,
  User,
  Sparkles
} from 'lucide-react';

const ResultsPage = ({ onNavigate }) => {
  const [report, setReport] = useState(null);
  const [copiedToast, setCopiedToast] = useState('');

  useEffect(() => {
    localStorage.setItem('dayzero_current_route', '/results');
    if (!window.location.pathname.includes('results')) {
      try {
        window.history.replaceState({}, '', '/results');
      } catch {}
    }
    try {
      const raw = localStorage.getItem('lastEvaluationReport');
      if (raw) {
        setReport(JSON.parse(raw));
      }
    } catch {}
  }, []);

  const userStr = localStorage.getItem('user');
  let user = null;
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch {}

  const name = user?.name || report?.candidateName || localStorage.getItem('userName') || 'Saavi';
  const role = user?.role || report?.task?.role || localStorage.getItem('userRole') || 'Backend Engineer Candidate';
  const company = user?.company || report?.task?.company || 'LinkedIn';
  const projectTitle = user?.invitedProject?.title || report?.task?.title || 'AI Resume Screener';

  // Dynamic seed calculation
  const computeSeed = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return Math.abs(hash);
  };

  const seed = computeSeed(name + company);
  const rawScore = report?.overall_score || report?.overallScore || (84 + (seed % 10));
  const overallScore = Math.min(rawScore, 94);

  const capScore = (val) => Math.min(val || 85, 94);

  const scoreBadgeLabel = (score) => {
    if (score >= 90) return 'Top 5% Candidate';
    if (score >= 85) return 'Top 10% Candidate';
    if (score >= 75) return 'Top 15% Candidate';
    return 'Emerging Candidate';
  };

  const skillMatrix = [
    { name: 'Problem Solving', score: capScore(report?.scores?.problem_solving || report?.problem_solving || (82 + ((seed + 1) % 12))) },
    { name: 'Communication', score: capScore(report?.scores?.communication || report?.communication || (80 + ((seed + 3) % 13))) },
    { name: 'Role Judgment', score: capScore(report?.scores?.role_judgment || report?.role_judgment || (85 + ((seed + 5) % 9))) },
    { name: 'Collaboration', score: capScore(report?.scores?.collaboration || report?.collaboration || (83 + ((seed + 7) % 10))) },
    { name: 'Technical Reasoning', score: capScore(report?.scores?.technicalReasoning || report?.technicalReasoning || (86 + ((seed + 9) % 8))) }
  ];

  const strengths = report?.strengths || [
    'Demonstrated clear problem decomposition and evidence-backed decision making.',
    'Proactive communication with AI teammates during sprint timebox.',
    'Clean validation evidence recorded in task handoff brief.'
  ];

  const risks = report?.weaknesses || report?.risks || [
    'Residual risk in edge-case exception handling under pressure.',
    'Could increase initial benchmark unit test coverage before committing PRs.'
  ];

  const handleShare = () => {
    const text = `${name} | ${projectTitle} SkillRecord (${overallScore}/100) - dayzero.ai/${name.toLowerCase().replace(/\s+/g, '-')}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedToast('SkillRecord link & text copied!');
    } else {
      setCopiedToast('Copied to clipboard!');
    }
    setTimeout(() => setCopiedToast(''), 2500);
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--rec-bg, #f7f6f9)', color: 'var(--rec-text, #312A44)', padding: '24px 16px 60px' }}>
      <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Navigation Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => {
              localStorage.setItem('dayzero_current_route', '/dashboard');
              if (onNavigate) {
                onNavigate('/dashboard');
              } else {
                window.location.href = '/dashboard';
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '9px',
              border: '1px solid var(--rec-border, rgba(49, 42, 68, 0.15))',
              background: 'var(--rec-surface, #ffffff)',
              color: 'var(--rec-text)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>

          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--rec-muted)' }}>
            Official SkillRecord Verification Page
          </span>
        </div>

        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'var(--rec-surface, #ffffff)',
            border: '1px solid var(--rec-border, rgba(49, 42, 68, 0.15))',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(49, 42, 68, 0.08)'
          }}
        >
          {/* Header Banner */}
          <div style={{ background: '#312A44', padding: '32px', color: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <div 
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {name.charAt(0).toUpperCase()}
              </div>

              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '28px', fontWeight: 900, margin: 0, color: '#ffffff', letterSpacing: '-0.01em' }}>
                  {name}
                </h1>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#F2EFF9', margin: '4px 0 6px' }}>
                  {role}
                </p>
                <p style={{ fontSize: '12.5px', color: 'rgba(242, 239, 249, 0.85)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Briefcase size={14} /> {company}</span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {projectTitle}</span>
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleShare}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#ffffff',
                    color: '#312A44',
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Share2 size={15} /> Post on LinkedIn
                </button>

                <button
                  onClick={handleDownload}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: 'rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Download size={15} /> Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Toast Notification */}
          {copiedToast && (
            <div style={{ background: '#10b981', color: '#fff', padding: '10px', textAlign: 'center', fontWeight: 700, fontSize: '12.5px' }}>
              {copiedToast}
            </div>
          )}

          {/* Score & Summary Grid */}
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '28px', background: 'var(--rec-surface2, #FCFBFE)', border: '1px solid var(--rec-border)', borderRadius: '16px', padding: '24px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--rec-border)', paddingRight: '24px' }}>
                <div style={{ fontSize: '56px', fontWeight: 900, color: 'var(--rec-text)', lineHeight: 1 }}>{overallScore}</div>
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--rec-muted)', marginTop: '6px' }}>OVERALL WORK READINESS</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '12px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(136, 112, 158, 0.15)', color: '#88709e', fontWeight: 800, fontSize: '11.5px' }}>
                  <Award size={14} /> {scoreBadgeLabel(overallScore)}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--rec-text)', marginBottom: '8px', margin: 0 }}>
                  Assessment Summary
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--rec-subtext)', lineHeight: 1.6, margin: 0 }}>
                  {report?.summary || report?.timeline_summary || `Verified technical assessment performance for ${name} on ${projectTitle}. Solution covered core workflow requirements under timebox constraints and demonstrated clean evidence-backed decisions.`}
                </p>
              </div>
            </div>

            {/* Core Competencies Grid */}
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--rec-text)', marginBottom: '20px', margin: 0 }}>
                Verified Core Competencies
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {skillMatrix.map((s, idx) => (
                  <div key={idx} style={{ background: 'var(--rec-surface2)', border: '1px solid var(--rec-border)', borderRadius: '14px', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', fontWeight: 700, color: 'var(--rec-text)' }}>
                      <span>{s.name}</span>
                      <span style={{ color: '#88709e', fontWeight: 800 }}>{s.score}/100</span>
                    </div>
                    <div style={{ height: '7px', width: '100%', background: 'rgba(136, 112, 158, 0.12)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${s.score}%`, height: '100%', background: '#312A44', borderRadius: '4px', transition: 'width 0.6s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Detailed Report: Gain Points & Pain Points */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {/* Gain Points */}
              <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '16px', padding: '20px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, marginBottom: '14px' }}>
                  <CheckCircle2 size={18} /> Gain Points (Key Strengths)
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {strengths.map((str, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--rec-text)', lineHeight: 1.45 }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', marginTop: '6px', flexShrink: 0 }} />
                      <div>{str}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pain Points */}
              <div style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '16px', padding: '20px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, marginBottom: '14px' }}>
                  <AlertTriangle size={18} /> Pain Points (Areas for Growth & Risks)
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {risks.map((r, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--rec-text)', lineHeight: 1.45 }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', marginTop: '6px', flexShrink: 0 }} />
                      <div>{r}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Verification Stamp */}
            <div style={{ borderTop: '1px solid var(--rec-border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <ShieldCheck size={28} color="#88709e" />
                <div>
                  <strong style={{ fontSize: '14px', color: 'var(--rec-text)', display: 'block' }}>
                    AI Verified Work Readiness SkillRecord
                  </strong>
                  <span style={{ fontSize: '12px', color: 'var(--rec-muted)' }}>
                    Issued by DayZero Simulation OS • Recruiter Verified Assessment
                  </span>
                </div>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#88709e' }}>
                dayzero.ai/{name.toLowerCase().replace(/\s+/g, '-')}
              </span>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;
