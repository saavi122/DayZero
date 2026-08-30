import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Sidebar from '../components/dashboard/Sidebar';
import TopBar from '../components/dashboard/TopBar';
import WorkspacePanel from '../components/dashboard/panels/WorkspacePanel';
import ProjectsPanel from '../components/dashboard/panels/ProjectsPanel';
import SchedulePanel from '../components/dashboard/panels/SchedulePanel';
import FilesPanel from '../components/dashboard/panels/FilesPanel';
import InsightsPanel from '../components/dashboard/panels/InsightsPanel';
import SkillRecordPanel from '../components/dashboard/panels/SkillRecordPanel';
import LeaderboardPanel from '../components/dashboard/panels/LeaderboardPanel';
import AchievementsPanel from '../components/dashboard/panels/AchievementsPanel';
import MessagesPanel from '../components/dashboard/panels/MessagesPanel';
import SettingsPanel from '../components/dashboard/panels/SettingsPanel';
import { ShieldCheck, Zap, Send, Bot, Sparkles, RotateCcw, Brain, History } from 'lucide-react';
import '../styles/dashboard.css';

const getPersonaAdvice = (persona, topicOrQuery, memory = []) => {
  const queryLower = topicOrQuery.toLowerCase().trim();

  // 1. Check if user is explicitly asking to recall past discussions or memory
  const memoryKeywords = ['memory', 'remember', 'recall', 'discussed', 'earlier', 'previous', 'decided', 'last time', 'history', 'before'];
  const isMemoryQuery = memoryKeywords.some(kw => queryLower.includes(kw));

  if (isMemoryQuery) {
    if (memory.length === 0) {
      return `I am keeping track of our sprint discussions in memory. We haven't recorded any past decisions yet. Ask me to help clarify your goal, build a plan, or prioritize tasks!`;
    }
    const recentTalks = memory.slice(-3).map(m => `• "${m.user}" → Advisor (${m.persona}): "${m.advice.substring(0, 90)}..."`).join('\n');
    return `Searching AI Memory (${memory.length} past talks stored):\n\n${recentTalks}\n\nWhat specific decision or strategy would you like to revisit?`;
  }

  // 2. Search memory if query relates to past topics (e.g. "goal", "strategy", "scope", "state")
  const matchingPastTurn = memory.slice().reverse().find(m => {
    const q = m.user.toLowerCase();
    return (queryLower.includes('goal') && q.includes('goal')) ||
           (queryLower.includes('strategy') && q.includes('strategy')) ||
           (queryLower.includes('scope') && q.includes('scope')) ||
           (queryLower.includes('priorit') && q.includes('priorit'));
  });

  let memoryNudge = "";
  if (matchingPastTurn) {
    memoryNudge = `\n\n(Memory Nudge: Recalling our earlier discussion on "${matchingPastTurn.user}", we noted to focus on: "${matchingPastTurn.advice.substring(0, 80)}...")`;
  }

  // Handle specific Chip actions
  if (topicOrQuery === 'Clarify Goal') {
    if (persona === 'Supportive') {
      return `Let's make the goal crystal clear: identify the single core requirement your recruiter or team needs most, and make sure that main path works smoothly without errors. What part feels most ambiguous right now?${memoryNudge}`;
    } else if (persona === 'Mentor') {
      return `To clarify your goal: define the input contract, target execution output, and system constraints. Avoid touching unrelated components until your core task logic is proven. What is your primary success metric?${memoryNudge}`;
    } else { // Founder
      return `Goal clarity check: focus strictly on shipping the end-to-end user value path. Strip out any secondary requirements. Does your current implementation deliver the core result?${memoryNudge}`;
    }
  }

  if (topicOrQuery === 'Build Strategy') {
    if (persona === 'Supportive') {
      return `Here is a stress-free 3-step strategy:\n1. Lock down default state values\n2. Wire up the primary click/event handler\n3. Run a quick manual test to confirm reactivity. Take it one step at a time!${memoryNudge}`;
    } else if (persona === 'Mentor') {
      return `Recommended Engineering Strategy:\n1. Establish clean data flow & state hierarchy\n2. Enforce type safety & edge-case guards\n3. Verify component lifecycle and unmount cleanups. What is your current architecture bottleneck?${memoryNudge}`;
    } else { // Founder
      return `MVP Execution Strategy:\n1. Build the minimum visible prototype in 10 mins\n2. Verify the core action works end-to-end\n3. Hold non-essential enhancements. Speed and execution discipline win!${memoryNudge}`;
    }
  }

  if (topicOrQuery === 'Prioritize Tasks') {
    if (persona === 'Supportive') {
      return `Let's prioritize together! Start with the highest-impact task that unblocks your team (e.g. core UI action or state sync). Once that's solid, you can handle minor styling touches.${memoryNudge}`;
    } else if (persona === 'Mentor') {
      return `Prioritization Framework:\n• High Urgency / High Impact: Critical state bugs & broken handlers\n• Medium: UI responsiveness & feedback\n• Low: Decorative styling. What task is currently blocking you?${memoryNudge}`;
    } else { // Founder
      return `Ruthless Prioritization:\nRank your task list by user impact. Drop any task that doesn't directly contribute to sprint completion. What is the #1 item on your list?${memoryNudge}`;
    }
  }

  if (topicOrQuery === 'Ask Hint') {
    if (persona === 'Supportive') {
      return `Hint: Check your local state initialization and handler bindings. Make sure you're updating state with fresh values and triggering re-renders cleanly. You've got this!${memoryNudge}`;
    } else if (persona === 'Mentor') {
      return `Technical Nudge: Inspect whether your state comparison is using exact types (e.g. String vs Number) and ensure event handlers aren't triggering silent promise rejections or stale closures.${memoryNudge}`;
    } else { // Founder
      return `Founder Hint: Don't spend 20 minutes debugging a complex component when a simpler inline state model achieves the exact same user result. Keep it lean!${memoryNudge}`;
    }
  }

  if (topicOrQuery === 'Reduce Scope') {
    if (persona === 'Supportive') {
      return `Scope Reduction Advice: It's completely okay to trim non-essential features! Focus on delivering 1-2 bulletproof features rather than 5 incomplete ones. What can we safely postpone?${memoryNudge}`;
    } else if (persona === 'Mentor') {
      return `Scope Control: Keep core logic, validation, and error guards intact, but defer non-critical visual polish or secondary tabs. What is your minimum viable scope?${memoryNudge}`;
    } else { // Founder
      return `Scope Cut Directive: Ship, narrow, or hold! Cut 50% of the optional UI embellishments right now and ensure the core transaction path is 100% operational.${memoryNudge}`;
    }
  }

  // Handle custom candidate text queries
  if (queryLower.includes('how') || queryLower.includes('what') || queryLower.includes('why') || queryLower.includes('help') || queryLower.includes('problem') || queryLower.includes('bug') || queryLower.includes('error')) {
    if (persona === 'Supportive') {
      return `I hear you! When tackling "${topicOrQuery}", break it down into 2 small steps: first, verify your state/props input; second, inspect the UI output. What specific behavior are you seeing right now?${memoryNudge}`;
    } else if (persona === 'Mentor') {
      return `To analyze "${topicOrQuery}": check your component lifecycle, verify state propagation, and inspect console warnings. Are you encountering an async timing issue or a state mismatch?${memoryNudge}`;
    } else {
      return `On "${topicOrQuery}": focus on the fastest path to resolution. Isolate the broken variable, fix it directly, and test the user flow immediately. What is the immediate blocker?${memoryNudge}`;
    }
  }

  // Generic fallback guidance
  if (persona === 'Supportive') {
    return `Advisor (${persona}): Understood. Let's work through "${topicOrQuery}" step-by-step. What outcome do you want to achieve first?${memoryNudge}`;
  } else if (persona === 'Mentor') {
    return `Advisor (${persona}): Analyzed "${topicOrQuery}". Focus on architectural soundness, state immutability, and clean error handling. What is your proposed approach?${memoryNudge}`;
  } else {
    return `Advisor (${persona}): Noted on "${topicOrQuery}". Keep your execution lean, prioritize speed, and validate the main user flow immediately. What's your immediate next move?${memoryNudge}`;
  }
};

const Dashboard = ({ onNavigate }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [activePanel, setActivePanel] = useState('panel-workspace');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileShow, setIsMobileShow] = useState(false);
  const [pressure, setPressure] = useState('Medium');
  const [persona, setPersona] = useState('Supportive'); // Supportive | Mentor | Founder
  const [isThinking, setIsThinking] = useState(false);
  const [user, setUser] = useState({
    name: 'Saavi',
    role: 'Frontend Engineer',
    company: 'GMAIL'
  });

  // AI Persistent Memory State across Refreshes
  const [aiMemory, setAiMemory] = useState(() => {
    try {
      const saved = localStorage.getItem('dayzero_sprint_console_memory');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dayzero_sprint_console_memory', JSON.stringify(aiMemory));
    } catch {}
  }, [aiMemory]);

  const [aiInput, setAiInput] = useState('');
  const [consoleMsgs, setConsoleMsgs] = useState([
    { type: 'hint', speaker: 'System', text: 'Sprint Console Online: AI Human Advisor ready with persistent conversation memory.' },
    { type: 'approval', speaker: 'Advisor (Supportive)', text: 'Hello! I am your Sprint Advisor. Ask me to help clarify your goal, build a plan, or search past memory.' }
  ]);

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

  const handleThemeToggle = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handlePressureToggle = () => {
    setPressure(prev => (prev === 'Medium' ? 'High' : prev === 'High' ? 'Low' : 'Medium'));
  };

  const handleRefreshTalks = () => {
    setConsoleMsgs([
      { type: 'hint', speaker: 'System', text: 'Chat view refreshed. Persistent AI Memory retained.' },
      { type: 'approval', speaker: `Advisor (${persona})`, text: `Conversations refreshed. I still hold ${aiMemory.length} past talks in my memory! Ask me anything or ask me to search past memory.` }
    ]);
  };

  const handleSendAiMsg = async (textToSend) => {
    const text = textToSend || aiInput;
    if (!text.trim() || isThinking) return;

    setConsoleMsgs(prev => [...prev, { type: 'user', speaker: 'You', text }]);
    setAiInput('');
    setIsThinking(true);

    const memoryContextString = aiMemory.length > 0 
      ? `Recent AI Memory:\n` + aiMemory.slice(-4).map(m => `[User: "${m.user}" | Advisor: "${m.advice}"]`).join('\n')
      : "No prior memory.";

    const systemPrompt = `You are a Senior Human Advisor & Sprint Mentor in DayZero (Persona: ${persona}). 
${memoryContextString}
Guidelines:
1. Act as a human advisor/mentor guiding a candidate during a coding assessment. 
2. Do NOT write full code solutions or act as an implementor. 
3. Search and reference past memory if the user asks about previous decisions.
4. Provide strategic advice, frameworks, prioritization tips, and ask 1 clarifying follow-up question.
5. Keep response concise (under 3-4 sentences).`;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          system_prompt: systemPrompt,
          model: 'default',
          temperature: 0.6
        })
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data?.choices?.[0]?.message?.content || data?.reply;
        if (replyText && !replyText.includes('I am here. Keep the next')) {
          setConsoleMsgs(prev => [
            ...prev,
            { type: 'approval', speaker: `Advisor (${persona})`, text: replyText }
          ]);
          setAiMemory(prev => [...prev, { persona, user: text, advice: replyText, timestamp: new Date().toISOString() }]);
          setIsThinking(false);
          return;
        }
      }
    } catch {}

    // Fallback to local intelligent persona advisor engine with memory search
    setTimeout(() => {
      const advice = getPersonaAdvice(persona, text, aiMemory);
      setConsoleMsgs(prev => [
        ...prev,
        { type: 'approval', speaker: `Advisor (${persona})`, text: advice }
      ]);
      setAiMemory(prev => [...prev, { persona, user: text, advice: advice, timestamp: new Date().toISOString() }]);
      setIsThinking(false);
    }, 500);
  };

  const handleLockedTaskRedirect = () => {
    if (onNavigate) {
      onNavigate('/?signup=true');
    } else {
      window.location.href = '/?signup=true';
    }
  };

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'panel-workspace':
        return <WorkspacePanel onSelectProject={() => setActivePanel('panel-projects')} onLockedTaskClick={handleLockedTaskRedirect} onNavigate={onNavigate} />;
      case 'panel-projects':
        return <ProjectsPanel onSelectProject={() => setActivePanel('panel-workspace')} onNavigate={onNavigate} />;
      case 'panel-calendar':
        return <SchedulePanel />;
      case 'panel-files':
        return <FilesPanel />;
      case 'panel-insights':
        return <InsightsPanel />;
      case 'panel-skillrecord':
        return <SkillRecordPanel user={user} />;
      case 'panel-leaderboard':
        return <LeaderboardPanel user={user} />;
      case 'panel-achievements':
        return <AchievementsPanel />;
      case 'panel-messages':
        return <MessagesPanel />;
      case 'panel-settings':
        return <SettingsPanel user={user} onUpdateUser={setUser} />;
      default:
        return <WorkspacePanel onSelectProject={() => setActivePanel('panel-projects')} onLockedTaskClick={handleLockedTaskRedirect} onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="dashboard-root">
      <div className="dashboard-app">
        <Sidebar
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileShow={isMobileShow}
          setIsMobileShow={setIsMobileShow}
          user={user}
          onLogout={() => onNavigate && onNavigate('/')}
        />

        <div className="main-shell">
          <TopBar
            theme={theme}
            onThemeToggle={handleThemeToggle}
            pressure={pressure}
            onPressureToggle={handlePressureToggle}
            onMobileMenuToggle={() => {
              setIsCollapsed(prev => !prev);
              setIsMobileShow(prev => !prev);
            }}
            onExitSimulation={() => onNavigate && onNavigate('/')}
          />

          <main className="dashboard-content-grid">
            <div className="center-panel">
              <AnimatePresence mode="wait">
                <React.Fragment key={activePanel}>
                  {renderActivePanel()}
                </React.Fragment>
              </AnimatePresence>
            </div>

            {/* Right Sprint Console */}
            <aside className="right-panel">
              <div className="console-card">
                <div className="console-header">
                  <div className="console-header-left">
                    <div className="console-avatar">OS</div>
                    <div className="console-title-wrap">
                      <h3>Sprint Console</h3>
                      <span className="console-subtitle">Human AI Advisor</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={handleRefreshTalks}
                      title="Refresh chat view (retains AI memory)"
                      style={{
                        background: 'var(--card-sub)',
                        border: '1px solid var(--border)',
                        color: 'var(--text)',
                        borderRadius: '8px',
                        padding: '5px 8px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <RotateCcw size={12} /> Refresh
                    </button>

                    <select 
                      className="console-dropdown"
                      value={persona}
                      onChange={(e) => setPersona(e.target.value)}
                      title="Select Advisor Persona"
                    >
                      <option value="Supportive">Supportive</option>
                      <option value="Mentor">Mentor</option>
                      <option value="Founder">Founder</option>
                    </select>
                  </div>
                </div>

                <div className="console-widgets">
                  <div className="n-widget">
                    <ShieldCheck size={14} color="#10b981" /> Persona: <strong>{persona}</strong>
                  </div>
                  <div className="n-widget" title={`${aiMemory.length} past talks stored in AI memory`}>
                    <Brain size={14} color="#9F86B5" /> Memory: <strong>{aiMemory.length} Talks</strong>
                  </div>
                </div>

                <div className="console-msgs">
                  {consoleMsgs.map((msg, i) => (
                    <div key={i} className={`console-msg-card ${msg.type}`}>
                      <p>
                        <strong>{msg.speaker || (msg.type === 'user' ? 'You:' : 'System:')}:</strong>{' '}
                        <span style={{ whiteSpace: 'pre-line' }}>{msg.text}</span>
                      </p>
                    </div>
                  ))}
                  {isThinking && (
                    <div className="console-msg-card system" style={{ opacity: 0.7, fontStyle: 'italic', background: 'var(--card-sub)' }}>
                      <p style={{ margin: 0, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Sparkles size={13} color="var(--accent)" /> AI Advisor is searching memory & formulating response...
                      </p>
                    </div>
                  )}
                </div>

                <div className="console-actions-wrap">
                  {['Clarify Goal', 'Build Strategy', 'Prioritize Tasks', 'Ask Hint', 'Reduce Scope'].map((chip) => (
                    <button 
                      key={chip} 
                      className="console-chip"
                      onClick={() => handleSendAiMsg(chip)}
                      disabled={isThinking}
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                <div className="console-input-bar">
                  <input
                    className="console-input"
                    type="text"
                    placeholder={`Ask your ${persona} advisor or ask "search memory"...`}
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendAiMsg()}
                    disabled={isThinking}
                  />
                  <button 
                    className="console-send-btn" 
                    onClick={() => handleSendAiMsg()}
                    disabled={isThinking || !aiInput.trim()}
                    style={{ opacity: (isThinking || !aiInput.trim()) ? 0.6 : 1 }}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
