import React, { useEffect } from "react";
import "./Hero.css";
import heroImage from "../../assets/sidick.jpg";
import { motion } from "framer-motion";

const Hero = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector(".hero").classList.add("animate");
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Hi,
          <br />
          I'm <span className="span-sidick-hero">SIDICK</span>
          <br />
          <span>ABDOULAYE HISSEIN</span>
        </h1>
        <motion.p
          initial={{ opacity: 0, translateX: "-100%" }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 1 }}
        >
          Data Analyst | Web Developer | ML Enthusiast
        </motion.p>
        <div className="hero-buttons">
          <motion.button 
          initial={{ opacity: 0, rotateX: "90deg" }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.5 }}
          className="btn btn-primary">More About Me</motion.button>
          <motion.button 
          initial={{ opacity: 0, rotateY: "90deg" }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.5 }}
          className="btn btn-secondary">Download CV</motion.button>
        </div>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="Sidick Abdoulaye Hissein" />
      </div>
    </section>
  );
};

export default Hero;
