import React from 'react';
import './ProjectsPage.css';

const WebProjects = () => {
  // 🗃️ Données structurées — à remplacer plus tard par une API
  const projects = [
    {
      id: 1,
      title: "Application E-commerce",
      description: "Plateforme complète de vente en ligne avec panier, paiement et dashboard admin.",
      technologies: ["React", "Node.js", "Stripe", "MongoDB"],
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
      liveUrl: "https://mon-ecommerce.com",
      githubUrl: "https://github.com/tonuser/ecommerce",
    },
    {
      id: 2,
      title: "Dashboard Analytics",
      description: "Tableau de bord interactif avec visualisations en temps réel et filtres avancés.",
      technologies: ["Vue.js", "D3.js", "Firebase", "TailwindCSS"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      liveUrl: "https://mon-dashboard.com",
      githubUrl: "https://github.com/tonuser/dashboard",
    },
    {
      id: 3,
      title: "Portfolio Créatif",
      description: "Site vitrine animé avec effets 3D, scroll fluide et intégration CMS.",
      technologies: ["Next.js", "Framer Motion", "Sanity", "GSAP"],
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      liveUrl: "https://mon-portfolio.com",
      githubUrl: "https://github.com/tonuser/portfolio",
    },
  ];

  return (
    <div className="projects-page">
      <h1>Mes Projets Web</h1>
      <p>Voici une sélection de mes applications web les plus récentes et impactantes.</p>

      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-image-wrapper">
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
            </div>

            <div className="project-content">
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
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-live"
                >
                  Voir en ligne
                </a>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
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

export default WebProjects;