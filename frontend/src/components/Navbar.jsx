import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const Navbar = ({ theme, onThemeToggle, onLoginClick, onSignupClick, onDemoClick, isRevealed }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'translateY(0)' : 'translateY(-10px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div className="container navbar-inner">
        <a href="#product" className="logo">DayZero</a>

        <div className="nav-links">
          <a href="#product" className="nav-link">Product</a>
          <a href="#how" className="nav-link">How It Works</a>
          <a href="#benefits" className="nav-link">Benefits</a>
          <a href="#recruiters" className="nav-link">Recruiters</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        <div className="nav-cta">
          <button 
            className="theme-btn" 
            id="themeToggleBtn"
            onClick={onThemeToggle}
            style={{
              background: 'transparent',
              border: theme === 'dark' ? '1px solid rgba(124, 92, 255, 0.25)' : '1px solid #cbd5e1',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              marginRight: '8px',
              transition: 'all 0.2s ease',
              color: theme === 'dark' ? '#E6ECFF' : '#334155',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
            <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>
          
          <a 
            href="#login" 
            className="nav-link login-link" 
            onClick={(e) => {
              e.preventDefault();
              onLoginClick();
            }}
            style={{ fontWeight: 600, color: '#88709e', cursor: 'pointer' }}
          >
            Log In
          </a>
          
          <a 
            href="#signup" 
            className="btn btn-primary auth-btn"
            onClick={(e) => {
              e.preventDefault();
              onSignupClick();
            }}
            style={{ cursor: 'pointer' }}
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
