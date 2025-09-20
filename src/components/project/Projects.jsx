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
      desc: 'Ultra-fast, secure, and elegant web applications designed to transform user experience.',
      link: '#web-app',
      color: '#6366f1',
    },
    {
      id: 'mobile-app',
      title: 'Mobile App',
      icon: <FaMobileAlt />,
      desc: 'Intuitive mobile apps with smooth animations, crafted for both iOS and Android.',
      link: '#mobile-app',
      color: '#8b5cf6',
    },
    {
      id: 'design',
      title: 'Design',
      icon: <FaPaintBrush />,
      desc: 'Custom UI/UX designs that are aesthetic, functional, and made to captivate.',
      link: '#design',
      color: '#ec4899',
    },
    {
      id: 'ml-ai',
      title: 'ML & AI',
      icon: <FaBrain />,
      desc: 'Intelligent models to automate, predict, and revolutionize your business processes.',
      link: '#ml-ai',
      color: '#f59e0b',
    },
  ];

  return (
    <section className="projects-section" id='projects'>
      <motion.h2
        initial={{ opacity: 0, translateX: "50%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 1 }}
      >
       My <span className='span1'>Projets</span>  <span className='span2'>✨</span>
      </motion.h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card"
            style={{ '--card-color': project.color }}
            initial={{ opacity: 0, translateX: "100%" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3 }}
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
