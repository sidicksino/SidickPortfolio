import React from "react";
import { useTranslation } from 'react-i18next';
import "./ProjectsPage.css";
import SinoAi from "../../assets/sino-ai.png";
import SinoCoffee from "../../assets/SinoCoffee.png";
import Insta from "../../assets/insta.png";
import SinoEcommerce from "../../assets/team-work.png";

const WebProjects = () => {
  const projects = [
    {
      id: 1,
      title: "SinoCoffee",
      description:
        "SinoCoffee is a modern app by Sidick, offering a fast and intuitive platform with a sleek, up-to-date interface.",
      technologies: [
        "React",
        "Vite",
        "Supabase",
        "TypeScript",
        "Tailwind CSS",
        "shadcn-ui",
      ],
      image: SinoCoffee,
      liveUrl: "https://sino-coffee.vercel.app/",
      // githubUrl: "https://github.com/sidicksino/SinoCoffee",
    },
    {
      id: 2,
      title: "Sino Ai",
      description:
        "A modern AI web application, providing intelligent features and real-time interactions.",
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
      id: 3,
      title: "Insta Abeche Website",
      description:
        "A simple and responsive website for Institut d'Abeche, providing essential information and services online.",
      technologies: ["HTML", "CSS", "JavaScript", "MySQL"],
      image: Insta,
      liveUrl: "https://insta-uxnh.onrender.com/",
      // githubUrl: "https://github.com/sidicksino/insta_abeche",
    },
    {
      id: 4,
      title: "Sino Ecommerce Website",
      description:
        "A modern e-commerce website for selling products online with a sleek design, responsive layout, and smooth user experience.",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "MySQL"],
      image: SinoEcommerce,
      liveUrl: "https://team-work-30tj.onrender.com/",
      // githubUrl: "https://github.com/sidicksino/team_work",
    },
  ];

  const { t } = useTranslation();

  return (
    <div className="projects-page">
      <h1>{t('projectsPage.webTitle')}</h1>
      <p>{t('projectsPage.webIntro')}</p>

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

export default WebProjects;
