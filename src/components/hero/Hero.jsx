import React, { useEffect } from "react";
import "./Hero.css";
import heroImage from "../../assets/sidick.jpg";
import { motion } from "framer-motion";
import MyPDF from "../../assets/sidick.pdf";

const Hero = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector(".hero").classList.add("animate");
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = MyPDF;
    link.download = "Sidick_CV.pdf";
    link.click();
  };

  return (
    <section className="hero" id="home">
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
          <button className="btn btn-primary">More About Me</button>
          <button onClick={handleDownload} className="btn btn-secondary">Download CV</button>
        </div>
      </div>
      <div className="hero-image">
        <img src={heroImage} loading="lazy" alt="Sidick Abdoulaye Hissein" />
      </div>
    </section>
  );
};

export default Hero;
