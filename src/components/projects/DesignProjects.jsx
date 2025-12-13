import React from "react";
import { useTranslation } from 'react-i18next';
import "./ProjectsPage.css";
import Ecomerce from "../../assets/ecomerce.png";
import TchadInfos from "../../assets/tchadInfos.png";
import Insta from "../../assets/insta.png";
import SinoEcommerce from "../../assets/team-work.png";

const DesignProjects = () => {
  const projects = [
    {
      id: 1,
      titleKey: 'projects.items.design.1.title',
      descriptionKey: 'projects.items.design.1.description',
      technologies: ["Figma"],
      image: TchadInfos,
      viewUrl: "https://www.figma.com/design/zN5aQNdxfQNNE2feEx4yfi/TEAM-WORK1?node-id=477-727&p=f&t=DtBIxtgBPNmUUJ8u-0",
    },       
    {
      id: 2,
      titleKey: 'projects.items.design.2.title',
      descriptionKey: 'projects.items.design.2.description',
      technologies: ["Figma"],
      image: Ecomerce,
      viewUrl: "https://www.figma.com/design/zN5aQNdxfQNNE2feEx4yfi/TEAM-WORK1?node-id=0-1&p=f&t=DtBIxtgBPNmUUJ8u-0",
    },  
    {
      id: 3,
      titleKey: 'projects.items.design.3.title',
      descriptionKey: 'projects.items.design.3.description',
      technologies: ["Figma"],
      image: SinoEcommerce,
      viewUrl: "https://www.figma.com/design/Gbc29anWMxWxIH9MKtBAIA/Boutique-Sino?node-id=173-168&p=f&t=DtBIxtgBPNmUUJ8u-0",
    },       
    {
      id: 4,
      titleKey: 'projects.items.design.4.title',
      descriptionKey: 'projects.items.design.4.description',
      technologies: ["Figma"],
      image: SinoEcommerce,
      viewUrl: "https://www.figma.com/design/Gbc29anWMxWxIH9MKtBAIA/Boutique-Sino?node-id=156-132&t=DtBIxtgBPNmUUJ8u-0",
    }      
  ];

  const { t } = useTranslation();

  return (
    <div className="projects-page">
      <h1>{t('projectsPage.designTitle')}</h1>
      <p>{t('projectsPage.designIntro')}</p>
  
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
  );  
};

export default DesignProjects;