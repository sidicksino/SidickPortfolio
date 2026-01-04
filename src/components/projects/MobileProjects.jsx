import React from "react";
import { useTranslation } from 'react-i18next';
import "./ProjectsPage.css";
// Images are now imported in projectData.js
import { mobileProjects as projects } from "../../data/projectData";
import { Helmet } from "react-helmet-async";

const MobileProjects = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('projectsPage.mobileTitle')} | Sidick Sino</title>
        <meta name="description" content={t('projectsPage.mobileIntro')} />
      </Helmet>
      <div className="projects-page">
      <h1>{t('projectsPage.mobileTitle')}</h1>
      <p>{t('projectsPage.mobileIntro')}</p>

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
              <h3 className="project-title">{t(project.titleKey)}</h3>
              <p className="project-description">{t(project.descriptionKey)}</p>

              <div className="project-tech">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-links">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl.trim()}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-github"
                  >
                    {t('projectsPage.viewCode')}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default MobileProjects;