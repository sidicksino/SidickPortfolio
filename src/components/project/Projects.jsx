import { motion } from "framer-motion";
import {
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Projects.css";
import { useTranslation } from 'react-i18next';

import { mainProjectsData } from "../../data/siteData";

const ProjectsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="projects-section" id="projects">
      <motion.h2
        initial={{ opacity: 0, translateX: "50%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="span1">{t('projects.title')} </span>{" "}
        <span className="span2">✨</span>
      </motion.h2>

      <div className="projects-grid">
        {mainProjectsData.map((project) => (
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
              <project.icon /> 
            </motion.div>

              <motion.h3
              className="project-title"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {t(project.titleKey)}
            </motion.h3>

            <p className="project-desc">{t(project.desc)}</p>

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
