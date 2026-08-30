import { useState, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ArrowRight, 
  X 
} from 'lucide-react';

const APPROVED_RECRUITER_DOMAINS = [
  "google.com", "microsoft.com", "amazon.com", "apple.com", "meta.com",
  "facebook.com", "netflix.com", "adobe.com", "tesla.com", "linkedin.com",
  "uber.com", "airbnb.com", "spotify.com", "slack.com", "salesforce.com",
  "ibm.com", "oracle.com", "cisco.com", "intel.com", "qualcomm.com",
  "vmware.com", "redhat.com",
];

const BLOCKED_PERSONAL_PROVIDERS = [
  "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com",
  "proton.me", "live.com", "aol.com"
];

const KNOWN_COMPANIES = {
  google: "Google",
  microsoft: "Microsoft",
  amazon: "Amazon",
  openai: "OpenAI",
  apple: "Apple",
  meta: "Meta",
  netflix: "Netflix",
  adobe: "Adobe",
  tesla: "Tesla",
  linkedin: "LinkedIn",
  gmail: "Gmail",
  yahoo: "Yahoo",
  outlook: "Outlook",
  hotmail: "Hotmail"
};

function parseRecruiterEmail(email) {
  if (!email) return null;
  email = email.trim().toLowerCase();
  
  let companyName = "";
  let name = "";
  
  if (email.includes("@")) {
    const parts = email.split("@");
    const username = parts[0];
    const domain = parts[1];
    
    const domainParts = domain.split(".");
    if (domainParts.length >= 2) {
      companyName = domainParts[0];
    } else {
      companyName = domain;
    }
    
    const cleanUsername = username.replace(/[0-9]+/g, "").replace(/[._-]+/g, " ").trim();
    const nameParts = cleanUsername.split(" ");
    name = nameParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
  } else if (email.endsWith(".ac.in")) {
    const parts = email.split(".");
    if (parts.length < 4) {
      return null;
    }
    companyName = parts[parts.length - 3];
    const nameParts = parts.slice(0, parts.length - 3);
    const cleanNameParts = nameParts.map(p => p.replace(/[0-9]+/g, "").replace(/[._-]+/g, " ").trim());
    name = cleanNameParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
  } else {
    return null;
  }
  
  if (!name) name = "Recruiter";
  if (!companyName) companyName = "Enterprise";
  
  const companyKey = companyName.toLowerCase();
  const displayCompany = KNOWN_COMPANIES[companyKey] || (companyName.charAt(0).toUpperCase() + companyName.slice(1));
  
  const nameParts = name.trim().split(/\s+/);
  let initials = "";
  if (nameParts.length >= 2) {
    initials = nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0);
  } else if (nameParts.length === 1) {
    initials = nameParts[0].charAt(0) + (nameParts[0].charAt(1) || "");
  }
  initials = initials.toUpperCase();
  
  return {
    name: name.trim(),
    initials: initials,
    companyName: displayCompany,
    companyId: companyKey,
    email: email
  };
}

const AuthModal = ({ isOpen, onClose, initialMode = 'login', showToast, onNavigate }) => {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'

  const navigateTo = (targetPath) => {
    localStorage.setItem('dayzero_current_route', targetPath);
    if (onNavigate) {
      onNavigate(targetPath);
    } else {
      const isGhPages = window.location.pathname.includes('/DayZero');
      const prefix = isGhPages ? '/DayZero' : '';
      window.location.href = prefix + targetPath;
    }
  };
  const [role, setRole] = useState('user'); // 'user' | 'recruiter'
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailWarning, setEmailWarning] = useState({ text: '', type: '' });

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setName('');
      setEmail('');
      setPassword('');
      setShowPassword(false);
      setIsLoading(false);
      setEmailWarning({ text: '', type: '' });
    }
  }, [isOpen, initialMode]);

  useEffect(() => {
    if (role === 'recruiter' && email) {
      const profile = parseRecruiterEmail(email);
      if (profile) {
        setEmailWarning({
          text: `Official ID for ${profile.companyName} detected`,
          type: 'success'
        });
      } else {
        setEmailWarning({
          text: `Enter any company email (e.g., recruiter@company.com)`,
          type: 'info'
        });
      }
    } else if (role === 'recruiter') {
      setEmailWarning({
        text: `Recruiter access mode (e.g. alex@google.com)`,
        type: 'info'
      });
    } else {
      setEmailWarning({ text: '', type: '' });
    }
  }, [role, email]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('auth-overlay')) {
      onClose();
    }
  };

  const executeCandidateLogin = (targetEmail, targetName) => {
    setIsLoading(true);
    const emailLower = (targetEmail || '').trim().toLowerCase();

    // Check if candidate email was invited by recruiter
    let invitedList = [];
    try {
      invitedList = JSON.parse(localStorage.getItem('dayzero_invited_candidates')) || [];
    } catch {}

    let recruiterList = [];
    try {
      recruiterList = JSON.parse(localStorage.getItem('dayzero_recruiter_candidates')) || [];
    } catch {}

    const matchInvite = invitedList.find(c => c.email && c.email.toLowerCase() === emailLower) ||
                        recruiterList.find(c => c.email && c.email.toLowerCase() === emailLower);

    let userData;
    if (matchInvite) {
      // Invited Candidate: Unlocks their specific company assessment project!
      userData = {
        name: matchInvite.name || targetName || emailLower.split('@')[0],
        email: emailLower,
        role: "candidate",
        isInvited: true,
        companyId: matchInvite.companyId || "google",
        company: matchInvite.companyName || "LinkedIn",
        companyName: matchInvite.companyName || "LinkedIn",
        invitedProject: {
          id: matchInvite.projectId || "ai-resume-screener",
          title: matchInvite.projectTitle || "AI Resume Screener",
          description: matchInvite.projectDescription || "Company technical assessment project assigned by recruiter.",
          techStack: matchInvite.techStack || ['React', 'Python', 'OpenAI'],
          time: matchInvite.timeDuration || matchInvite.time || '45 mins'
        },
        initials: (matchInvite.name || 'Candidate').split(' ').map(x => x[0]).join('').slice(0, 2)
      };

      localStorage.setItem('dayzero_task_id', userData.invitedProject.id);
      localStorage.setItem('dayzero_selected_task_details', JSON.stringify({
        id: userData.invitedProject.id,
        company: userData.company,
        title: userData.invitedProject.title,
        label: userData.invitedProject.title,
        role: matchInvite.role || 'Frontend Engineer',
        difficulty: 'Medium',
        description: userData.invitedProject.description,
        skills: userData.invitedProject.techStack,
        time: matchInvite.timeDuration || matchInvite.time || '45 mins'
      }));

      showToast(`Welcome ${userData.name}! Loaded assigned company project: ${userData.invitedProject.title}`, "success");
    } else {
      // Demo Candidate: 1 demo workspace open, rest locked
      const profile = parseRecruiterEmail(targetEmail) || { name: targetName || 'Astra Chen', email: targetEmail || 'astra@dayzero.io', initials: 'AC' };
      userData = {
        name: targetName || profile.name || "Astra Chen",
        email: targetEmail || "astra@dayzero.io",
        role: "candidate",
        isInvited: false,
        companyId: "demo-workspace",
        company: "Demo Workspace",
        companyName: "Demo Workspace",
        initials: profile.initials || "AC"
      };

      showToast(`Logged into Demo Workspace. 1 simulation room open, sign up to unlock company projects!`, "info");
    }

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", "candidate");
    localStorage.setItem("userName", userData.name);

    onClose();
    setTimeout(() => {
      navigateTo('/dashboard');
    }, 400);
  };

  const executeRecruiterLogin = (targetEmail) => {
    setIsLoading(true);
    const emailToUse = targetEmail || 'saavi@linked.in';
    const profile = parseRecruiterEmail(emailToUse) || { name: 'Saavi', companyName: 'LinkedIn', companyId: 'linkedin', email: 'saavi@linked.in', initials: 'SL' };
    
    const mockAuth = {
      recruiterName: profile.name,
      recruiterInitials: profile.initials,
      recruiterEmail: profile.email,
      companyName: profile.companyName,
      companyId: profile.companyId,
      role: "Senior Recruiter",
      avatar: "",
      stats: {
        totalProjects: 4,
        totalCandidates: 38,
        activeSimulations: 2,
        teamSimulations: 1,
        individualSimulations: 1,
        hiringSuccessRate: "94%",
        activeSessions: 1
      }
    };

    showToast(`Welcome back, ${profile.name} (${profile.companyName})!`, "success");
    localStorage.setItem("recruiter", JSON.stringify(mockAuth));
    localStorage.setItem("user", JSON.stringify({
      name: profile.name,
      email: profile.email,
      role: "recruiter",
      companyId: profile.companyId,
      companyName: profile.companyName
    }));
    localStorage.setItem("role", "recruiter");

    onClose();
    setTimeout(() => {
      navigateTo('/recruiter');
    }, 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role === 'recruiter') {
      executeRecruiterLogin(email || 'alex@google.com');
      return;
    }

    executeCandidateLogin(email || 'astra@dayzero.io', name);
  };

  return (
    <div 
      className="modal-overlay auth-overlay active" 
      onClick={handleOverlayClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100000,
        background: 'rgba(11, 12, 22, 0.75)',
        backdropFilter: 'blur(12px)'
      }}
    >
      <div 
        className="auth-content"
        style={{
          width: '760px',
          maxWidth: '95%',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
          border: '1px solid var(--border-subtle, rgba(159, 134, 181, 0.25))',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button 
          className="modal-close" 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: 'rgba(159, 134, 181, 0.15)',
            border: '1px solid rgba(159, 134, 181, 0.25)',
            color: 'inherit',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          title="Close Modal"
        >
          <X size={16} />
        </button>

        {/* Left Pane: Branding & Demo Shortcuts */}
        <div className="auth-left">
          <div>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(159, 134, 181, 0.18)',
                border: '1px solid rgba(159, 134, 181, 0.3)',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#D5C7E6',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              DayZero Simulation OS
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px', color: '#F2EFF9', lineHeight: 1.25 }}>
              {role === 'recruiter' 
                ? (mode === 'login' ? "Welcome Recruiter" : "Hire Job-Ready Talent")
                : (mode === 'login' ? "Experience Work Before Day One" : "Build Verified Proof of Work")}
            </h3>

            <p style={{ fontSize: '0.85rem', color: '#ADA6BE', lineHeight: 1.5, marginBottom: '20px' }}>
              {role === 'recruiter'
                ? "Evaluate candidates in realistic live sprint rooms with verified SkillRecord signals."
                : "Complete real-world tasks inside live simulated environments and showcase your execution."}
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#D5C7E6' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={14} color="#10b981" /> Practical Role Simulations
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={14} color="#10b981" /> Verified SkillRecord Profiles
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={14} color="#10b981" /> Unbiased Performance Signals
              </li>
            </ul>
          </div>

          {/* Instant Demo Access Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9F86B5' }}>
              1-Click Demo Sandbox
            </div>
            
            <button
              type="button"
              onClick={() => executeCandidateLogin('astra@dayzero.io', 'Astra Chen')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: 600,
                padding: '9px 12px',
                borderRadius: '10px',
                background: 'rgba(159, 134, 181, 0.16)',
                border: '1px solid rgba(159, 134, 181, 0.3)',
                color: '#F2EFF9',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <User size={14} color="#9F86B5" />
              <span>Candidate Demo Workspace</span>
            </button>

            <button
              type="button"
              onClick={() => executeRecruiterLogin('saavi@linked.in')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: 600,
                padding: '9px 12px',
                borderRadius: '10px',
                background: 'rgba(49, 42, 68, 0.4)',
                border: '1px solid rgba(159, 134, 181, 0.2)',
                color: '#F2EFF9',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Briefcase size={14} color="#9F86B5" />
              <span>Recruiter Demo (saavi@linked.in)</span>
            </button>
          </div>
        </div>

        {/* Right Pane: Interactive Form Controls */}
        <div className="auth-right">
          {/* User vs Recruiter Segmented Toggle */}
          <div 
            style={{
              display: 'flex',
              background: 'rgba(159, 134, 181, 0.12)',
              borderRadius: '12px',
              padding: '4px',
              marginBottom: '20px',
              border: '1px solid rgba(159, 134, 181, 0.18)'
            }}
          >
            <button 
              type="button"
              className={`role-btn ${role === 'user' ? 'active' : ''}`}
              onClick={() => setRole('user')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '9px',
                border: 'none',
                background: role === 'user' ? '#312A44' : 'transparent',
                color: role === 'user' ? '#ffffff' : 'inherit',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <User size={14} />
              <span>Candidate</span>
            </button>
            
            <button 
              type="button"
              className={`role-btn ${role === 'recruiter' ? 'active' : ''}`}
              onClick={() => setRole('recruiter')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '9px',
                border: 'none',
                background: role === 'recruiter' ? '#312A44' : 'transparent',
                color: role === 'recruiter' ? '#ffffff' : 'inherit',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <Briefcase size={14} />
              <span>Recruiter</span>
            </button>
          </div>

          {/* Mode Switcher: Login vs Sign Up */}
          <div 
            style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '20px',
              borderBottom: '1px solid rgba(159, 134, 181, 0.15)',
              paddingBottom: '8px'
            }}
          >
            <button 
              type="button"
              onClick={() => setMode('login')}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '14px',
                fontWeight: mode === 'login' ? 800 : 500,
                color: mode === 'login' ? 'var(--rec-text, #312A44)' : 'var(--rec-muted, #847D94)',
                cursor: 'pointer',
                position: 'relative',
                paddingBottom: '4px'
              }}
            >
              Log In
              {mode === 'login' && (
                <span style={{ position: 'absolute', bottom: '-9px', left: 0, right: 0, height: '2px', background: '#88709e', borderRadius: '2px' }} />
              )}
            </button>

            <button 
              type="button"
              onClick={() => setMode('signup')}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '14px',
                fontWeight: mode === 'signup' ? 800 : 500,
                color: mode === 'signup' ? 'var(--rec-text, #312A44)' : 'var(--rec-muted, #847D94)',
                cursor: 'pointer',
                position: 'relative',
                paddingBottom: '4px'
              }}
            >
              Sign Up
              {mode === 'signup' && (
                <span style={{ position: 'absolute', bottom: '-9px', left: 0, right: 0, height: '2px', background: '#88709e', borderRadius: '2px' }} />
              )}
            </button>
          </div>

          {/* Form */}
          <form className="modal-form auth-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {mode === 'signup' && (
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 40px',
                    borderRadius: '10px',
                    border: '1px solid rgba(159, 134, 181, 0.25)',
                    background: 'rgba(159, 134, 181, 0.05)',
                    color: 'inherit',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>
            )}

            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              <input 
                type="email" 
                placeholder={role === 'recruiter' ? "Company Email (e.g. alex@google.com)" : "Email Address"} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  borderRadius: '10px',
                  border: '1px solid rgba(159, 134, 181, 0.25)',
                  background: 'rgba(159, 134, 181, 0.05)',
                  color: 'inherit',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Email validation info */}
            {emailWarning.text && (
              <div 
                style={{
                  fontSize: '11px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  background: 'rgba(159, 134, 181, 0.1)',
                  color: 'var(--accent, #88709e)',
                  border: '1px solid rgba(159, 134, 181, 0.2)',
                  fontWeight: 600
                }}
              >
                <span>{emailWarning.text}</span>
              </div>
            )}

            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 40px',
                  borderRadius: '10px',
                  border: '1px solid rgba(159, 134, 181, 0.25)',
                  background: 'rgba(159, 134, 181, 0.05)',
                  color: 'inherit',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'inherit',
                  opacity: 0.6,
                  cursor: 'pointer'
                }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary full-width"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: '#312A44',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{isLoading ? "Logging in..." : (mode === 'login' ? `Log In as ${role === 'recruiter' ? 'Recruiter' : 'Candidate'}` : "Create Account")}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <p style={{ marginTop: '16px', fontSize: '12px', textAlign: 'center', color: 'var(--rec-muted, #847D94)' }}>
            <span>{mode === 'login' ? "Don't have an account?" : "Already have an account?"}</span>
            <button 
              type="button"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#88709e',
                fontWeight: 700,
                marginLeft: '6px',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {mode === 'login' ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
export { APPROVED_RECRUITER_DOMAINS };
