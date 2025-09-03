import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard'); // go to dashboard after login
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Login failed. You may not be registered yet.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={submit}>
          <input 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
          <input 
            placeholder="Password" 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          <button type="submit">Login</button>
        </form>
          <p className="signup-note">
            Not a registered user? &nbsp;<Link to="/register">Sign up</Link>
          </p>

      </div>
    </div>
  );
}
