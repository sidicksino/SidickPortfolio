import React from "react";
import { useTranslation } from 'react-i18next';
import "./ProjectsPage.css";
import Wallet from "../../assets/wallet.png";
import TchadInfos from "../../assets/tchadInfos.png";

const MobileProjects = () => {
  const projects = [
    {
      id: 1,
      title: "SinoBoutique",
      description:
        "SinoBoutique is a sleek and modern e-commerce app developed by Sidick, designed to provide a seamless shopping experience with real-time updates, secure transactions, and an intuitive user interface.",
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
      title: "TchadInfos",
      description:
        "TchadInfos is a modern and user-friendly news app developed by Sidick, providing real-time updates, curated news content, and an intuitive interface for effortless browsing of the latest headlines.",
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
      title: "Wallet",
      description:
        "Wallet is a modern digital finance app developed by Sidick, allowing users to manage their expenses, track transactions, and visualize spending insights through a secure and responsive interface.",
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
      title: "To-Do",
      description:
        "To-Do is a minimalist and efficient task management app built by Sidick, designed to help users organize their daily activities, set priorities, and stay productive with a clean and responsive interface.",
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