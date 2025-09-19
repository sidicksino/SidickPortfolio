import React from 'react';
import { motion } from 'framer-motion';
import {
  FaLaptopCode,
  FaMobileAlt,
  FaPaintBrush,
  FaBrain,
  FaArrowRight,
} from 'react-icons/fa';

import './Projects.css';

const ProjectsSection = () => {
  const projects = [
    {
      id: 'web-app',
      title: 'Web App',
      icon: <FaLaptopCode />,
      desc: 'Applications web ultra-rapides, sécurisées et élégantes, conçues pour transformer l’expérience utilisateur.',
      link: '#web-app',
      color: '#6366f1',
    },
    {
      id: 'mobile-app',
      title: 'Mobile App',
      icon: <FaMobileAlt />,
      desc: 'Applications mobiles intuitives avec des animations fluides, pensées pour iOS et Android.',
      link: '#mobile-app',
      color: '#8b5cf6',
    },
    {
      id: 'design',
      title: 'Design',
      icon: <FaPaintBrush />,
      desc: 'Designs UI/UX sur mesure, esthétiques et fonctionnels, créés pour captiver et convertir.',
      link: '#design',
      color: '#ec4899',
    },
    {
      id: 'ml-ai',
      title: 'ML & AI',
      icon: <FaBrain />,
      desc: 'Modèles intelligents pour automatiser, prédire et révolutionner vos processus métiers.',
      link: '#ml-ai',
      color: '#f59e0b',
    },
  ];

  return (
    <section className="projects-section">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Mes Projets <span>✨</span>
      </motion.h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card"
            style={{ '--card-color': project.color }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            whileHover={{ y: -15, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="card-glow"></div>

            <motion.div
              className="project-icon"
              whileHover={{ rotate: 15, scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {project.icon}
            </motion.div>

            <motion.h3
              className="project-title"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {project.title}
            </motion.h3>

            <p className="project-desc">{project.desc}</p>

            <motion.a
              href={project.link}
              className="more-link"
              whileHover={{ x: 5, backgroundColor: 'var(--primary-transparent)' }}
              whileTap={{ scale: 0.95 }}
            >
              More <FaArrowRight className="arrow-icon" />
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
