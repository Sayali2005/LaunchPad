import React, { useContext } from 'react';
import { FaRocket, FaPlus, FaEdit, FaTrash, FaList } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import About from './About';

export default function Home({ onPromptLogin }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Function to check auth and then redirect
  const requireAuth = (path) => {
    if (!user) {
      if (onPromptLogin) return onPromptLogin();
      return alert('Please login or signup first to perform this action.');
    }
    navigate(path);
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <FaRocket className="app-icon" />
        <h1 className="app-name">LaunchPad</h1>
        <p className="tagline">Kickstart your day, complete your mission.</p>

        <div className="task-buttons">
          <button className="task-btn add" onClick={() => requireAuth("/add")}>
            <FaPlus /> Add Task
          </button>
          <button className="task-btn edit" onClick={() => requireAuth("/")} >
            <FaEdit /> Edit Task
          </button>
          <button className="task-btn delete" onClick={() => requireAuth("/")} >
            <FaTrash /> Delete Task
          </button>
          <button className="task-btn view" onClick={() => requireAuth("/dashboard")}>
            <FaList /> View Tasks
          </button>
        </div>
      </div>
      <About/>
    </div>
  );
}
