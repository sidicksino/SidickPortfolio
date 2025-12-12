import "./Skills.css";
import { FaDatabase, FaCode, FaChartBar } from "react-icons/fa";
import SkillsPhoto from "../../assets/skills.png";
import { motion } from "framer-motion";

const Skills = () => {
  return (
    <section className="skills" id="skills">
      <motion.h2
        initial={{ opacity: 0, translateX: "50%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 1 }}
      >
        My <span className="span1">Skills</span>{" "}
        <span className="span2">✨</span>
      </motion.h2>

      <div className="skills-container">
        {/* LEFT SIDE */}
        <div className="skills-info">
          <div className="skill-category">
            <div className="icon">
              <FaChartBar />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-blocks"
            >
              <h3>Data Science & Visualization</h3>
              <p>
                R, Pandas, NumPy, Scikit-learn, TensorFlow, Power BI, Tableau,
                Matplotlib, Seaborn
              </p>
            </motion.div>
          </div>

          <div className="skill-category">
            <div className="icon">
              <FaCode />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-blocks"
            >
              <h3>Frontend Development</h3>
              <p>HTML, CSS, JavaScript, React.js, React Native</p>
            </motion.div>
          </div>

          <div className="skill-category">
            <div className="icon">
              <FaDatabase />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-blocks"
            >
              <h3>Backend Development</h3>
              <p>Python, Node.js, SQL, MySQL, PostgreSQL, MongoDB</p>
            </motion.div>
          </div>
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
