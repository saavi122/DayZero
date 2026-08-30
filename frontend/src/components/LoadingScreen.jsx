import { useEffect, useState } from 'react';
import ParticleText from './ParticleText';

const LoadingScreen = ({ onComplete }) => {
  const [fadeState, setFadeState] = useState('visible'); // 'visible' | 'fading' | 'hidden'

  useEffect(() => {
    // Total duration: gatherDuration (1800ms) + buffer for completion + hold
    // We start the fade out after 2.8 seconds
    const fadeTimeout = setTimeout(() => {
      setFadeState('fading');
    }, 2800);

    // After fade animation completes (800ms), we remove the loading screen
    const completeTimeout = setTimeout(() => {
      setFadeState('hidden');
      onComplete();
    }, 3600);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  // Allow clicking anywhere to skip/fast-forward the intro
  const handleSkip = () => {
    if (fadeState === 'visible') {
      setFadeState('fading');
      setTimeout(() => {
        setFadeState('hidden');
        onComplete();
      }, 600);
    }
  };

  if (fadeState === 'hidden') return null;

  return (
    <div
      onClick={handleSkip}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#07070a',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        cursor: 'pointer',
        opacity: fadeState === 'fading' ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        userSelect: 'none',
      }}
    >
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box' }}>
        <ParticleText
          text="DAYZERO"
          particleSize={2.2}
          density={3.5}
          color="#ffffff"
          highlightColor="#8b5cf6"
          scatter={260}
          gatherDuration={1800}
          stagger={450}
          pointerRepel={45}
          repelRadius={135}
          idleDrift={0.65}
          trigger="mount"
          fontSize="clamp(2.2rem, 12vw, 8rem)"
          fontWeight={900}
          fontFamily="'Outfit', sans-serif"
          glow={true}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          color: '#94a3b8',
          fontSize: 'clamp(10px, 2.5vw, 12px)',
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '2px',
          opacity: 0.7,
          textTransform: 'uppercase',
          animation: 'pulse 2s infinite ease-in-out',
          textAlign: 'center',
          padding: '0 16px'
        }}
      >
        Click anywhere to enter
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
