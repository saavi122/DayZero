import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import Navbar from './Navbar';
import Hero from './Hero';
import TrustSection from './TrustSection';
import Problem from './Problem';
import HowItWorks from './HowItWorks';
import Benefits from './Benefits';
import Recruiters from './Recruiters';
import CTA from './CTA';
import Footer from './Footer';
import RegistrationModal from './RegistrationModal';
import AuthModal from './AuthModal';
import LogoLoop from './LogoLoop';

// Tech stack partner logos
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiPython, 
  SiRust, 
  SiVite, 
  SiDocker 
} from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  { node: <SiRust />, title: "Rust", href: "https://www.rust-lang.org" },
  { node: <SiVite />, title: "Vite", href: "https://vite.dev" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" }
];

const LandingPage = ({ isRevealed, onNavigate }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [activeModal, setActiveModal] = useState(null); // null | 'registration' | 'auth-login' | 'auth-signup'
  const [modalTitle, setModalTitle] = useState('Get Started');
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const triggerModal = (type, title = '') => {
    if (type === 'registration') {
      setModalTitle(title || 'Get Started');
    }
    setActiveModal(type);
  };

  return (
    <div style={{ position: 'relative' }}>
      
      <Navbar
        theme={theme}
        onThemeToggle={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
        onLoginClick={() => triggerModal('auth-login')}
        onSignupClick={() => triggerModal('auth-signup')}
        onDemoClick={() => triggerModal('registration', 'Request Demo')}
        isRevealed={isRevealed}
      />

      <Hero
        onGetStartedClick={() => triggerModal('registration', 'Get Started')}
        onDemoClick={() => triggerModal('registration', 'Request Demo')}
        isRevealed={isRevealed}
      />

      <div 
        style={{
          opacity: isRevealed ? 1 : 0,
          transition: 'opacity 1.5s ease',
          transitionDelay: '0.3s'
        }}
      >
        {/* 🔄 LogoLoop Partner Section */}
        <section 
          className="logoloop-section"
          style={{
            padding: '44px 0 24px',
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <h4 
            style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              color: 'var(--accent, #88709e)',
              textTransform: 'uppercase',
              margin: '0 0 4px',
              textAlign: 'center'
            }}
          >
            BUILT FOR MODERN TEAMS
          </h4>
          
          <LogoLoop
            logos={techLogos}
            speed={55}
            direction="left"
            logoHeight={48}
            gap={72}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor={theme === 'dark' ? '#0B0C16' : '#f7f6f9'}
            ariaLabel="DayZero partner logos"
            style={{ color: '#88709e' }}
          />
        </section>

        <TrustSection />
        <Problem />
        <HowItWorks />
        <Benefits />
        <Recruiters />
        
        <CTA
          onStartNowClick={() => triggerModal('registration', 'Get Started')}
          onDemoClick={() => triggerModal('registration', 'Request Demo')}
        />
        
        <Footer onSocialClick={() => showToast('Social page coming soon', 'success')} />
      </div>

      <RegistrationModal
        isOpen={activeModal === 'registration'}
        onClose={() => setActiveModal(null)}
        title={modalTitle}
      />

      <AuthModal
        isOpen={activeModal === 'auth-login' || activeModal === 'auth-signup'}
        onClose={() => setActiveModal(null)}
        initialMode={activeModal === 'auth-signup' ? 'signup' : 'login'}
        showToast={showToast}
        onNavigate={onNavigate}
      />

      {/* Toast Messages */}
      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 110000,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`toast-message ${toast.type} show`}
            onClick={() => removeToast(toast.id)}
            style={{ 
              position: 'relative', 
              bottom: 'auto', 
              right: 'auto', 
              margin: 0,
              cursor: 'pointer' 
            }}
          >
            <span className="toast-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
              {toast.type === 'success' ? <CheckCircle2 size={16} color="#10b981" /> : <XCircle size={16} color="#ef4444" />}
            </span>
            <span>{toast.message}</span>
            <div className="toast-progress"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
