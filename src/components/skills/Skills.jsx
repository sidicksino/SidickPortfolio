import "./Skills.css";
import "./Skills.css";
// Icons imported in siteData.js
import SkillsPhoto from "../../assets/skills.png";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

import { skillsData } from "../../data/siteData";

const Skills = () => {
  const { t } = useTranslation();

  return (
    <section className="skills" id="skills">
      <motion.h2
        initial={{ opacity: 0, translateX: "50%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="span1">{t('skills.title')} </span>{" "}
        <span className="span2">✨</span>
      </motion.h2>

      <div className="skills-container">
        {/* LEFT SIDE */}
        <div className="skills-info">
          {skillsData.map((skill) => (
            <div key={skill.id} className="skill-category">
              <div className="icon">
                <skill.icon />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-blocks"
              >
                <h3>{t(skill.titleKey)}</h3>
                <p>{skill.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <motion.div
          className="services-image-wrapper"
          initial={{ opacity: 0, translateX: "50%" }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="skills-img">
            <img src={SkillsPhoto} loading="lazy" alt="Sidick Abdoulaye Hissein" className="skills-img" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
