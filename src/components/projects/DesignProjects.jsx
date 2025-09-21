import React from "react";
import "./ProjectsPage.css";
import Ecomerce from "../../assets/ecomerce.png";
import TchadInfos from "../../assets/tchadInfos.png";
import Insta from "../../assets/insta.png";
import SinoEcommerce from "../../assets/team-work.png";

const DesignProjects = () => {
  const projects = [
    {
      id: 1,
      title: "TchadInfos Design",
      description:
        "A modern news app design for TchadInfos, focusing on a clean layout and user-friendly reading experience.",
      technologies: ["Figma"],
      image: TchadInfos,
      viewUrl: "https://www.figma.com/design/zN5aQNdxfQNNE2feEx4yfi/TEAM-WORK1?node-id=477-727&p=f&t=DtBIxtgBPNmUUJ8u-0",
    },       
    {
      id: 2,
      title: "Ecommerce Mobile Design",
      description:
        "A modern e-commerce App UI/UX design for a seamless and engaging shopping experience.",
      technologies: ["Figma"],
      image: Ecomerce,
      viewUrl: "https://www.figma.com/design/zN5aQNdxfQNNE2feEx4yfi/TEAM-WORK1?node-id=0-1&p=f&t=DtBIxtgBPNmUUJ8u-0",
    },  
    {
      id: 3,
      title: "Sidick Portfolio Design",
      description:
        "A modern portfolio web UI/UX design showcasing projects and skills with a clean, responsive layout.",
      technologies: ["Figma"],
      image: SinoEcommerce,
      viewUrl: "https://www.figma.com/design/Gbc29anWMxWxIH9MKtBAIA/Boutique-Sino?node-id=173-168&p=f&t=DtBIxtgBPNmUUJ8u-0",
    },       
    {
      id: 4,
      title: "Sino Ecommerce Design",
      description:
        "A modern e-commerce Web UI/UX design for a seamless and engaging shopping experience.",
      technologies: ["Figma"],
      image: SinoEcommerce,
      viewUrl: "https://www.figma.com/design/Gbc29anWMxWxIH9MKtBAIA/Boutique-Sino?node-id=156-132&t=DtBIxtgBPNmUUJ8u-0",
    }      
  ];

  return (
    <div className="projects-page">
      <h1>My Mobile Projects</h1>
      <p>
        iOS & Android applications designed for the best user experience.
      </p>
  
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
                  href={project.viewUrl.trim()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-live"
                >
                  View Live
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