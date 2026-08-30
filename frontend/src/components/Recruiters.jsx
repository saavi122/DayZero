import { useEffect, useRef, useState } from 'react';

const Recruiters = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [barWidths, setBarWidths] = useState({ w1: '0%', w2: '0%', w3: '0%' });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setBarWidths({ w1: '92%', w2: '85%', w3: '74%' });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isRevealed]);

  return (
    <section 
      ref={sectionRef} 
      className={`recruiters-section ${isRevealed ? 'revealed' : ''}`} 
      id="recruiters"
    >
      <div className="container recruiters-inner">
        <div className="recruiters-content">
          <p className="section-tag">For Recruiters</p>
          <h2>For Recruiters and Hiring Teams</h2>
          <p>
            DayZero empowers recruiters to make smarter, faster, and fairer hiring
            decisions with real performance data.
          </p>

          <ul className="recruiter-list">
            <li>Identify job-ready talent</li>
            <li>Compare candidates using real data</li>
            <li>Improve hiring efficiency</li>
            <li>Reduce poor hiring decisions</li>
          </ul>
        </div>

        <div className="recruiters-dashboard">
          <div className="rec-dashboard-row">
            <div className="rec-dashboard-metric">
              <p className="dashboard-label">Readiness Score</p>
              <div className="rec-progress-bar-bg">
                <div 
                  className="rec-progress-bar1" 
                  style={{ width: barWidths.w1, transition: 'width 1.2s ease' }}
                ></div>
              </div>
              <p className="dashboard-meta">92 / 100</p>
            </div>

            <div className="rec-dashboard-metric">
              <p className="dashboard-label accent">Adaptability</p>
              <div className="rec-progress-bar-bg">
                <div 
                  className="rec-progress-bar2" 
                  style={{ width: barWidths.w2, transition: 'width 1.2s ease' }}
                ></div>
              </div>
              <p className="dashboard-meta">85 / 100</p>
            </div>
          </div>

          <div className="rec-dashboard-row">
            <div className="rec-dashboard-metric">
              <p className="dashboard-label">Collaboration</p>
              <div className="rec-progress-bar-bg">
                <div 
                  className="rec-progress-bar3" 
                  style={{ width: barWidths.w3, transition: 'width 1.2s ease' }}
                ></div>
              </div>
              <p className="dashboard-meta">74 / 100</p>
            </div>

            <div className="rec-dashboard-score">
              <p className="dashboard-label">Shortlist Insights</p>
              <h3 className="dashboard-score">Top 5%</h3>
            </div>
          </div>

          <div className="rec-dashboard-row">
            <div className="rec-dashboard-metric full-width">
              <p className="dashboard-label">Mock Evaluation Summary</p>
              <p className="dashboard-meta">
                Excellent problem-solving, high adaptability, and strong collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recruiters;
