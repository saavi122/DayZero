import React, { useState } from 'react';
import { Eye, Plus, UserCheck, Trash2 } from 'lucide-react';
import RecruiterMonitoringModal from './RecruiterMonitoringModal';

const initialWorkspaces = [
  { id: '7015', name: 'Group Workspace #7015', type: 'group', candidates: [{ name: 'Reha Yadav', avatar: 'RY' }, { name: 'Priya Mehta', avatar: 'PM' }] },
  { id: '2733', name: 'Group Workspace #2733', type: 'group', candidates: [{ name: 'Reha Yadav', avatar: 'RY' }, { name: 'Priya Mehta', avatar: 'PM' }] },
  { id: '3783', name: 'Group Workspace #3783', type: 'group', candidates: [{ name: 'Reha Yadav', avatar: 'RY' }, { name: 'Priya Mehta', avatar: 'PM' }] },
  { id: '6732', name: 'Group Workspace #6732', type: 'group', candidates: [{ name: 'Reha Yadav', avatar: 'RY' }, { name: 'Priya Mehta', avatar: 'PM' }] },
  { id: '2616', name: 'Group Workspace #2616', type: 'group', candidates: [{ name: 'Reha Yadav', avatar: 'RY' }, { name: 'Priya Mehta', avatar: 'PM' }] },
  { id: '5797', name: 'Group Workspace #5797', type: 'group', candidates: [{ name: 'Reha Yadav', avatar: 'RY' }, { name: 'Priya Mehta', avatar: 'PM' }] },
  { id: '4913', name: 'Group Workspace #4913', type: 'group', candidates: [{ name: 'Reha Yadav', avatar: 'RY' }, { name: 'Priya Mehta', avatar: 'PM' }] },
  { id: '1614', name: 'Group Workspace #1614', type: 'group', candidates: [{ name: 'Reha Yadav', avatar: 'RY' }, { name: 'Priya Mehta', avatar: 'PM' }] }
];

const poolCandidates = [
  { id: 'cand-1', name: 'Anishka', role: 'React Specialist', avatar: 'A', status: 'active' },
  { id: 'cand-2', name: 'Reha Yadav', role: 'Prioritization Specialist', avatar: 'RY', status: 'active' },
  { id: 'cand-3', name: 'Priya Mehta', role: 'Leadership Specialist', avatar: 'PM', status: 'active' },
  { id: 'cand-4', name: 'Rohit Nair', role: 'Execution Specialist', avatar: 'RN', status: 'active' }
];

const ActiveSimulationsPanel = ({ candidates = [], onNavigate, showToast }) => {
  const [workspaces, setWorkspaces] = useState(() => {
    try {
      const saved = localStorage.getItem('dayzero_active_sim_workspaces');
      return saved ? JSON.parse(saved) : initialWorkspaces;
    } catch {
      return initialWorkspaces;
    }
  });

  // Dynamic candidate pool from actual candidate list
  const poolCandidates = candidates.length > 0 ? candidates.map(c => ({
    id: String(c.id),
    name: c.name,
    role: c.role || c.topSkill || 'Engineering Candidate',
    avatar: c.name ? c.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'C',
    status: c.status || 'Active'
  })) : [
    { id: 'cand-1', name: 'Anishka', role: 'React Specialist', avatar: 'A', status: 'Active' },
    { id: 'cand-2', name: 'Reha Yadav', role: 'Prioritization Specialist', avatar: 'RY', status: 'Shortlisted' },
    { id: 'cand-3', name: 'Priya Mehta', role: 'Leadership Specialist', avatar: 'PM', status: 'Shortlisted' },
    { id: 'cand-4', name: 'Rohit Nair', role: 'Execution Specialist', avatar: 'RN', status: 'On Track' }
  ];

  const scheduledInterviews = candidates.filter(c => c.status === 'Interview Scheduled' || c.status === 'Interview');

  const [simType, setSimType] = useState('Group');
  const [selectedCandIds, setSelectedCandIds] = useState(poolCandidates.slice(0, 2).map(c => c.id));
  const [monitoredRoom, setMonitoredRoom] = useState(null);

  const handleToggleCandidate = (id) => {
    setSelectedCandIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const handleCreateRoom = () => {
    const randomId = Math.floor(1000 + Math.random() * 9000).toString();
    const selectedCands = poolCandidates.filter(c => selectedCandIds.includes(c.id)).map(c => ({ name: c.name, avatar: c.avatar }));
    
    const newRoom = {
      id: randomId,
      name: simType === 'Individual' ? `Individual Sim — ${selectedCands[0]?.name || 'Candidate'}` : `Group Workspace #${randomId}`,
      type: simType.toLowerCase(),
      candidates: selectedCands.length ? selectedCands : [{ name: 'Candidate', avatar: 'C' }]
    };

    const updated = [newRoom, ...workspaces];
    setWorkspaces(updated);
    localStorage.setItem('dayzero_active_sim_workspaces', JSON.stringify(updated));

    if (showToast) showToast(`Created ${newRoom.name} successfully!`, 'success');
  };

  const handleLaunchInterviewRoom = (cand) => {
    const randomId = Math.floor(1000 + Math.random() * 9000).toString();
    const avatar = cand.name ? cand.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'C';
    const newRoom = {
      id: randomId,
      name: `Interview Room — ${cand.name}`,
      type: 'individual',
      candidates: [{ name: cand.name, avatar }]
    };

    const updated = [newRoom, ...workspaces];
    setWorkspaces(updated);
    localStorage.setItem('dayzero_active_sim_workspaces', JSON.stringify(updated));

    if (showToast) showToast(`Launched live interview simulation for ${cand.name}!`, 'success');
    setMonitoredRoom(newRoom);
  };

  const handleOpenMonitorRoom = (room) => {
    setMonitoredRoom(room);
    if (showToast) showToast(`Monitoring ${room.name}...`, 'info');
  };

  const handleDeleteRoom = (roomId) => {
    const updated = workspaces.filter(w => w.id !== roomId);
    setWorkspaces(updated);
    localStorage.setItem('dayzero_active_sim_workspaces', JSON.stringify(updated));
    if (showToast) showToast(`Room #${roomId} deleted`, 'info');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px', alignItems: 'flex-start', position: 'relative' }}>
      {/* LEFT COLUMN: Candidate Pool & Create Room Configurator */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Project Candidate Pool */}
        <div style={{ background: 'var(--rec-surface)', border: '1px solid var(--rec-border)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--rec-text)', margin: 0 }}>Project Candidate Pool</h3>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', background: 'rgba(136, 112, 158, 0.15)', color: '#88709e' }}>
              {poolCandidates.length} Candidates
            </span>
          </div>

          <p style={{ fontSize: '11.5px', color: 'var(--rec-muted)', marginBottom: '16px', margin: 0 }}>
            Select and assign candidates from this pool to active simulation rooms.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '240px', overflowY: 'auto' }}>
            {poolCandidates.map(cand => (
              <div 
                key={cand.id} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: 'var(--rec-surface2)',
                  border: '1px solid var(--rec-border)'
                }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#312A44', color: '#fff', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cand.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rec-text)' }}>{cand.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--rec-muted)' }}>{cand.role} • <span style={{ color: cand.status === 'Interview Scheduled' ? '#88709e' : '#10b981' }}>{cand.status}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Simulation Room Configurator */}
        <div style={{ background: 'var(--rec-surface)', border: '1px solid var(--rec-border)', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--rec-text)', marginBottom: '14px', margin: 0 }}>Create Simulation Room</h3>
          
          <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--rec-subtext)', display: 'block', marginBottom: '6px' }}>Simulation Type</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
            <button
              onClick={() => setSimType('Individual')}
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid var(--rec-border)',
                background: simType === 'Individual' ? '#312A44' : 'var(--rec-surface2)',
                color: simType === 'Individual' ? '#fff' : 'var(--rec-text)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Individual
            </button>
            <button
              onClick={() => setSimType('Group')}
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid var(--rec-border)',
                background: simType === 'Group' ? '#312A44' : 'var(--rec-surface2)',
                color: simType === 'Group' ? '#fff' : 'var(--rec-text)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Group
            </button>
          </div>

          <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--rec-subtext)', display: 'block', marginBottom: '8px' }}>Select Candidates</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {poolCandidates.map(c => (
              <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--rec-text)', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={selectedCandIds.includes(c.id)}
                  onChange={() => handleToggleCandidate(c.id)}
                  style={{ accentColor: '#312A44' }}
                />
                <span>{c.name} ({c.role})</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleCreateRoom}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '9px',
              border: 'none',
              background: '#312A44',
              color: '#fff',
              fontWeight: 700,
              fontSize: '12.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Plus size={14} /> Create Simulation Room
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Active Simulations Grid matching Image 2 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Scheduled Interview Candidates Section */}
        <div style={{ background: 'var(--rec-surface)', border: '1px solid var(--rec-border)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--rec-text)', margin: 0 }}>Scheduled Interviews</h3>
              <p style={{ fontSize: '12px', color: 'var(--rec-muted)', marginTop: '4px', margin: 0 }}>
                Candidates ready for live evaluation & simulation interviews
              </p>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '20px', background: 'rgba(136, 112, 158, 0.15)', color: '#88709e' }}>
              {scheduledInterviews.length} Scheduled
            </span>
          </div>

          {scheduledInterviews.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', background: 'var(--rec-surface2)', borderRadius: '12px', border: '1px dashed var(--rec-border)', color: 'var(--rec-muted)', fontSize: '13px' }}>
              No interviews scheduled yet. Click <strong>"Schedule Interview"</strong> on any candidate in the Candidates list to view them here.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
              {scheduledInterviews.map(cand => (
                <div
                  key={cand.id}
                  style={{
                    background: 'var(--rec-surface2)',
                    border: '1px solid rgba(136, 112, 158, 0.3)',
                    borderRadius: '14px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#312A44', color: '#fff', fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {cand.name ? cand.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'C'}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--rec-text)' }}>{cand.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--rec-muted)' }}>{cand.role} · {cand.college}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', background: 'rgba(136, 112, 158, 0.15)', color: '#88709e' }}>
                      ● Interview Scheduled
                    </span>
                    <button
                      onClick={() => handleLaunchInterviewRoom(cand)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#312A44',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '11.5px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Eye size={12} /> Launch Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Simulations Grid */}
        <div style={{ background: 'var(--rec-surface)', border: '1px solid var(--rec-border)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--rec-text)', margin: 0 }}>Active Simulations</h3>
              <p style={{ fontSize: '12px', color: 'var(--rec-muted)', marginTop: '4px', margin: 0 }}>
                Live candidate & team workspaces connected to AI_Engine
              </p>
            </div>

            <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
              ● {workspaces.length} Active Rooms
            </span>
          </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {workspaces.map(room => (
            <div
              key={room.id}
              style={{
                background: 'var(--rec-surface2)',
                border: '1px solid var(--rec-border)',
                borderRadius: '14px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--rec-text)' }}>{room.name}</div>
                  <span style={{ fontSize: '9.5px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: 'rgba(136, 112, 158, 0.12)', color: '#88709e', textTransform: 'uppercase' }}>
                    {room.type}
                  </span>
                </div>

                <button
                  onClick={() => handleDeleteRoom(room.id)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--rec-muted)', cursor: 'pointer', padding: '2px' }}
                  title="Close Room"
                >
                  <Trash2 size={12} />
                </button>
              </div>

              {/* Candidate Avatars & Monitor Action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                <div style={{ display: 'flex', gap: '-4px' }}>
                  {(room.candidates || [{ avatar: 'RY' }, { avatar: 'PM' }]).map((c, idx) => (
                    <div 
                      key={idx}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #4A3B66 0%, #312A44 100%)',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid var(--rec-surface)'
                      }}
                      title={c.name}
                    >
                      {c.avatar}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleOpenMonitorRoom(room)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#312A44',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Eye size={13} /> Monitor
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

      {/* Recruiter Silent Monitoring Modal */}
      <RecruiterMonitoringModal
        room={monitoredRoom}
        onClose={() => setMonitoredRoom(null)}
      />
    </div>
  );
};

export default ActiveSimulationsPanel;
