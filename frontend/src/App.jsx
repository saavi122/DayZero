import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import LandingPage from './components/LandingPage';
import Dashboard from './pages/Dashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import SimulationRoom from './pages/SimulationRoom';
import ResultsPage from './pages/ResultsPage';

function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [currentPath, setCurrentPath] = useState(() => {
    const url = window.location.pathname + window.location.search + window.location.hash;
    const storedRoute = localStorage.getItem('dayzero_current_route');
    
    if (url.toLowerCase().includes('results') || url.toLowerCase().includes('skillrecord') || url.toLowerCase().includes('evaluation')) {
      return '/results';
    }
    if (storedRoute && (storedRoute.includes('results') || storedRoute.includes('skillrecord') || storedRoute.includes('evaluation'))) {
      return '/results';
    }
    return url || '/dashboard';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname + window.location.search + window.location.hash;
      setCurrentPath(path);
      localStorage.setItem('dayzero_current_route', path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    localStorage.setItem('dayzero_current_route', path);
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const pathLower = currentPath.toLowerCase();

  if (pathLower.includes('simulation')) {
    return <SimulationRoom onNavigate={navigate} />;
  }

  if (pathLower.includes('recruiter')) {
    return <RecruiterDashboard onNavigate={navigate} />;
  }

  if (pathLower.includes('results') || pathLower.includes('skillrecord') || pathLower.includes('evaluation')) {
    return <ResultsPage onNavigate={navigate} />;
  }

  if (pathLower.includes('dashboard')) {
    return <Dashboard onNavigate={navigate} />;
  }

  return (
    <>
      <LoadingScreen onComplete={() => setIsIntroComplete(true)} />
      <LandingPage isRevealed={isIntroComplete} onNavigate={navigate} />
    </>
  );
}

export default App;
