import React, { useState, useEffect, useRef } from 'react';
import { X, Eye, Bot, User, CheckCircle2 } from 'lucide-react';

const RecruiterMonitoringModal = ({ room, onClose }) => {
  if (!room) return null;

  const chatContainerRef = useRef(null);

  const initialMessages = [
    { type: 'system', text: 'Collaborative workspace created successfully.' },
    { type: 'system', text: 'Reha Yadav (Prioritization Specialist) joined the workspace.' },
    { type: 'system', text: 'Priya Mehta (Leadership Specialist) joined the workspace.' },
    {
      id: 1,
      sender: 'Daniel Kim',
      isAI: true,
      roleBadge: 'AI TEAMMATE',
      time: '8m ago',
      text: "Welcome team! Daniel here. We've got a tight sprint window for this collaborative assessment. I've set up task board allocations."
    },
    {
      id: 2,
      sender: 'Reha Yadav',
      isAI: false,
      roleBadge: 'CANDIDATE',
      time: '5m ago',
      text: 'Hi Daniel! I will grab the main user dashboard UI component and frontend form layout.'
    },
    {
      id: 3,
      sender: 'Priya Mehta',
      isAI: false,
      roleBadge: 'CANDIDATE',
      time: '4m ago',
      text: "Perfect. I'll focus on database connectors and secure session tokens."
    },
    {
      id: 4,
      sender: 'Rahul Mehta',
      isAI: true,
      roleBadge: 'AI TEAMMATE',
      time: '2m ago',
      text: "Rahul here. I'll start building out backend API routing specs and joint local unit checkers."
    }
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [typingUser, setTypingUser] = useState(null);

  // Smooth Auto Scroll to bottom whenever messages or typing state updates
  useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight + 1000,
          behavior: 'smooth'
        });
      }
    };

    scrollToBottom();
    const timer = setTimeout(scrollToBottom, 60);
    return () => clearTimeout(timer);
  }, [messages, typingUser]);

  // Continuous Fast Live Message Stream Ticker (Every 1.8s)
  useEffect(() => {
    const candidates = room.candidates || [{ name: 'Reha Yadav' }, { name: 'Priya Mehta' }];
    const c1 = candidates[0]?.name || 'Reha Yadav';
    const c2 = candidates[1]?.name || 'Priya Mehta';

    const liveMessageQueue = [
      {
        typing: c1,
        getMsg: () => ({
          sender: c1,
          isAI: false,
          roleBadge: 'CANDIDATE',
          time: 'Just now',
          text: 'I am refactoring the authentication state machine; form validation unit checks are green now.'
        })
      },
      {
        typing: 'Daniel Kim (AI)',
        getMsg: () => ({
          sender: 'Daniel Kim',
          isAI: true,
          roleBadge: 'AI TEAMMATE',
          time: 'Just now',
          text: 'Great work! Let me optimize the query pipeline for faster API responses.'
        })
      },
      {
        typing: c2,
        getMsg: () => ({
          sender: c2,
          isAI: false,
          roleBadge: 'CANDIDATE',
          time: 'Just now',
          text: 'Added error boundaries to handle network disconnects cleanly and log diagnostics.'
        })
      },
      {
        typing: null,
        getMsg: () => ({
          type: 'system',
          text: 'System Alert: Local sandbox integration suite executed. 18/18 checks passed.'
        })
      },
      {
        typing: 'Rahul Mehta (AI)',
        getMsg: () => ({
          sender: 'Rahul Mehta',
          isAI: true,
          roleBadge: 'AI TEAMMATE',
          time: 'Just now',
          text: 'Code review looks solid. I am merging the API route specs into the main branch.'
        })
      },
      {
        typing: c1,
        getMsg: () => ({
          sender: c1,
          isAI: false,
          roleBadge: 'CANDIDATE',
          time: 'Just now',
          text: 'Pushed candidate handoff docs and trade-off notes into task_brief.md.'
        })
      },
      {
        typing: c2,
        getMsg: () => ({
          sender: c2,
          isAI: false,
          roleBadge: 'CANDIDATE',
          time: 'Just now',
          text: "I've connected the JWT token verification middleware to the active user routes."
        })
      },
      {
        typing: 'Asha Chen (AI)',
        getMsg: () => ({
          sender: 'Asha Chen',
          isAI: true,
          roleBadge: 'AI TEAMMATE',
          time: 'Just now',
          text: 'Nice progress team! The sprint timebox is 65% complete. Focus on edge case coverage next.'
        })
      },
      {
        typing: null,
        getMsg: () => ({
          type: 'system',
          text: 'Workspace Update: Candidate submitted pull request #14: Auth Middleware Harden.'
        })
      },
      {
        typing: c1,
        getMsg: () => ({
          sender: c1,
          isAI: false,
          roleBadge: 'CANDIDATE',
          time: 'Just now',
          text: 'I am adding responsive CSS breakpoints and accessibility ARIA tags for screen readers.'
        })
      },
      {
        typing: 'Daniel Kim (AI)',
        getMsg: () => ({
          sender: 'Daniel Kim',
          isAI: true,
          roleBadge: 'AI TEAMMATE',
          time: 'Just now',
          text: 'Merged PR #14. All 24 automated unit and integration tests are passing cleanly.'
        })
      },
      {
        typing: c2,
        getMsg: () => ({
          sender: c2,
          isAI: false,
          roleBadge: 'CANDIDATE',
          time: 'Just now',
          text: 'Database migration scripts executed without errors. Schema is now updated.'
        })
      },
      {
        typing: null,
        getMsg: () => ({
          type: 'system',
          text: 'System Alert: Room pulse score updated: +5 points for collaborative task delegation.'
        })
      },
      {
        typing: 'Rahul Mehta (AI)',
        getMsg: () => ({
          sender: 'Rahul Mehta',
          isAI: true,
          roleBadge: 'AI TEAMMATE',
          time: 'Just now',
          text: 'I reviewed your database migration scripts. High performance index applied.'
        })
      },
      {
        typing: c1,
        getMsg: () => ({
          sender: c1,
          isAI: false,
          roleBadge: 'CANDIDATE',
          time: 'Just now',
          text: 'Finalizing the UI layout components. Ready to present the candidate handoff evidence.'
        })
      }
    ];

    let index = 0;
    const interval = setInterval(() => {
      const item = liveMessageQueue[index % liveMessageQueue.length];
      
      if (item.typing) {
        setTypingUser(item.typing);
      }

      setTimeout(() => {
        setTypingUser(null);
        const newMsg = item.getMsg();
        setMessages(prev => [...prev, { ...newMsg, id: Date.now() + Math.random() }]);
        index++;
      }, 500);
    }, 1800);

    return () => clearInterval(interval);
  }, [room]);

  const candidateMsgs = messages.filter(m => !m.type && !m.isAI);
  const totalCandMsgs = candidateMsgs.length || 1;
  const candidatesList = room.candidates || [{ name: 'Reha Yadav', avatar: 'RY' }, { name: 'Priya Mehta', avatar: 'PM' }];

  return (
    <div 
      className="modal-overlay active"
      onClick={(e) => e.target.classList.contains('modal-overlay') && onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(6, 7, 14, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 200000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <div 
        style={{
          width: '1080px',
          maxWidth: '100%',
          height: '84vh',
          background: 'var(--rec-surface, #ffffff)',
          color: 'var(--rec-text, #312A44)',
          borderRadius: '20px',
          border: '1px solid var(--rec-border, rgba(49, 42, 68, 0.15))',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header Bar */}
        <div 
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--rec-border, rgba(49, 42, 68, 0.1))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--rec-surface2, #FCFBFE)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '20px', background: 'rgba(136, 112, 158, 0.15)', color: '#88709e', textTransform: 'uppercase' }}>
              {room.type === 'individual' ? 'Individual Simulation' : 'Group Simulation'}
            </span>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--rec-text, #312A44)', margin: 0 }}>
              {room.name || `Group Workspace #${room.id}`} — Collaboration Deck
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
              ● Live Continuous Stream
            </span>
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
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Body Grid */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 340px', minHeight: 0 }}>
          {/* LEFT: Live Communication Stream */}
          <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--rec-border)', background: 'var(--rec-surface)', height: '100%', minHeight: 0 }}>
            {/* Messages Scroll Area */}
            <div 
              ref={chatContainerRef}
              style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', scrollBehavior: 'smooth' }}
            >
              {messages.map((msg, idx) => {
                if (msg.type === 'system') {
                  return (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--rec-muted)', padding: '4px 14px', borderRadius: '20px', background: 'var(--rec-surface2)', border: '1px solid var(--rec-border)' }}>
                        {msg.text}
                      </span>
                    </div>
                  );
                }

                const initials = msg.sender.split(' ').map(n => n[0]).join('').slice(0, 2);
                const avatarBg = msg.isAI ? 'linear-gradient(135deg, #312A44 0%, #4A3B66 100%)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

                return (
                  <div key={msg.id || idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: avatarBg, color: '#fff', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {initials}
                    </div>
                    <div style={{ flex: 1, background: 'var(--rec-surface2)', border: '1px solid var(--rec-border)', borderRadius: '12px', padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--rec-text)' }}>
                          {msg.sender} {msg.isAI && '(AI)'}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '6px', background: msg.isAI ? 'rgba(136, 112, 158, 0.15)' : 'rgba(16, 185, 129, 0.15)', color: msg.isAI ? '#88709e' : '#10b981', textTransform: 'uppercase' }}>
                          {msg.roleBadge}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--rec-muted)', marginLeft: 'auto' }}>
                          {msg.time}
                        </span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--rec-subtext)', margin: 0, lineHeight: 1.5 }}>
                        {msg.text}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {typingUser && (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', opacity: 0.85, paddingLeft: '48px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--rec-accent)', fontStyle: 'italic' }}>
                    ✍️ {typingUser} is typing a message...
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Observation Mode Bar */}
            <div style={{ padding: '14px 24px', borderTop: '1px solid var(--rec-border)', background: 'var(--rec-surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--rec-muted)', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
              <Eye size={16} color="#88709e" /> Silent Recruiter Observation Mode — Chat controls disabled
            </div>
          </div>

          {/* RIGHT: Candidate Contribution & Workspace Activity */}
          <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--rec-surface2)' }}>
            {/* Recruiter Insight */}
            <div style={{ background: 'var(--rec-surface)', border: '1px solid var(--rec-border)', borderRadius: '14px', padding: '16px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#88709e', margin: 0, marginBottom: '6px' }}>
                Recruiter Insight
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--rec-subtext)', margin: 0, lineHeight: 1.5 }}>
                Silently observing candidate responses, speed of execution, and collaborative task delegation in real time.
              </p>
            </div>

            {/* Candidate Contribution */}
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--rec-muted)', marginBottom: '12px' }}>
                Candidate Contribution
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {candidatesList.map((cand, idx) => {
                  const msgCount = messages.filter(m => m.sender === cand.name).length;
                  const pct = Math.round((msgCount / totalCandMsgs) * 100) || (idx === 0 ? 50 : 50);
                  const colors = ['#88709e', '#3b82f6', '#10b981'];
                  const barColor = colors[idx % colors.length];

                  return (
                    <div key={cand.name || idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: 'var(--rec-text)', marginBottom: '4px' }}>
                        <span>{cand.name}</span>
                        <span>{pct}% ({msgCount} messages)</span>
                      </div>
                      <div style={{ height: '6px', width: '100%', background: 'rgba(136, 112, 158, 0.12)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: barColor, transition: 'width 0.3s ease' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Workspace Activity Timeline */}
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--rec-muted)', marginBottom: '12px' }}>
                Workspace Activity
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', color: 'var(--rec-subtext)' }}>
                {[
                  { text: 'Cooperative task board synchronized', time: 'Just now' },
                  { text: 'AI teammates initialized in active state', time: '8m ago' },
                  { text: 'Priya Mehta joined workspace', time: '10m ago' },
                  { text: 'Reha Yadav joined workspace', time: '10m ago' },
                  { text: 'Collaborative workspace created successfully', time: '12m ago' }
                ].map((act, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#88709e', fontWeight: 800 }}>●</span>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--rec-text)' }}>{act.text}</div>
                      <div style={{ fontSize: '10.5px', color: 'var(--rec-muted)' }}>{act.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterMonitoringModal;
