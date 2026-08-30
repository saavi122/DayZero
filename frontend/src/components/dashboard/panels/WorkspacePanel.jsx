import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  PenTool, 
  ShieldCheck, 
  Megaphone, 
  Users, 
  Clock, 
  ArrowRight, 
  Lock, 
  Building2, 
  Globe,
  CheckCircle2,
  XCircle,
  RotateCcw
} from 'lucide-react';

const defaultFeedItems = [
  {
    id: 'ravi',
    name: 'Ravi',
    role: 'Tech Lead',
    iconName: 'Code',
    message: 'I need the one path we trust before I touch the fix.',
    status: null,
    rejectReason: ''
  },
  {
    id: 'mira',
    name: 'Mira',
    role: 'UX Designer',
    iconName: 'PenTool',
    message: 'The empty state is still too vague. Users will think it broke.',
    status: null,
    rejectReason: ''
  },
  {
    id: 'kenji',
    name: 'Kenji',
    role: 'Security Lead',
    iconName: 'ShieldCheck',
    message: 'Recovery still needs proof before I would call this safe.',
    status: null,
    rejectReason: ''
  },
  {
    id: 'asha',
    name: 'Asha',
    role: 'Product Manager',
    iconName: 'Megaphone',
    message: 'I need the launch call soon: ship, narrow, or hold.',
    status: null,
    rejectReason: ''
  }
];

const WorkspacePanel = ({ onSelectProject, onLockedTaskClick, onNavigate }) => {
  const userStr = localStorage.getItem('user');
  let user = null;
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch {}

  const isInvited = user && (user.isInvited || (user.company && user.company !== 'Demo Workspace'));
  const invitedProject = user ? (user.invitedProject || {
    id: 'ai-resume-screener',
    title: 'AI Resume Screener',
    description: 'Company technical assessment project assigned by your recruiter.',
    techStack: ['React', 'Python', 'OpenAI']
  }) : null;

  // Teammate Activity Feed Decisions State
  const [feedItems, setFeedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('dayzero_teammate_feed_decisions');
      return saved ? JSON.parse(saved) : defaultFeedItems;
    } catch {
      return defaultFeedItems;
    }
  });

  const [rejectingId, setRejectingId] = useState(null);
  const [reasonInput, setReasonInput] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('dayzero_teammate_feed_decisions', JSON.stringify(feedItems));
    } catch {}
  }, [feedItems]);

  const handleAccept = (id) => {
    setFeedItems(prev => prev.map(item => item.id === id ? { ...item, status: 'accepted', rejectReason: '' } : item));
    if (rejectingId === id) setRejectingId(null);
  };

  const handleDelay = (id) => {
    setFeedItems(prev => prev.map(item => item.id === id ? { ...item, status: 'delayed', rejectReason: '' } : item));
    if (rejectingId === id) setRejectingId(null);
  };

  const handleOpenReject = (id) => {
    setRejectingId(id);
    const item = feedItems.find(i => i.id === id);
    setReasonInput(item?.rejectReason || '');
  };

  const handleConfirmReject = (id) => {
    if (!reasonInput.trim()) return;
    setFeedItems(prev => prev.map(item => item.id === id ? { ...item, status: 'rejected', rejectReason: reasonInput.trim() } : item));
    setRejectingId(null);
    setReasonInput('');
  };

  const handleResetDecision = (id) => {
    setFeedItems(prev => prev.map(item => item.id === id ? { ...item, status: null, rejectReason: '' } : item));
    if (rejectingId === id) setRejectingId(null);
  };

  // Open Source Practice Rooms
  const openSourceTasks = [
    {
      id: 'open-source-checkout',
      company: 'Open Source',
      logo: 'OS',
      title: 'Checkout Flow Improvements',
      description: 'Optimize user input validation and checkout state handlers in an open source codebase.',
      role: 'Frontend',
      time: '45 mins',
      teamSize: '3',
      difficulty: 'Medium',
      isUnlocked: true
    },
    {
      id: 'open-source-analytics',
      company: 'Open Source',
      logo: 'OS',
      title: 'Dashboard Widget Performance Fix',
      description: 'Identify slow rendering bottlenecks in the analytics widget and apply optimization patterns.',
      role: 'Frontend',
      time: '35 mins',
      teamSize: '2',
      difficulty: 'Beginner',
      isUnlocked: false
    }
  ];

  const handleLaunchAssignedSprint = () => {
    const projId = invitedProject?.id || 'ai-resume-screener';
    const taskDetails = {
      id: projId,
      company: user?.company || 'LinkedIn',
      title: invitedProject?.title || 'AI Resume Screener',
      label: invitedProject?.title || 'AI Resume Screener',
      role: user?.role || 'Frontend Engineer',
      difficulty: 'Medium',
      description: invitedProject?.description || 'Company technical assessment project.',
      skills: invitedProject?.techStack || ['React', 'Python', 'OpenAI'],
      time: invitedProject?.time || invitedProject?.timeDuration || '45 mins'
    };

    localStorage.setItem('dayzero_task_id', projId);
    localStorage.setItem('dayzero_selected_task_details', JSON.stringify(taskDetails));
    localStorage.setItem('dayzero_monitored_room_id', projId);
    localStorage.setItem('dayzero_mode', 'candidate');

    const targetUrl = `/simulation?roomId=${projId}&mode=candidate`;
    if (onNavigate) {
      onNavigate(targetUrl);
    } else {
      window.location.href = targetUrl;
    }
  };

  const handleTaskAction = (task) => {
    if (task.isUnlocked) {
      localStorage.setItem('dayzero_task_id', task.id);
      const targetUrl = `/simulation?roomId=${task.id}&mode=candidate`;
      if (onNavigate) {
        onNavigate(targetUrl);
      } else {
        window.location.href = targetUrl;
      }
    } else {
      if (onLockedTaskClick) {
        onLockedTaskClick(task);
      } else if (onNavigate) {
        onNavigate('/?signup=true');
      } else {
        window.location.href = '/?signup=true';
      }
    }
  };

  const getTeammateIcon = (iconName) => {
    switch (iconName) {
      case 'Code': return Code;
      case 'PenTool': return PenTool;
      case 'ShieldCheck': return ShieldCheck;
      case 'Megaphone': return Megaphone;
      default: return Code;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
    >
      {/* Official Company Assessment Card */}
      {isInvited && invitedProject && (
        <div 
          style={{
            background: 'linear-gradient(135deg, #312A44 0%, #4A3B66 100%)',
            color: '#ffffff',
            borderRadius: '18px',
            padding: '28px',
            border: '1px solid rgba(159, 134, 181, 0.3)',
            boxShadow: '0 12px 32px rgba(49, 42, 68, 0.22)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 12px', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.15)', color: '#F2EFF9', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building2 size={13} /> ASSIGNED COMPANY PROJECT — {user.company || 'LinkedIn'}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
              ● Official Invitation Active
            </span>
          </div>

          <h3 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
            {invitedProject.title || 'AI Resume Screener'}
          </h3>

          <p style={{ fontSize: '13.5px', color: 'rgba(242, 239, 249, 0.88)', margin: 0, lineHeight: 1.5 }}>
            {invitedProject.description || 'Company technical assessment project assigned by your recruiter.'}
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
            {(invitedProject.techStack || ['React', 'Python', 'OpenAI']).map((t, idx) => (
              <span key={idx} style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff' }}>
                {t}
              </span>
            ))}
          </div>

          <button
            onClick={handleLaunchAssignedSprint}
            style={{
              marginTop: '10px',
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              background: '#ffffff',
              color: '#312A44',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: 'fit-content',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
            }}
          >
            Launch Assigned Sprint Room <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Title */}
      <div className="section-title-row">
        <div>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={18} color="var(--accent)" /> Open Source Collaboration & Practice Sandbox
          </h3>
          <span className="section-sub">
            {isInvited 
              ? 'Community practice rooms for skill warm-up before launching your official company sprint' 
              : '1 Demo simulation open. Sign up or use your candidate invite to unlock all company projects.'}
          </span>
        </div>
      </div>

      {/* Task Grid */}
      <div className="project-grid">
        {openSourceTasks.map((task) => {
          const unlocked = task.isUnlocked;

          return (
            <motion.div 
              key={task.id}
              className="project-card"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              style={{ opacity: unlocked ? 1 : 0.85, position: 'relative' }}
            >
              <div className="proj-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--highlight-gradient)', color: '#fff', fontWeight: 800, display: 'grid', placeItems: 'center', fontSize: '11px' }}>
                    {task.logo}
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)' }}>{task.company}</div>
                    <div className="proj-title">{task.title}</div>
                  </div>
                </div>

                {!unlocked && (
                  <span style={{ fontSize: '10.5px', fontWeight: 800, padding: '3px 8px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Lock size={11} /> Locked
                  </span>
                )}
              </div>

              <p className="proj-desc">{task.description}</p>

              <div className="proj-meta">
                <div className="role-tags">
                  <span className="role-tag">{task.role}</span>
                  <span className="role-tag" style={{ background: 'var(--card-sub)' }}>{task.difficulty}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--subtext)', fontSize: '12px' }}>
                  <Clock size={14} /> {task.time}
                  <Users size={14} /> {task.teamSize}
                </div>
              </div>

              <button 
                className={`primary-btn full-width ${!unlocked ? 'locked' : ''}`}
                onClick={() => handleTaskAction(task)}
                style={{
                  background: unlocked ? 'var(--highlight-gradient)' : 'var(--card-sub)',
                  color: unlocked ? '#ffffff' : 'var(--text)',
                  border: unlocked ? 'none' : '1px solid var(--border)'
                }}
              >
                {unlocked ? (
                  <>Launch Practice Room <ArrowRight size={14} /></>
                ) : (
                  <><Lock size={14} color="#ef4444" /> Sign up to Unlock</>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Live Teammate Feed */}
      <div className="dashboard-card-box">
        <div className="section-title-row">
          <h3>Teammate Activity Feed</h3>
          <span className="live-dot">LIVE</span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {feedItems.map(item => {
            const Icon = getTeammateIcon(item.iconName);
            const isRejectingThis = rejectingId === item.id;

            return (
              <div 
                key={item.id} 
                style={{ 
                  padding: '16px', 
                  background: 'var(--card-sub)', 
                  border: item.status === 'accepted' 
                    ? '1px solid rgba(16, 185, 129, 0.4)' 
                    : item.status === 'delayed'
                    ? '1px solid rgba(245, 158, 11, 0.4)'
                    : item.status === 'rejected'
                    ? '1px solid rgba(239, 68, 68, 0.4)'
                    : '1px solid var(--border)', 
                  borderRadius: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon size={16} color="var(--accent)" />
                    <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text)' }}>{item.name}</span>
                    <span style={{ fontSize: '10px', color: 'var(--subtext)', fontWeight: 600 }}>· {item.role}</span>
                  </div>

                  {item.status && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span 
                        style={{ 
                          fontSize: '10.5px', 
                          fontWeight: 800, 
                          padding: '3px 8px', 
                          borderRadius: '10px',
                          background: item.status === 'accepted' ? 'rgba(16, 185, 129, 0.15)' : item.status === 'delayed' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: item.status === 'accepted' ? '#10b981' : item.status === 'delayed' ? '#f59e0b' : '#ef4444'
                        }}
                      >
                        {item.status === 'accepted' && '✓ Accepted'}
                        {item.status === 'delayed' && '⏱ Delayed'}
                        {item.status === 'rejected' && '✗ Rejected'}
                      </span>
                      <button 
                        onClick={() => handleResetDecision(item.id)}
                        title="Change decision"
                        style={{ background: 'transparent', border: 'none', color: 'var(--subtext)', cursor: 'pointer', padding: '2px' }}
                      >
                        <RotateCcw size={12} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Message */}
                <p style={{ fontSize: '12.5px', color: 'var(--subtext)', lineHeight: 1.45, margin: 0 }}>
                  "{item.message}"
                </p>

                {/* Display Rejection Reason if rejected */}
                {item.status === 'rejected' && item.rejectReason && (
                  <div style={{ fontSize: '11.5px', padding: '8px 10px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
                    <strong>Reason:</strong> {item.rejectReason}
                  </div>
                )}

                {/* Inline Rejection Reason Form */}
                {isRejectingThis ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                    <input
                      type="text"
                      placeholder="Reason for rejection (e.g. Scope constraint)..."
                      value={reasonInput}
                      onChange={(e) => setReasonInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleConfirmReject(item.id)}
                      autoFocus
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        background: 'var(--card-sub)',
                        color: 'var(--text)',
                        fontSize: '12px',
                        outline: 'none'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => setRejectingId(null)}
                        style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--subtext)', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleConfirmReject(item.id)}
                        disabled={!reasonInput.trim()}
                        style={{ padding: '4px 12px', borderRadius: '6px', border: 'none', background: '#ef4444', color: '#fff', fontSize: '11px', fontWeight: 700, cursor: reasonInput.trim() ? 'pointer' : 'not-allowed', opacity: reasonInput.trim() ? 1 : 0.6 }}
                      >
                        Confirm Reject
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Action Buttons Row */
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <button
                      onClick={() => handleAccept(item.id)}
                      style={{
                        flex: 1,
                        padding: '7px 10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        background: item.status === 'accepted' ? '#10b981' : 'rgba(16, 185, 129, 0.10)',
                        color: item.status === 'accepted' ? '#ffffff' : '#10b981',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <CheckCircle2 size={13} /> Accept
                    </button>

                    <button
                      onClick={() => handleDelay(item.id)}
                      style={{
                        flex: 1,
                        padding: '7px 10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        background: item.status === 'delayed' ? '#f59e0b' : 'rgba(245, 158, 11, 0.10)',
                        color: item.status === 'delayed' ? '#ffffff' : '#f59e0b',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Clock size={13} /> Delay
                    </button>

                    <button
                      onClick={() => handleOpenReject(item.id)}
                      style={{
                        flex: 1,
                        padding: '7px 10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        background: item.status === 'rejected' ? '#ef4444' : 'rgba(239, 68, 68, 0.10)',
                        color: item.status === 'rejected' ? '#ffffff' : '#ef4444',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <XCircle size={13} /> Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkspacePanel;
