import React from "react";
import "./Skills.css";
import { FaDatabase, FaCode, FaChartBar } from "react-icons/fa";
import SkillsPhoto from "../../assets/skills.png"
const Skills = () => {
  return (
    <section className="skills" id="skills">
      <h2 className="skills-title">Skills</h2>

      <div className="skills-container">
        {/* LEFT SIDE */}
        <div className="skills-info">
          <div className="skill-category">
            <div className="icon"><FaChartBar /></div>
            <div className="text-block">
              <h3>Data Science & Visualization</h3>
              <p>R, Pandas, NumPy, Scikit-learn, TensorFlow, Power BI, Tableau, Matplotlib, Seaborn</p>
            </div>
          </div>

          <div className="skill-category">
            <div className="icon"><FaCode /></div>
            <div className="text-block">
              <h3>Frontend Development</h3>
              <p>HTML, CSS, JavaScript, React.js, React Native</p>
            </div>
          </div>

          <div className="skill-category">
            <div className="icon"><FaDatabase /></div>
            <div className="text-block">
              <h3>Backend Development</h3>
              <p>Python, Node.js, SQL, MySQL, PostgreSQL, MongoDB</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="skills-img">
        <img src={SkillsPhoto} alt="Sidick Abdoulaye Hissein" className="skills-img"/>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="progress-section">
        <div className="progress-item">
          <span>Backend</span>
          <div className="progress-bar"><div className="fill" style={{width:"90%"}}></div></div>
        </div>
        <div className="progress-item">
          <span>Front-end</span>
          <div className="progress-bar"><div className="fill" style={{width:"85%"}}></div></div>
        </div>
        <div className="progress-item">
          <span>Design</span>
          <div className="progress-bar"><div className="fill" style={{width:"80%"}}></div></div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
