// about.jsx
import React from 'react';
import './about.css';

export default function About() {
  return (
    <div className="about-container">
      <h1 className="app-name">LaunchPad</h1>
      <p className="tagline">Kickstart your day, complete your mission.</p>

      <section className="about-content">
        <h2>About LaunchPad</h2>
        <p>
          LaunchPad is a modern task manager app built to help you stay organized
          and productive. With secure login, task management, and status tracking,
          you can focus on completing your goals with clarity.
        </p>

        <ul className="features-list">
          <li><strong>Secure Authentication:</strong> Sign up and log in using JWT.</li>
          <li><strong>Task Management:</strong> Add, edit, and delete tasks with database storage.</li>
          <li><strong>Status Toggle:</strong> Switch tasks between Pending and Completed states.</li>
          <li><strong>Responsive Design:</strong> Optimized for desktop and mobile.</li>
        </ul>
      </section>
    </div>
  );
}
