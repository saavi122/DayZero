import { useState } from 'react';

const RegistrationModal = ({ isOpen, onClose, title }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store in localStorage exactly like the original app.js did
    localStorage.setItem('userName', name);
    localStorage.setItem('user', JSON.stringify({ name }));
    localStorage.setItem('role', 'candidate');

    // Redirect to Roles page
    window.location.href = '/frontend/pages/roles.html';
  };

  // Close when overlay is clicked
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div 
      className="modal-overlay active" 
      onClick={handleOverlayClick}
      style={{ display: 'flex', zIndex: 100000 }}
    >
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3 id="modal-title">{title}</h3>
        <p id="modal-desc">Enter your details and our team will get in touch.</p>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="text" 
              id="reg-name" 
              placeholder="Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="tel" 
              id="reg-phone" 
              placeholder="Phone Number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary full-width">Submit Details</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
