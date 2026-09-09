import React from "react";
import { useTranslation } from 'react-i18next';
import "./ProjectsPage.css";
import BackToHome from "./BackToHome";
// Images are now imported in projectData.js
import { designProjects as projects, pickLang } from "../../data/projectData";

const DesignProjects = () => {
  const { t, i18n } = useTranslation();

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

        {projects.map((project) => {
          const { title, description } = pickLang(project, i18n.language);
          return (
          <div key={project.id} className="project-wrapper">
            {/* image_url is nullable in the API — render nothing rather
                than an <img src="">. Same guard as MobileProjects. */}
            {project.image && (
              <div className="project-image-container">
                {/* alt was {project.title}, but projects only have titleKey —
                    so every image shipped with alt={undefined} */}
                <img
                  src={project.image}
                  alt={title}
                  className="project-image"
                  loading="lazy"
                />
              </div>
            )}
            <div className="project-card1">
              <h3 className="project-title">{title}</h3>
              <p className="project-description">{description}</p>
  
              <div className="project-tech">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
  
              <div className="project-links">
                {/* Design projects used to carry `viewUrl` (the Figma file);
                    the API folds that into live_url. Guarded, because a
                    project without a link must not crash the page. */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl.trim()}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-live"
                  >
                    {t('projectsPage.viewLive')}
                  </a>
                )}
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
    </>
  );  
};

export default DesignProjects;