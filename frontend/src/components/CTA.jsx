import { useEffect, useRef, useState } from 'react';

const CTA = ({ onStartNowClick, onDemoClick }) => {
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
      className={`final-cta-section ${isRevealed ? 'revealed' : ''}`} 
      id="get-started"
    >
      <div className="container final-cta-box">
        <p className="section-tag">Get Started</p>
        <h2 className="final-cta-title">Upgrade Hiring with Real Performance Data.</h2>
        <p className="final-cta-sub">
          Move beyond resumes and evaluate candidates through structured,
          skill-based simulations.
        </p>

        <div className="final-cta-btns">
          <a 
            href="#get-started" 
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              onStartNowClick();
            }}
            style={{ cursor: 'pointer' }}
          >
            Start Now
          </a>
          
          <a 
            href="#demo" 
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              onDemoClick();
            }}
            style={{ cursor: 'pointer' }}
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
