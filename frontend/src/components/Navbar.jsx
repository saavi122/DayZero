import { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Navbar = ({ theme, onThemeToggle, onLoginClick, onSignupClick, onDemoClick, isRevealed }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      <div className="container navbar-inner">
        <a href="#product" className="logo">DayZero</a>

        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          <a href="#product" className="nav-link">Product</a>
          <a href="#how" className="nav-link">How It Works</a>
          <a href="#benefits" className="nav-link">Benefits</a>
          <a href="#recruiters" className="nav-link">Recruiters</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        {/* Desktop CTA */}
        <div className="nav-cta desktop-only">
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

        {/* Mobile Hamburger Toggle Button */}
        <button 
          className="mobile-nav-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div className="mobile-menu-links">
            <a href="#product" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Product</a>
            <a href="#how" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
            <a href="#benefits" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Benefits</a>
            <a href="#recruiters" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Recruiters</a>
            <a href="#contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          </div>

          <div className="mobile-menu-actions">
            <button 
              className="mobile-theme-btn" 
              onClick={() => {
                onThemeToggle();
              }}
            >
              {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
              <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>

            <a 
              href="#login" 
              className="btn btn-secondary mobile-login-btn"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                onLoginClick();
              }}
              style={{ textAlign: 'center' }}
            >
              Log In
            </a>

            <a 
              href="#signup" 
              className="btn btn-primary mobile-signup-btn"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                onSignupClick();
              }}
              style={{ textAlign: 'center' }}
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
