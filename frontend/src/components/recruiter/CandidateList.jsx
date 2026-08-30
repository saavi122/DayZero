import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Calendar, Star } from 'lucide-react';

const CandidateList = ({ 
  searchQuery, 
  setSearchQuery, 
  candidates = [], 
  onSelectCandidate, 
  onShortlist, 
  onInterview, 
  activeNav 
}) => {
  const [activeTab, setActiveTab] = useState(() => {
    if (activeNav === 'shortlist') return 'Shortlisted';
    if (activeNav === 'interviews') return 'Interviews';
    return 'All Candidates';
  });

  useEffect(() => {
    if (activeNav === 'shortlist') {
      setActiveTab('Shortlisted');
    } else if (activeNav === 'interviews') {
      setActiveTab('Interviews');
    }
  }, [activeNav]);

  const filteredCandidates = candidates.filter(c => {
    const query = searchQuery ? searchQuery.toLowerCase() : '';
    const matchesSearch = !query || 
                          c.name.toLowerCase().includes(query) || 
                          (c.college && c.college.toLowerCase().includes(query)) ||
                          c.role.toLowerCase().includes(query) ||
                          (c.skills && c.skills.some(s => s.toLowerCase().includes(query)));
    
    if (activeTab === 'Shortlisted') return matchesSearch && c.status === 'Shortlisted';
    if (activeTab === 'Interviews') return matchesSearch && (c.status === 'Interview Scheduled' || c.status === 'Interview');
    if (activeTab === 'Needs Review') return matchesSearch && c.status !== 'Shortlisted' && c.status !== 'Interview Scheduled';
    return matchesSearch;
  });

  const getStatusBadgeColor = (status) => {
    if (status === 'Shortlisted') return { color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' };
    if (status === 'Interview Scheduled' || status === 'Interview') return { color: '#88709e', bg: 'rgba(136, 112, 158, 0.15)' };
    return { color: 'var(--rec-subtext)', bg: 'rgba(136, 112, 158, 0.08)' };
  };

  return (
    <div className="candidate-table-container" style={{ background: 'var(--rec-surface)', borderRadius: '18px', padding: '24px', border: '1px solid var(--rec-border)' }}>
      {/* Header & Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--rec-text)', margin: 0 }}>
            {activeNav === 'shortlist' ? 'Shortlisted Candidates' : activeNav === 'interviews' ? 'Scheduled Interview Candidates' : 'Candidate Performance'}
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--rec-muted)', marginTop: '4px', margin: 0 }}>
            {filteredCandidates.length} candidate{filteredCandidates.length === 1 ? '' : 's'} matching criteria · Live DayZero Recruiter Sync
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['All Candidates', 'Shortlisted', 'Interviews', 'Needs Review'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid var(--rec-border)',
                background: activeTab === tab ? '#312A44' : 'var(--rec-surface2)',
                color: activeTab === tab ? '#ffffff' : 'var(--rec-subtext)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="candidate-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Overall Score</th>
              <th>Progress</th>
              <th>Top Skill</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--rec-muted)', fontSize: '13px' }}>
                  No candidates found for <strong>"{activeTab}"</strong>. Mark candidates as Shortlisted or Schedule Interview to view them here.
                </td>
              </tr>
            ) : (
              filteredCandidates.map((cand, idx) => {
                const badgeStyle = getStatusBadgeColor(cand.status);
                return (
                  <motion.tr
                    key={cand.id}
                    className="cand-row"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    style={{ cursor: 'pointer' }}
                  >
                    <td onClick={() => onSelectCandidate(cand)}>
                      <div className="candidate-name-cell" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div 
                          className="candidate-avatar" 
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            background: '#312A44',
                            color: '#ffffff',
                            fontWeight: 800,
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {cand.name ? cand.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'C'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--rec-text)', fontSize: '14px' }}>{cand.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--rec-muted)' }}>{cand.college || 'IIT Guwahati'}</div>
                        </div>
                      </div>
                    </td>

                    <td onClick={() => onSelectCandidate(cand)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '60px', height: '6px', background: 'rgba(136, 112, 158, 0.15)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${cand.score}%`, height: '100%', background: '#10b981' }} />
                        </div>
                        <span style={{ fontWeight: 800, color: 'var(--rec-text)', fontSize: '13px' }}>{cand.score}</span>
                      </div>
                    </td>

                    <td onClick={() => onSelectCandidate(cand)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '60px', height: '6px', background: 'rgba(136, 112, 158, 0.15)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: cand.progress || '80%', height: '100%', background: '#88709e' }} />
                        </div>
                        <span style={{ fontWeight: 700, color: 'var(--rec-subtext)', fontSize: '13px' }}>{cand.progress || '82%'}</span>
                      </div>
                    </td>

                    <td onClick={() => onSelectCandidate(cand)}>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', background: 'rgba(136, 112, 158, 0.12)', color: '#88709e' }}>
                        {cand.topSkill || 'Prioritization'}
                      </span>
                    </td>

                    <td onClick={() => onSelectCandidate(cand)}>
                      <span style={{ 
                        fontSize: '11px', 
                        fontWeight: 700, 
                        padding: '4px 10px', 
                        borderRadius: '20px', 
                        background: badgeStyle.bg, 
                        color: badgeStyle.color 
                      }}>
                        ● {cand.status || 'On Track'}
                      </span>
                    </td>

                    <td onClick={() => onSelectCandidate(cand)} style={{ fontSize: '12px', color: 'var(--rec-muted)' }}>
                      {cand.lastActive || '3m ago'}
                    </td>

                    <td>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onShortlist) onShortlist(cand);
                          }}
                          title={cand.status === 'Shortlisted' ? 'Remove from Shortlist' : 'Shortlist Candidate'}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '7px',
                            border: cand.status === 'Shortlisted' ? '1px solid #88709e' : '1px solid var(--rec-border)',
                            background: cand.status === 'Shortlisted' ? 'rgba(136, 112, 158, 0.18)' : 'var(--rec-surface2)',
                            color: cand.status === 'Shortlisted' ? '#88709e' : 'var(--rec-text)',
                            fontWeight: 700,
                            fontSize: '11.5px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Star size={12} fill={cand.status === 'Shortlisted' ? '#88709e' : 'none'} color="#88709e" />
                          {cand.status === 'Shortlisted' ? 'Shortlisted' : 'Shortlist'}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onInterview) onInterview(cand);
                          }}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '7px',
                            border: 'none',
                            background: cand.status === 'Interview Scheduled' ? '#10b981' : '#312A44',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '11.5px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Calendar size={12} />
                          {cand.status === 'Interview Scheduled' ? 'Scheduled ✓' : 'Interview'}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCandidate(cand);
                          }}
                          title="Inspect Candidate Detail"
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '7px',
                            border: '1px solid var(--rec-border)',
                            background: 'var(--rec-surface2)',
                            color: 'var(--rec-text)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateList;
