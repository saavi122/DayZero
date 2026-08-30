import { useEffect, useState } from 'react';
import ShapeBlur from './ShapeBlur';

const Hero = ({ onGetStartedClick, onDemoClick, isRevealed }) => {
  const [timeLeft, setTimeLeft] = useState('18:22');
  const [progressWidth, setProgressWidth] = useState('0%');

  // Countdown timer logic
  useEffect(() => {
    if (!isRevealed) return;
    
    let totalSeconds = parseInt(localStorage.getItem('timerSeconds')) || (18 * 60 + 22);

    const updateTimer = () => {
      if (totalSeconds <= 0) {
        setTimeLeft('0:00');
        localStorage.removeItem('timerSeconds');
        return;
      }
      totalSeconds--;
      localStorage.setItem('timerSeconds', totalSeconds);

      const m = Math.floor(totalSeconds / 60);
      const s = totalSeconds % 60;
      setTimeLeft(`${m}:${s < 10 ? '0' + s : s}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isRevealed]);

  // Progress bar animation logic
  useEffect(() => {
    if (!isRevealed) return;
    const timer = setTimeout(() => {
      setProgressWidth('78%');
    }, 500);
    return () => clearTimeout(timer);
  }, [isRevealed]);

  return (
    <section className="hero" style={{ opacity: isRevealed ? 1 : 0, transition: 'opacity 0.6s ease', paddingTop: '48px' }}>
      <div className="container" style={{ maxWidth: '1180px' }}>
        
        {/* Main Centered Copy */}
        <div className="hero-content centered" style={{ marginBottom: '40px' }}>
          <div className="hero-tag-container">
            <span className="hero-tag">Experience Work Before Day One</span>
            <span className="hero-tag-dot"></span>
          </div>
          <h1 className="hero-title" style={{ maxWidth: '850px', fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', fontWeight: 900, lineHeight: 1.1 }}>
            Experience Work <span className="highlight-text">Before Day One</span>
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 24px', maxWidth: '680px', fontSize: '1.05rem', color: '#554d66' }}>
            Candidates complete real-world tasks inside live workspaces. Recruiters observe progress, review verified SkillRecords, and make faster, unbiased hiring decisions.
          </p>
          <div className="hero-cta" style={{ justifyContent: 'center', gap: '14px' }}>
            <button className="btn btn-primary" onClick={onGetStartedClick} style={{ padding: '0 28px', fontSize: '14px' }}>Start Building</button>
            <button className="btn btn-secondary" onClick={onDemoClick} style={{ padding: '0 28px', fontSize: '14px' }}>Request Demo</button>
          </div>
        </div>

        {/* 🌟 The Fused Recruiter + Candidate Simulation Dashboard Visual 🌟 */}
        <div 
          className="hero-visual"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(49, 42, 68, 0.12)',
            borderRadius: '20px',
            boxShadow: '0 20px 50px rgba(49, 42, 68, 0.05)',
            overflow: 'hidden',
            fontFamily: "'Inter', sans-serif",
            display: 'grid',
            gridTemplateColumns: '240px 1fr 280px',
            minHeight: '440px',
            maxWidth: '1120px',
            margin: '0 auto',
          }}
        >
          {/* COLUMN 1: Candidate Verified Profile Panel */}
          <div 
            style={{
              background: '#fcfbfe',
              borderRight: '1px solid rgba(49, 42, 68, 0.08)',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Ambient ShapeBlur layer */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', opacity: 0.18, zIndex: 1 }}>
              <ShapeBlur
                variation={0}
                pixelRatioProp={window.devicePixelRatio || 1}
                shapeSize={0.95}
                roundness={0.35}
                borderSize={0.025}
                circleSize={0.18}
                circleEdge={0.7}
              />
            </div>

            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div 
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: '#e9e5f0',
                  border: '3px solid #312a44',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#312a44',
                  marginBottom: '16px',
                  userSelect: 'none'
                }}
              >
                {/* Profile Avatar SVG */}
                <svg viewBox="0 0 24 24" width="42" height="42" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#312a44', marginBottom: '2px' }}>Astra Chen</h3>
              <p style={{ fontSize: '0.82rem', color: '#847d94', fontWeight: 500, marginBottom: '14px' }}>Senior Product Designer</p>
              
              <div 
                style={{ 
                  background: 'rgba(136, 112, 158, 0.1)', 
                  color: '#88709e', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  padding: '4px 12px', 
                  borderRadius: '20px',
                  marginBottom: '24px',
                  border: '1px solid rgba(136, 112, 158, 0.2)'
                }}
              >
                ✓ SkillRecord Verified
              </div>

              <div style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#88709e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Core Proficiency</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#554d66' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: '#fff', padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(49, 42, 68, 0.05)' }}>
                    <span>React UI</span>
                    <span style={{ fontWeight: 700, color: '#312a44' }}>94%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: '#fff', padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(49, 42, 68, 0.05)' }}>
                    <span>UX/UI Prototyping</span>
                    <span style={{ fontWeight: 700, color: '#312a44' }}>88%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: '#fff', padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(49, 42, 68, 0.05)' }}>
                    <span>Form Validation</span>
                    <span style={{ fontWeight: 700, color: '#312a44' }}>76%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Live Candidate Simulation Sprint Room */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#ffffff',
            }}
          >
            {/* Header */}
            <div 
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid rgba(49, 42, 68, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.95rem', color: '#312a44' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }}></span>
                DayZero Live Simulation Room
              </div>
              <div style={{ fontSize: '11px', color: '#88709e', fontWeight: 600 }}>Active Role: Candidate</div>
            </div>

            {/* Chat Board */}
            <div 
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                flex: 1,
                overflowY: 'auto',
                background: '#fafafc'
              }}
            >
              {/* Asha */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div className="msg-avatar">A</div>
                <div className="msg-content">
                  <div className="msg-sender">Asha <span className="msg-sender-title">Product Manager</span></div>
                  <div className="msg-text">Welcome to the room. Recruiters have selected the checkout performance task. Let's fix the API latency.</div>
                </div>
              </div>

              {/* Ravi */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div className="msg-avatar">R</div>
                <div className="msg-content">
                  <div className="msg-sender">Ravi <span className="msg-sender-title">Engineering Lead</span></div>
                  <div className="msg-text">I've reviewed the code. We have a locking bottleneck in <code>cache.rs</code>. Candidate, can you optimize the read path?</div>
                </div>
              </div>

              {/* Candidate */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div className="msg-avatar" style={{ background: '#312a44', color: '#fff' }}>C</div>
                <div className="msg-content" style={{ borderLeft: '3px solid #312a44' }}>
                  <div className="msg-sender">Candidate <span className="msg-sender-title">You</span></div>
                  <div className="msg-text">I am refactoring the lock scope to use a read-write lock (<code>RwLock</code>) instead of a Mutex. This should resolve the write contention.</div>
                </div>
              </div>

              {/* AI observer */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div className="msg-avatar" style={{ background: '#88709e', color: '#fff' }}>AI</div>
                <div className="msg-content" style={{ background: 'rgba(136, 112, 158, 0.05)', border: '1px dashed rgba(136, 112, 158, 0.2)' }}>
                  <div className="msg-sender" style={{ color: '#88709e' }}>DayZero AI <span className="msg-sender-title">Observer Agent</span></div>
                  <div className="msg-text">✓ Refactoring verified. Latency reduced by 92%. Performance score updated to 94/100.</div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3: Recruiter Insights & Performance Gauges */}
          <div 
            style={{
              background: '#fcfbfe',
              borderLeft: '1px solid rgba(49, 42, 68, 0.08)',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#88709e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Shortlist Insights</div>
            
            {/* Completion Meter Card */}
            <div 
              style={{
                background: '#ffffff',
                border: '1px solid rgba(49, 42, 68, 0.06)',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(49, 42, 68, 0.01)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* ShapeBlur Ambient layer */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', opacity: 0.15, zIndex: 1 }}>
                <ShapeBlur
                  variation={0}
                  pixelRatioProp={window.devicePixelRatio || 1}
                  shapeSize={0.95}
                  roundness={0.35}
                  borderSize={0.025}
                  circleSize={0.18}
                  circleEdge={0.7}
                />
              </div>

              <div style={{ position: 'relative', zIndex: 10 }}>
                <p style={{ fontSize: '11px', color: '#847d94', fontWeight: 600, marginBottom: '8px' }}>Task Completion</p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', margin: '8px 0' }}>
                  {/* Visual Circle Meter */}
                  <div 
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '50%',
                      border: '8px solid #eae8f0',
                      borderTopColor: '#312a44',
                      borderRightColor: '#312a44',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '15px',
                      color: '#312a44',
                    }}
                  >
                    70%
                  </div>
                </div>
              </div>
            </div>

            {/* AI Evaluated Scores Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div 
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(49, 42, 68, 0.06)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* ShapeBlur Ambient layer */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', opacity: 0.12, zIndex: 1 }}>
                  <ShapeBlur
                    variation={0}
                    pixelRatioProp={window.devicePixelRatio || 1}
                    shapeSize={0.95}
                    roundness={0.35}
                    borderSize={0.025}
                    circleSize={0.18}
                    circleEdge={0.7}
                  />
                </div>

                <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '9px', color: '#847d94', fontWeight: 600, textTransform: 'uppercase' }}>Adaptability</p>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#312a44' }}>High</p>
                  </div>
                  <div style={{ color: '#88709e', display: 'flex', alignItems: 'center' }}>
                    {/* Lightning SVG */}
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div 
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(49, 42, 68, 0.06)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* ShapeBlur Ambient layer */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', opacity: 0.12, zIndex: 1 }}>
                  <ShapeBlur
                    variation={0}
                    pixelRatioProp={window.devicePixelRatio || 1}
                    shapeSize={0.95}
                    roundness={0.35}
                    borderSize={0.025}
                    circleSize={0.18}
                    circleEdge={0.7}
                  />
                </div>

                <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '9px', color: '#847d94', fontWeight: 600, textTransform: 'uppercase' }}>Collaboration</p>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#312a44' }}>Excellent</p>
                  </div>
                  <div style={{ color: '#88709e', display: 'flex', alignItems: 'center' }}>
                    {/* Team SVG */}
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 8 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Score Metric Card */}
            <div 
              style={{
                background: '#312a44',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* ShapeBlur Ambient layer */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', opacity: 0.22, zIndex: 1 }}>
                <ShapeBlur
                  variation={0}
                  pixelRatioProp={window.devicePixelRatio || 1}
                  shapeSize={0.95}
                  roundness={0.35}
                  borderSize={0.025}
                  circleSize={0.18}
                  circleEdge={0.7}
                />
              </div>

              <div style={{ position: 'relative', zIndex: 10 }}>
                <p style={{ fontSize: '10px', opacity: 0.8, fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Log In Score</p>
                <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>94<span style={{ fontSize: '14px', opacity: 0.6 }}>/100</span></h3>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Visual responsive layout fix for mobile */}
      <style>{`
        @media (max-width: 960px) {
          .hero-visual {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
          .hero-visual > div {
            border-right: none !important;
            border-left: none !important;
            border-bottom: 1px solid rgba(49, 42, 68, 0.08) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
