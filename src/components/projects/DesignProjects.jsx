import React from "react";
import { useTranslation } from 'react-i18next';
import "./ProjectsPage.css";
import BackToHome from "./BackToHome";
// Images are now imported in projectData.js
import { designProjects as projects } from "../../data/projectData";

const DesignProjects = () => {
  const { t } = useTranslation();

  return (
    <>
      <>
        {/* Plain elements, not <Helmet>: React 19 hoists these natively and
            react-helmet-async 2.x was silently dropping every <meta> under it. */}
        <title>{`${t('projectsPage.designTitle')} | Sidick Sino`}</title>
        <meta name="description" content={t('projectsPage.designIntro')} />
      </>
      <div className="projects-page">
      <BackToHome />
      <h1>{t('projectsPage.designTitle')}</h1>
      <p>{t('projectsPage.designIntro')}</p>
  
      <div className="projects-list">

        {projects.map((project) => (
          <div key={project.id} className="project-wrapper">
            <div className="project-image-container">
              {/* alt was {project.title}, but projects only have titleKey —
                  so every image shipped with alt={undefined} */}
              <img
                src={project.image}
                alt={t(project.titleKey)}
                className="project-image"
                loading="lazy"
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
                <a
                  href={project.viewUrl.trim()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-live"
                >
                  {t('projectsPage.viewLive')}
                </a>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );  
};

export default DesignProjects;