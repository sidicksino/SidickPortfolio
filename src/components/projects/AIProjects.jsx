import React from 'react';
import './ProjectsPage.css';

const AIProjects = () => {
  return (
    <div className="projects-page">
      <h1>Mes Projets IA & ML</h1>
      <p>Modèles intelligents pour automatiser, prédire et optimiser.</p>
      <div className="projects-list">
        <div className="project-item">
          <h3>Chatbot IA</h3>
          <p>Python + NLP + GPT-3.5</p>
        </div>
        <div className="project-item">
          <h3>Reco Système</h3>
          <p>TensorFlow + Scikit-learn</p>
        </div>
      </div>
    </div>
  );
};

export default AIProjects;