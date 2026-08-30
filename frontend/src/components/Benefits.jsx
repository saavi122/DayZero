import { useEffect, useRef, useState } from 'react';

const Benefits = () => {
  const [isRevealed, setIsRevealed] = useState(false);
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

  return (
    <section 
      ref={sectionRef} 
      className={`benefits-section ${isRevealed ? 'revealed' : ''}`} 
      id="benefits"
    >
      <div className="container">
        <div className="section-heading">
          <span className="section-tag">Key Advantages</span>
          <h2>Key Benefits for Teams</h2>
          <p>Transform candidate evaluation with data-driven insights and verified proof of execution.</p>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
              </svg>
            </div>
            <h3>Skill-based hiring decisions</h3>
            <p>Make decisions based on demonstrated ability, not just claims.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
              </svg>
            </div>
            <h3>Faster shortlisting process</h3>
            <p>Identify top talent quickly with AI-powered evaluation.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </div>
            <h3>Better quality candidates</h3>
            <p>Select candidates who perform well in practical tasks.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
            </div>
            <h3>Reduced hiring risk</h3>
            <p>Minimize poor hiring outcomes through stronger signals.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 8 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </div>
            <h3>Fair opportunities for all applicants</h3>
            <p>Create a more objective and inclusive hiring process.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
