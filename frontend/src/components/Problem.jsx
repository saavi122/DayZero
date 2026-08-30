import { useEffect, useRef, useState } from 'react';

const Problem = () => {
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
      className={`problem-section ${isRevealed ? 'revealed' : ''}`}
    >
      <div className="container">
        <div className="section-heading">
          <p className="section-tag">The Problem</p>
          <h2>Why Traditional Hiring Falls Short</h2>
          <p>
            Traditional recruitment methods often fail to measure practical ability,
            adaptability, and collaboration in real work conditions.
          </p>
        </div>

        <div className="problem-cards">
          <div className="problem-card">
            <div className="problem-icon">
              {/* Document SVG */}
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            </div>
            <h3>Resumes do not reflect actual performance</h3>
            <p>Paper credentials rarely show true skills or adaptability in real work.</p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">
              {/* Hourglass Timer SVG */}
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6v6h12v-6h-.01L18 16l-4-4 4-4-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zM8 4h8v3.5l-4 4-4-4V4z"/>
              </svg>
            </div>
            <h3>Interviews provide limited assessment time</h3>
            <p>Short interviews cannot reveal how candidates solve real challenges.</p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">
              {/* Search Glass SVG */}
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
            <h3>Traditional hiring misses capable talent</h3>
            <p>Many skilled candidates are overlooked due to resume bias or limited signals.</p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">
              {/* Chart SVG */}
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M5 19.23h14v2H5zm0-4.62h3.5v3.46H5zm5.25-4.62h3.5v8.08h-3.5zm5.25-4.61H19v12.69h-3.5z"/>
              </svg>
            </div>
            <h3>Companies need stronger hiring signals</h3>
            <p>Teams need data-driven insights, not guesswork.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
