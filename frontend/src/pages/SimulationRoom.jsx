import React, { useEffect } from 'react';
import { ArrowLeft, Monitor } from 'lucide-react';

const SimulationRoom = ({ onNavigate }) => {
  const queryParams = new URLSearchParams(window.location.search);
  const roomId = queryParams.get('roomId') || localStorage.getItem('dayzero_monitored_room_id') || '2733';
  const mode = queryParams.get('mode') || localStorage.getItem('dayzero_mode') || 'monitor';
  const isRecruiter = mode === 'monitor' || localStorage.getItem('role') === 'recruiter';

  useEffect(() => {
    // Ensure body styles fit simulation view
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const simulationUrl = `/frontend/pages/simulation.html?roomId=${encodeURIComponent(roomId)}&mode=${encodeURIComponent(mode)}`;

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: '#0B0C16', color: '#F2EFF9' }}>
      {/* Top Banner when Recruiter is in Monitoring Mode */}
      {isRecruiter && (
        <div 
          style={{
            height: '42px',
            background: 'linear-gradient(90deg, #312A44 0%, #4A3B66 100%)',
            borderBottom: '1px solid rgba(159, 134, 181, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            fontSize: '12.5px',
            fontWeight: 700,
            zIndex: 999
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('/recruiter');
                } else {
                  window.location.href = '/recruiter';
                }
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <ArrowLeft size={14} /> Back to Recruiter OS
            </button>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9F86B5' }}>
              <Monitor size={14} /> SILENT MONITORING MODE — Workspace #{roomId}
            </span>
          </div>

          <div style={{ fontSize: '11px', color: 'rgba(242, 239, 249, 0.7)' }}>
            Live Feed Connected to AI_Engine Orchestrator
          </div>
        </div>
      )}

      {/* Embedded Real Simulation Room iframe */}
      <iframe
        src={simulationUrl}
        title={`DayZero Simulation Room #${roomId}`}
        style={{
          width: '100%',
          flex: 1,
          border: 'none',
          background: '#0B0C16'
        }}
      />
    </div>
  );
};

export default SimulationRoom;
