import React from 'react';

const UserProfileCard = ({ user, onClick }) => {
  const name = user?.name || 'Saavi';
  const role = user?.role || 'Frontend Engineer';
  const company = user?.company || 'GMAIL';
  const avatarLetter = name.charAt(0).toUpperCase();

  return (
    <div 
      className="sidebar-user-card" 
      onClick={onClick}
      title="Click to view profile & settings" 
      style={{ cursor: 'pointer' }}
    >
      <div className="sidebar-user-avatar">{avatarLetter}</div>
      <div className="sidebar-user-details">
        <span className="sidebar-user-name">{name}</span>
        <span className="company-badge">{company} • {role}</span>
      </div>
    </div>
  );
};

export default UserProfileCard;
