import React from "react";
import { useTranslation } from 'react-i18next';
import "./ProjectsPage.css";
import BackToHome from "./BackToHome";
// Images are now imported in projectData.js
import { mobileProjects as projects, pickLang } from "../../data/projectData";

const MobileProjects = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <>
        {/* Plain elements, not <Helmet>: React 19 hoists these natively and
            react-helmet-async 2.x was silently dropping every <meta> under it. */}
        <title>{`${t('projectsPage.mobileTitle')} | Sidick Sino`}</title>
        <meta name="description" content={t('projectsPage.mobileIntro')} />
      </>
      <div className="projects-page">
      <BackToHome />
      <h1>{t('projectsPage.mobileTitle')}</h1>
      <p>{t('projectsPage.mobileIntro')}</p>

      <div className="projects-list">

        {projects.map((project) => {
          const { title, description } = pickLang(project, i18n.language);
          return (
          <div key={project.id} className="project-wrapper">
            {/* SinoBoutique and To-Do have no screenshot in projectData yet.
                Rendering the <img> anyway gave src="" — which React warns
                about and which makes the browser re-request the page. */}
            {project.image && (
              <div className="project-image-container">
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
          );
        })}
      </div>
    </div>
    </>
  );
};

export default MobileProjects;