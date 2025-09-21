import React from "react";
import "./ProjectsPage.css";

const MobileProjects = () => {
  const projects = [
    {
      id: 1,
      title: "App de Fitness",
      description:
        "Application de suivi d'entraînement avec programmes personnalisés, suivi GPS et intégration Apple Health / Google Fit.",
      technologies: ["React Native", "Firebase", "Redux", "Reanimated"],
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      liveUrl: "https://apps.apple.com/app/id123456789",
      githubUrl: "https://github.com/tonuser/fitness-app",
    },
    {
      id: 2,
      title: "Chat App",
      description:
        "Messagerie instantanée sécurisée avec chiffrement de bout en bout, appels vidéo et partage de fichiers en temps réel.",
      technologies: ["Flutter", "WebSocket", "Node.js", "Socket.IO"],
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
      liveUrl: "https://play.google.com/store/apps/details?id=com.tonuser.chat",
      githubUrl: "https://github.com/tonuser/chat-app",
    },
    {
      id: 3,
      title: "Gestionnaire de Budget",
      description:
        "Suivi des dépenses, visualisation des catégories, alertes personnalisées et synchronisation multi-appareils.",
      technologies: ["Kotlin", "SwiftUI", "Realm", "Charts"],
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
      liveUrl: "https://apps.apple.com/app/budget-manager/id987654321",
      githubUrl: "https://github.com/tonuser/budget-app",
    },
    {
      id: 4,
      title: "Gestionnaire de Budget",
      description:
        "Suivi des dépenses, visualisation des catégories, alertes personnalisées et synchronisation multi-appareils.",
      technologies: ["Kotlin", "SwiftUI", "Realm", "Charts"],
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
      liveUrl: "https://apps.apple.com/app/budget-manager/id987654321",
      githubUrl: "https://github.com/tonuser/budget-app",
    },
    {
      id: 5,
      title: "Gestionnaire de Budget",
      description:
        "Suivi des dépenses, visualisation des catégories, alertes personnalisées et synchronisation multi-appareils.",
      technologies: ["Kotlin", "SwiftUI", "Realm", "Charts"],
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
      liveUrl: "https://apps.apple.com/app/budget-manager/id987654321",
      githubUrl: "https://github.com/tonuser/budget-app",
    },
    {
      id: 6,
      title: "Gestionnaire de Budget",
      description:
        "Suivi des dépenses, visualisation des catégories, alertes personnalisées et synchronisation multi-appareils.",
      technologies: ["Kotlin", "SwiftUI", "Realm", "Charts"],
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
      liveUrl: "https://apps.apple.com/app/budget-manager/id987654321",
      githubUrl: "https://github.com/tonuser/budget-app",
    },
  ];

  return (
    <div className="projects-page">
      <h1>Mes Projets Mobiles</h1>
      <p>
        Applications iOS & Android conçues pour l’expérience utilisateur
        maximale.
      </p>

      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="project-wrapper">
            <div className="project-image-container">
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
            </div>
            <div className="project-card1">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tech">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-links">
                <a
                  href={project.liveUrl.trim()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-live"
                >
                  Voir en ligne
                </a>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl.trim()}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-github"
                  >
                    Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileProjects;