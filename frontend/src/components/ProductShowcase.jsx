import { useEffect, useRef, useState } from 'react';

const ProductShowcase = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`benefits-section ${isRevealed ? 'revealed' : ''}`}
      style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)', background: 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.03) 0%, transparent 60%)' }}
    >
      <div className="container">
        <div className="section-heading" style={{ marginBottom: '48px' }}>
          <p className="section-tag" style={{ color: '#8b5cf6' }}>Interactive Workspace</p>
          <h2>Experience the Sprint Environment</h2>
          <p>
            An integrated work simulator with live code workspaces, project contexts, and AI teammates.
          </p>
        </div>

        {/* Mock IDE Window */}
        <div 
          style={{
            background: '#0d0e14',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(139, 92, 246, 0.05)',
            overflow: 'hidden',
            fontFamily: "'Inter', sans-serif",
            display: 'flex',
            flexDirection: 'column',
            height: '480px',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {/* IDE Window Header */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 18px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              background: '#090a0f',
              userSelect: 'none'
            }}
          >
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
              <span style={{ color: '#6b7280', fontSize: '12px', marginLeft: '12px', letterSpacing: '0.5px' }}>dayzero-workspace - main.rs</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#10b981', background: 'rgba(16, 185, 129, 0.08)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>Score: 94</span>
              <span style={{ fontSize: '11px', color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.08)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>Active Blocker: 1</span>
            </div>
          </div>

          {/* IDE Workspace body */}
          <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
            {/* Sidebar File explorer */}
            <div 
              style={{
                width: '180px',
                borderRight: '1px solid rgba(255, 255, 255, 0.06)',
                background: '#090a0f',
                padding: '16px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '12px',
                color: '#9ca3af',
              }}
            >
              <div style={{ fontWeight: 600, color: '#e5e7eb', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Project Explorer</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ color: '#38bdf8', fontWeight: 500 }}>📂 src</div>
                <div style={{ paddingLeft: '14px', color: '#e5e7eb', background: 'rgba(255, 255, 255, 0.04)', padding: '2px 6px 2px 14px', borderRadius: '4px' }}>📄 main.rs</div>
                <div style={{ paddingLeft: '14px' }}>📄 config.rs</div>
                <div style={{ paddingLeft: '14px' }}>📄 handlers.rs</div>
                <div style={{ color: '#9ca3af' }}>📄 Cargo.toml</div>
                <div style={{ color: '#9ca3af' }}>📄 README.md</div>
              </div>
            </div>

            {/* Editor Workspace */}
            <div 
              style={{
                flex: 1,
                background: '#0d0e14',
                padding: '18px',
                fontFamily: "'Fira Code', 'Courier New', Courier, monospace",
                fontSize: '12.5px',
                lineHeight: '1.65',
                overflowY: 'auto',
                color: '#e2e8f0',
              }}
            >
              <div><span style={{ color: '#f43f5e' }}>use</span> std::collections::HashMap;</div>
              <div><span style={{ color: '#f43f5e' }}>use</span> tokio::sync::Mutex;</div>
              <br />
              <div><span style={{ color: '#38bdf8' }}>#[tokio::main]</span></div>
              <div><span style={{ color: '#f43f5e' }}>async fn</span> <span style={{ color: '#10b981' }}>main</span>() {'{'}</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#6b7280' }}>// Connect observer agent and load DB state</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#f43f5e' }}>let</span> cache = Mutex::new(HashMap::new());</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#f43f5e' }}>let</span> workspace_id = uuid::Uuid::new_v4();</div>
              <br />
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#38bdf8' }}>println!</span>(<span style={{ color: '#eab308' }}>"DayZero sprint engine initialized on: {}"</span>, workspace_id);</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#6b7280' }}>// TODO: resolve active latency blocker</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#f43f5e' }}>let</span> result = evaluate_sprint_metrics(&cache).<span style={{ color: '#38bdf8' }}>await</span>;</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;result.unwrap()</div>
              <div>{'}'}</div>
            </div>

            {/* AI Assistant Sidebar */}
            <div 
              style={{
                width: '280px',
                borderLeft: '1px solid rgba(255, 255, 255, 0.06)',
                background: '#090a0f',
                display: 'flex',
                flexDirection: 'column',
                fontSize: '12px',
              }}
            >
              {/* AI Chat Header */}
              <div 
                style={{
                  padding: '12px 14px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  fontWeight: 600,
                  color: '#e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6', boxShadow: '0 0 8px #8b5cf6' }}></span>
                DayZero AI Copilot
              </div>

              {/* AI Chat messages */}
              <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <div style={{ fontWeight: 600, color: '#8b5cf6', marginBottom: '4px' }}>Asha (PM)</div>
                  <div style={{ color: '#9ca3af', lineHeight: '1.4' }}>Let's address the caching latency in `main.rs`. Ravi, can we look at the Mutex lock?</div>
                </div>

                <div style={{ background: 'rgba(139, 92, 246, 0.05)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
                  <div style={{ fontWeight: 600, color: '#a78bfa', marginBottom: '4px' }}>DayZero AI</div>
                  <div style={{ color: '#e5e7eb', lineHeight: '1.4' }}>Analysis: Mutex contention detected on line 12. Suggest moving hash calculations outside of cache lock scope to reduce critical section hold time.</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <div style={{ fontWeight: 600, color: '#f43f5e', marginBottom: '4px' }}>Ravi (Eng Lead)</div>
                  <div style={{ color: '#9ca3af', lineHeight: '1.4' }}>Applied the suggestion. The latency decreased from 420ms to 12ms. Blocker resolved.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
