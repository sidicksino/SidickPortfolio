import React from "react";
import { useTranslation } from 'react-i18next';
import "./ProjectsPage.css";
import SinoAi from "../../assets/sino-ai.png";
import PimaDiabetes from "../../assets/pima.png";
import Disease from "../../assets/disease.png";
import SinoEcommerce from "../../assets/team-work.png";

const AIProjects = () => {
  const projects = [
    {
      id: 1,
      titleKey: 'projects.items.ai.1.title',
      descriptionKey: 'projects.items.ai.1.description',
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "OpenAI API",
        "Tailwind CSS",
        "Axios",
      ],
      image: SinoAi,
      liveUrl: "https://sinoai-chi.vercel.app/",
      // githubUrl: "https://github.com/sidicksino/sino_Ai",
    },
    {

      id: 2,
      titleKey: 'projects.items.ai.2.title',
      descriptionKey: 'projects.items.ai.2.description',
      technologies: [
        "Python",
        "Scikit-learn",
        "Pandas",
        "Numpy",
        "Streamlit",
        "Joblib",
        "GitHub",
      ],
      image: PimaDiabetes,
      liveUrl:
        "https://sidicksino-machine-learning-lecture-app-h8qu2o.streamlit.app/",
      // githubUrl: "https://github.com/sidicksino/machine_learning_lecture",
    },
    {
      id: 3,
      titleKey: 'projects.items.ai.3.title',
      descriptionKey: 'projects.items.ai.3.description',
      technologies: [
        "Python",
        "Scikit-learn",
        "Pandas",
        "Numpy",
        "Streamlit",
        "Joblib",
        "GitHub",
      ],
      image: Disease,
      liveUrl: "https://sidicksino-disease-risk-prediction-app-aqgd49.streamlit.app/",
      // githubUrl: "https://github.com/sidicksino/Disease-Risk-Prediction",
    },
  ];

  const { t } = useTranslation();

  return (
    <div className="projects-page">
      <h1>{t('projectsPage.aiTitle')}</h1>
      <p>{t('projectsPage.aiIntro')}</p>

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
                <a
                  href={project.liveUrl.trim()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-live"
                >
                  {t('projectsPage.viewLive')}
                </a>
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
  );
};

export default AIProjects;
