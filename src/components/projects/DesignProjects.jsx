import React from 'react';
import './ProjectsPage.css';

const DesignProjects = () => {
  return (
    <div className="projects-page">
      <h1>Mes Projets Design</h1>
      <p>Interfaces, identités visuelles, et expériences centrées utilisateur.</p>
      <div className="projects-list">
        <div className="project-item">
          <h3>Refonte UI SaaS</h3>
          <p>Figma + Design System</p>
        </div>
        <div className="project-item">
          <h3>Branding Startup</h3>
          <p>Logo, Couleurs, Guidelines</p>
        </div>
      </div>
    </div>
  );
};

export default DesignProjects;