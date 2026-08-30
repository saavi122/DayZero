import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import RecruiterSidebar from '../components/recruiter/RecruiterSidebar';
import RecruiterHeader from '../components/recruiter/RecruiterHeader';
import RecruiterStats from '../components/recruiter/RecruiterStats';
import CandidateList from '../components/recruiter/CandidateList';
import CandidateDetailModal from '../components/recruiter/CandidateDetailModal';
import ChallengeBuilder from '../components/recruiter/ChallengeBuilder';
import AnalyticsPanel from '../components/recruiter/AnalyticsPanel';
import InviteCandidateModal from '../components/recruiter/InviteCandidateModal';
import CreateProjectModal from '../components/recruiter/CreateProjectModal';
import ActiveSimulationsPanel from '../components/recruiter/ActiveSimulationsPanel';
import '../styles/recruiter.css';

const initialProjects = [
  {
    id: 1,
    title: 'AI Resume Screener',
    status: 'Active',
    description: 'Automate initial candidate screening using LLMs to extract key skill scores.',
    techStack: ['React', 'Python', 'OpenAI', 'MongoDB'],
    deadline: '2026-06-30',
    created: '2026-05-15',
    candidatesCount: 14
  },
  {
    id: 2,
    title: 'Mobile Dev Candidate Tracker',
    status: 'Completed',
    description: 'Custom internal applicant tracking system for the mobile engineering team.',
    techStack: ['React Native', 'Express', 'Firebase'],
    deadline: '2026-06-10',
    created: '2026-04-01',
    candidatesCount: 8
  }
];

const initialCandidates = [
  { 
    id: 1, 
    name: 'Reha Yadav', 
    college: 'IIT Guwahati', 
    role: 'Frontend Engineer', 
    score: 94, 
    progress: '82%', 
    topSkill: 'Prioritization', 
    status: 'Shortlisted', 
    lastActive: '3m ago',
    skills: ['React', 'TypeScript', 'CSS', 'System Design']
  },
  { 
    id: 2, 
    name: 'Priya Mehta', 
    college: 'BITS Pilani', 
    role: 'Backend Engineer', 
    score: 86, 
    progress: '68%', 
    topSkill: 'Leadership', 
    status: 'Shortlisted', 
    lastActive: '16m ago',
    skills: ['Node.js', 'PostgreSQL', 'Docker', 'Go']
  },
  { 
    id: 3, 
    name: 'Tanvi Singh', 
    college: 'Manipal University', 
    role: 'Frontend Engineer', 
    score: 79, 
    progress: '56%', 
    topSkill: 'Leadership', 
    status: 'On Track', 
    lastActive: '1h ago',
    skills: ['React', 'JavaScript', 'UI Design']
  },
  { 
    id: 4, 
    name: 'Sameer Khan', 
    college: 'COEP Pune', 
    role: 'Fullstack Engineer', 
    score: 76, 
    progress: '52%', 
    topSkill: 'Problem Solving', 
    status: 'On Track', 
    lastActive: '46m ago',
    skills: ['Python', 'React', 'MongoDB']
  },
  { 
    id: 5, 
    name: 'Rohit Nair', 
    college: 'NSIT Delhi', 
    role: 'Data Analyst', 
    score: 74, 
    progress: '44%', 
    topSkill: 'Execution', 
    status: 'On Track', 
    lastActive: '2h ago',
    skills: ['Python', 'SQL', 'Tableau']
  }
];

const RecruiterDashboard = ({ onNavigate }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Projects State
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('dayzero_recruiter_projects');
      return saved ? JSON.parse(saved) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  // Candidates State
  const [candidates, setCandidates] = useState(() => {
    try {
      const saved = localStorage.getItem('dayzero_recruiter_candidates');
      return saved ? JSON.parse(saved) : initialCandidates;
    } catch {
      return initialCandidates;
    }
  });

  // Recruiter Auth Profile State
  const [recruiter, setRecruiter] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('recruiter')) || null;
    } catch {
      return null;
    }
  });

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

  // Persist Projects
  useEffect(() => {
    localStorage.setItem('dayzero_recruiter_projects', JSON.stringify(projects));
  }, [projects]);

  // Persist Candidates
  useEffect(() => {
    localStorage.setItem('dayzero_recruiter_candidates', JSON.stringify(candidates));
  }, [candidates]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const handleAddProject = (newProject) => {
    setProjects(prev => [newProject, ...prev]);
  };

  const handleDeleteProject = (projectId) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    showToast('Project deleted', 'info');
  };

  const handleAddCandidate = (newCandidate) => {
    setCandidates(prev => [newCandidate, ...prev]);
  };

  const handleToggleShortlist = (cand) => {
    if (!cand) return;
    const isCurrentlyShortlisted = cand.status === 'Shortlisted';
    const newStatus = isCurrentlyShortlisted ? 'On Track' : 'Shortlisted';
    
    setCandidates(prev => prev.map(c => String(c.id) === String(cand.id) ? { ...c, status: newStatus } : c));

    if (selectedCandidate && String(selectedCandidate.id) === String(cand.id)) {
      setSelectedCandidate(prev => (prev ? { ...prev, status: newStatus } : null));
    }

    if (isCurrentlyShortlisted) {
      showToast(`Removed ${cand.name} from Shortlist`, 'info');
    } else {
      showToast(`✨ ${cand.name} added to Shortlist!`, 'success');
    }
  };

  const handleScheduleInterview = (cand) => {
    if (!cand) return;
    const newStatus = 'Interview Scheduled';

    setCandidates(prev => prev.map(c => String(c.id) === String(cand.id) ? { ...c, status: newStatus } : c));

    if (selectedCandidate && String(selectedCandidate.id) === String(cand.id)) {
      setSelectedCandidate(prev => (prev ? { ...prev, status: newStatus } : null));
    }

    showToast(`📅 Interview scheduled with ${cand.name}! Visible on Interviews page.`, 'success');
  };

  const handleThemeToggle = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogout = () => {
    localStorage.removeItem('recruiter');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.location.href = '/';
    }
  };

  const shortlistCount = candidates.filter(c => c.status === 'Shortlisted').length;
  const interviewCount = candidates.filter(c => c.status === 'Interview Scheduled' || c.status === 'Interview').length;

  return (
    <div className="recruiter-root" style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', position: 'relative' }}>
      {/* ═══ SIDEBAR ═══ */}
      <RecruiterSidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        recruiter={recruiter}
        onLogout={handleLogout}
        candidatesCount={candidates.length}
        shortlistCount={shortlistCount}
        interviewCount={interviewCount}
      />

      {/* ═══ MAIN CONTENT ═══ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: '100vh' }}>
        <RecruiterHeader
          theme={theme}
          onThemeToggle={handleThemeToggle}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onNavigate={onNavigate}
          onOpenInviteModal={() => setIsInviteModalOpen(true)}
          showToast={showToast}
        />

        <main className="recruiter-main">
          {/* Top Stats Overview Row */}
          <RecruiterStats 
            candidateCount={candidates.length} 
            avgScore={85} 
            activeSims={projects.filter(p => p.status === 'Active').length} 
          />
          
          {/* Main Active Tab Content View */}
          {(activeNav === 'dashboard' || activeNav === 'candidates' || activeNav === 'shortlist') && (
            <CandidateList
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              candidates={candidates}
              onSelectCandidate={setSelectedCandidate}
              onShortlist={handleToggleShortlist}
              onInterview={handleScheduleInterview}
              activeNav={activeNav}
            />
          )}

          {(activeNav === 'dashboard' || activeNav === 'projects') && (
            <ChallengeBuilder
              projects={projects}
              onOpenAddProject={() => setIsCreateProjectModalOpen(true)}
              onDeleteProject={handleDeleteProject}
              showToast={showToast}
              onNavigate={onNavigate}
              onOpenSimulationsControl={() => setActiveNav('interviews')}
            />
          )}

          {(activeNav === 'dashboard' || activeNav === 'interviews') && (
            <ActiveSimulationsPanel
              candidates={candidates}
              onNavigate={onNavigate}
              showToast={showToast}
            />
          )}

          {(activeNav === 'dashboard' || activeNav === 'analytics') && (
            <AnalyticsPanel />
          )}
        </main>
      </div>

      {/* Candidate Inspector Drawer (Image 1 & Image 2) */}
      <CandidateDetailModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onShortlist={handleToggleShortlist}
        onInterview={handleScheduleInterview}
      />

      {/* Create Technical Project Modal (Image 4) */}
      <CreateProjectModal
        isOpen={isCreateProjectModalOpen}
        onClose={() => setIsCreateProjectModalOpen(false)}
        onAddProject={handleAddProject}
        showToast={showToast}
      />

      {/* Invite Candidate Modal (Image 5) */}
      <InviteCandidateModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        projects={projects}
        onAddCandidate={handleAddCandidate}
        showToast={showToast}
      />

      {/* Toast Notifications */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 200000, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {toasts.map(toast => (
          <div 
            key={toast.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 18px',
              borderRadius: '12px',
              background: '#312A44',
              color: '#ffffff',
              boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
              fontSize: '13px',
              fontWeight: 600,
              border: '1px solid rgba(159, 134, 181, 0.3)'
            }}
          >
            {toast.type === 'success' && <CheckCircle2 size={16} color="#10b981" />}
            {toast.type === 'info' && <Info size={16} color="#4da3ff" />}
            {toast.type === 'error' && <AlertCircle size={16} color="#ef4444" />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
