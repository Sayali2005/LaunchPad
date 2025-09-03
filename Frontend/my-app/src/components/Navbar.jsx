import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();       // clear cookie + user
    navigate('/');        // redirect to home page
  };

  const handleLogoClick = () => {
    if (user) {
      navigate('/');
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        🚀 LaunchPad
      </div>
      <div className="nav-links">
        {user ? (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            <button className="btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="btn" onClick={() => navigate('/login')}>Login</button>
            <button className="btn signup" onClick={() => navigate('/register')}>Signup</button>
          </>
        )}
      </div>
    </nav>
  );
}
