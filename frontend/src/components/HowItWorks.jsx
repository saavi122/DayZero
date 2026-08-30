import { useEffect, useRef, useState } from 'react';

const HowItWorks = () => {
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
      className={`steps-section ${isRevealed ? 'revealed' : ''}`} 
      id="how"
    >
      <div className="container">
        <div className="section-heading">
          <span className="section-tag">Step-By-Step Process</span>
          <h2>How DayZero Works</h2>
          <p>Four simple steps to replace resume bias with verified execution data.</p>
        </div>

        <div className="steps-flow">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Select job role</h3>
            <p>Choose the role relevant to your hiring requirement.</p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Enter simulation environment</h3>
            <p>Candidates work inside a realistic, role-based scenario.</p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Complete real-world tasks</h3>
            <p>Assess execution, thinking, and adaptability through practical work.</p>
          </div>

          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Receive verified SkillRecord</h3>
            <p>Get structured performance insights for better hiring decisions.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
