import { motion } from "framer-motion";
import "./Services.css";
import Service from "../../assets/rr.png";
import Dark from "../../assets/image.png";
import Slight from "../../assets/sdark.png";
import { useTheme } from "../theme/useTheme";

const Services = () => {
  const { theme } = useTheme();

  return (
    <section className="services-section" id="services">
      
        {/* IMAGE .rrrr that changes based on theme */}
      <motion.div
        className="rrrr"
        initial={{ opacity: 0, translateX: "50%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="floating-image-slight">
          <img
            src={theme === "light" ? Slight : Dark}
            loading="lazy"
            alt="Theme Illustration"
          />
        </div>
      </motion.div>

      <div className="services-container">

        {/* TEXTE */}
        <div className="services-text">
          <motion.h2
            initial={{ opacity: 0, translateX: "50%" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 1 }}
          >
            My <span>Services</span> ✨
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            I create tailor-made digital experiences — performant, aesthetic,
            and intelligent.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <li>Web & Mobile Development</li>
            <li>Elegant UI/UX Design</li>
            <li>AI & Automation Solutions</li>
          </motion.ul>

          <a href="#contact" className="cta-button">
            Let’s Talk →
          </a>
        </div>

        {/* IMAGE À DROITE */}
        <motion.div
          className="services-image-wrapper"
          initial={{ opacity: 0, translateX: "50%" }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="floating-image">
            <img src={Service} loading="lazy" alt="Service Illustration" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
