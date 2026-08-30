import { useEffect, useRef, useState } from 'react';

const TrustSection = () => {
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
      className={`trust-section ${isRevealed ? 'revealed' : ''}`}
    >
      <div className="container">
        <div className="trust-strip">
          <div className="trust-item">
            <h4>Faster Hiring</h4>
            <p>Accelerate shortlisting with real performance insights.</p>
          </div>
          <div className="trust-item">
            <h4>Better Talent Quality</h4>
            <p>Evaluate practical skill, not just resume keywords.</p>
          </div>
          <div className="trust-item">
            <h4>Fairer Screening</h4>
            <p>Reduce bias with structured and simulation-based signals.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
