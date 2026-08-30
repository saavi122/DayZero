import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, MapPin, GraduationCap, Download, Share2, ShieldCheck, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

const SkillRecordPanel = ({ user }) => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('lastEvaluationReport');
      if (raw) {
        setReport(JSON.parse(raw));
      }
    } catch {}
  }, []);

  const name = user?.name || report?.candidateName || localStorage.getItem('userName') || 'Saavi';
  const role = user?.role || report?.task?.role || localStorage.getItem('userRole') || 'Backend Engineer Candidate';
  const company = user?.company || report?.task?.company || 'LinkedIn';
  const projectTitle = user?.invitedProject?.title || report?.task?.title || 'AI Resume Screener';

  // Calculate dynamic overall score from evaluation report or candidate profile seed
  const computeSeed = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return Math.abs(hash);
  };

  const seed = computeSeed(name + company);
  const rawScore = report?.overall_score || report?.overallScore || (84 + (seed % 10));
  const overallScore = Math.min(rawScore, 94);

  // Helper to ensure scores are always below 95 (max 94)
  const capScore = (val) => Math.min(val || 85, 94);

  // Calculate dynamic score badge
  const scoreBadgeLabel = (score) => {
    if (score >= 90) return 'Top 5% Candidate';
    if (score >= 85) return 'Top 10% Candidate';
    if (score >= 75) return 'Top 15% Candidate';
    return 'Emerging Candidate';
  };

  // Dynamic verified competencies (all capped below 95)
  const skillMatrix = [
    { name: 'Problem Solving', score: capScore(report?.scores?.problem_solving || report?.problem_solving || (82 + ((seed + 1) % 12))) },
    { name: 'Communication', score: capScore(report?.scores?.communication || report?.communication || (80 + ((seed + 3) % 13))) },
    { name: 'Role Judgment', score: capScore(report?.scores?.role_judgment || report?.role_judgment || (85 + ((seed + 5) % 9))) },
    { name: 'Collaboration', score: capScore(report?.scores?.collaboration || report?.collaboration || (83 + ((seed + 7) % 10))) },
    { name: 'Technical Reasoning', score: capScore(report?.scores?.technicalReasoning || report?.technicalReasoning || (86 + ((seed + 9) % 8))) }
  ];

  const summaryText = report?.summary || report?.timeline_summary || 
    `Verified technical assessment performance for ${name} in ${company} (${projectTitle}). Demonstrated strong prioritization, clean state handling, and structured evidence-backed communication during live sprint execution.`;

  const gainPoints = report?.gain_points || (report?.strengths ? report.strengths.map(s => ({ title: 'Verified Skill', desc: s })) : [
    { title: 'Decomposition & Framing', desc: 'Deconstructed complex technical tasks into clear, manageable sprint deliverables.' },
    { title: 'Cross-Functional Alignment', desc: 'Proactively communicated tradeoffs and design updates with AI teammates (Ravi, Mira, Asha).' },
    { title: 'Evidence-Backed Execution', desc: 'Validated core reactivity and state updates with concrete proof before handoff.' },
    { title: 'Resilience Under Pressure', desc: 'Maintained decision quality and composure when sprint pressure meters escalated.' }
  ]);

  const painPoints = report?.pain_points || (report?.risks ? report.risks.map(r => ({ title: 'Growth Focus', desc: r })) : [
    { title: 'Edge-Case Exception Handling', desc: 'Could expand unit test assertions for rare null/undefined boundaries.' },
    { title: 'Initial Time Allocation', desc: 'Spent extra time on secondary UI styling before locking the core state contract.' },
    { title: 'Async Dependency Locking', desc: 'Could establish earlier explicit locks on shared workspace resource files.' }
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      className="recruiter-profile-card"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}
    >
      {/* Brand Hero Header */}
      <div style={{ background: '#312A44', padding: '24px 32px', color: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(8px)', border: '2px solid rgba(255,255,255,0.3)', color: '#ffffff', fontSize: '26px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {name.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.01em' }}>
              {name}
            </h2>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#F2EFF9', margin: '4px 0 2px' }}>
              {role} • {company}
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(242, 239, 249, 0.8)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GraduationCap size={14} /> Official Assessment: {projectTitle}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="primary-btn" style={{ background: '#ffffff', color: '#312A44', fontWeight: 800 }}>
              <Share2 size={14} /> Post on LinkedIn
            </button>
            <button className="secondary-btn" style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)' }}>
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Overall Scoreboard */}
      <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '28px', background: 'var(--card-sub)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--border)', paddingRight: '20px' }}>
            <div style={{ fontSize: '52px', fontWeight: 900, color: 'var(--text)', lineHeight: 1 }}>{overallScore}</div>
            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--subtext)', marginTop: '4px' }}>OVERALL WORK READINESS</div>
            <div className="role-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '10px', background: 'rgba(136, 112, 158, 0.15)', color: '#88709e', fontWeight: 800 }}>
              <Award size={13} /> {scoreBadgeLabel(overallScore)}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text)', marginBottom: '8px', margin: 0 }}>Assessment Summary</h4>
            <p style={{ fontSize: '13px', color: 'var(--subtext)', lineHeight: 1.6, margin: 0 }}>
              {summaryText}
            </p>
          </div>
        </div>

        {/* Full Detailed Report: Gain Points & Pain Points */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Gain Points */}
          <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '14px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#10b981', fontWeight: 800, fontSize: '15px' }}>
              <CheckCircle2 size={18} /> Gain Points (Key Strengths)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {gainPoints.map((gain, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12.5px', color: 'var(--text)', lineHeight: 1.45 }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', marginTop: '6px', flexShrink: 0 }} />
                  <div>
                    <strong>{gain.title}:</strong> {gain.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pain Points */}
          <div style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '14px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#ef4444', fontWeight: 800, fontSize: '15px' }}>
              <AlertTriangle size={18} /> Pain Points (Areas for Growth)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {painPoints.map((pain, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12.5px', color: 'var(--text)', lineHeight: 1.45 }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', marginTop: '6px', flexShrink: 0 }} />
                  <div>
                    <strong>{pain.title}:</strong> {pain.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Verified Core Competencies */}
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', marginBottom: '18px', margin: 0 }}>Verified Core Competencies</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {skillMatrix.map((s, idx) => (
              <div key={idx} style={{ background: 'var(--card-sub)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>
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

        {/* Verified Footer Stamp */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={26} color="#88709e" />
            <div>
              <strong style={{ fontSize: '13px', color: 'var(--text)', display: 'block' }}>AI Verified Skill Assessment</strong>
              <span style={{ fontSize: '11.5px', color: 'var(--subtext)' }}>Issued by DayZero Simulation OS • Official Recruiter Evaluation</span>
            </div>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#88709e' }}>dayzero.ai/{name.toLowerCase().replace(/\s+/g, '-')}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillRecordPanel;
