import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaPaintBrush,
  FaBrain,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Projects.css";
import { useTranslation } from 'react-i18next';

const ProjectsSection = () => {
  const projects = [
    {
      id: "web-app",
      titleKey: 'projects.webProjects',
      icon: <FaLaptopCode />,
      desc: "Ultra-fast, secure, and elegant web applications designed to transform user experience.",
      link: "/projects/web",
      color: "#6366f1",
    },
    {
      id: "mobile-app",
      titleKey: 'projects.mobileProjects',
      icon: <FaMobileAlt />,
      desc: "Intuitive mobile apps with smooth animations, crafted for both iOS and Android.",
      link: "/projects/mobile",
      color: "#8b5cf6",
    },
    {
      id: "design",
      titleKey: 'projects.designProjects',
      icon: <FaPaintBrush />,
      desc: "Custom UI/UX designs that are aesthetic, functional, and made to captivate.",
      link: "/projects/design",
      color: "#ec4899",
    },
    {
      id: "ml-ai",
      titleKey: 'projects.aiProjects',
      icon: <FaBrain />,
      desc: "Intelligent models to automate, predict, and revolutionize your business processes.",
      link: "/projects/ai",
      color: "#f59e0b",
    },
  ];

  const { t } = useTranslation();

  return (
    <section className="projects-section" id="projects">
      <motion.h2
        initial={{ opacity: 0, translateX: "50%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 1 }}
      >
        {t('projects.title')} <span className="span2">✨</span>
      </motion.h2>

      <div className="projects-grid">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="project-card"
            style={{ "--card-color": project.color }}
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
              {t(project.titleKey)}
            </motion.h3>

            <p className="project-desc">{project.desc}</p>

            {/* 🔥 LIEN DYNAMIQUE ICI */}
            <motion.div>
              <Link to={project.link}>
                <span className="more-link">
                  {t('projects.viewProject')} <FaArrowRight className="arrow-icon" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
