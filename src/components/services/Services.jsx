import React from "react";
import { motion } from "framer-motion";
import "./Services.css";
import Service from "../../assets/rr.png";
import Slight from "../../assets/image.png";

const Services = () => {
  return (
    <section className="services-section" id="services">
      {/* Image animée à droite */}
        <motion.div
          className="rrrr"
          initial={{ opacity: 0, translateX: "50%" }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="floating-image-slight">
            <img src={Slight} loading="lazy" alt="Slight Illustration" />
          </div>
        </motion.div>
      <div className="services-container">
        
        {/* Texte à gauche */}
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

        {/* Image animée à droite */}
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
