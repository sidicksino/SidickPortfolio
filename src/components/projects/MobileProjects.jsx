import React from "react";
import { useTranslation } from 'react-i18next';
import "./ProjectsPage.css";
import Wallet from "../../assets/wallet.png";
import TchadInfos from "../../assets/tchadInfos.png";

const MobileProjects = () => {
  const projects = [
    {
      id: 1,
      titleKey: 'projects.items.mobile.1.title',
      descriptionKey: 'projects.items.mobile.1.description',
      technologies: [
        "React Native",
        "Expo",
        "Axios",
        "JavaScript",
        "CSS",
        "Node.js",
        "Express.js",
        "NeonDatabase",
        "Cloudinary",
        "Nodemailer",
        "Twilio",
      ],
      image: "",
      liveUrl: "#",
      // githubUrl: "https://github.com/sidicksino/Boutique_Frontend",
    },
    {
      id: 2,
      titleKey: 'projects.items.mobile.2.title',
      descriptionKey: 'projects.items.mobile.2.description',
      technologies: [
        "React Native",
        "Expo",
        "TypeScript",
        "JavaScript",
        "CSS",
        "Axios",
        "NewsData.io",
      ],
      image: TchadInfos,
      liveUrl: "#",
      // githubUrl: "https://github.com/sidicksino/tchadInfos_version1",
    },
    {
      id: 3,
      titleKey: 'projects.items.mobile.3.title',
      descriptionKey: 'projects.items.mobile.3.description',
      technologies: [
        "React Native",
        "Expo",
        "JavaScript",
        "CSS",
        "Node.js",
        "Express.js",
        "Neon",
        "Clerk",
        "Upstash",
        "Axios",
        "NewsData.io",
      ],
      image: Wallet,
      liveUrl: "#",
      // githubUrl: "https://github.com/sidicksino/wallet",
    },
    {
      id: 4,
      titleKey: 'projects.items.mobile.4.title',
      descriptionKey: 'projects.items.mobile.4.description',
      technologies: ["React Native", "Expo", "TypeScript", "CSS", "Convex"],
      image: "",
      liveUrl: "#",
      // githubUrl: "https://github.com/sidicksino/to-do",
    },
  ];

  const { t } = useTranslation();

  return (
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
  );
};

export default MobileProjects;