import React, { useEffect } from "react";
import "./Hero.css";
import heroImage from "../../assets/sidick.jpg";

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
        <p>Data Analyst | Web Developer | ML Enthusiast</p>
        <div className="hero-buttons">
          <button className="btn btn-primary">More About Me</button>
          <button className="btn btn-secondary">Download CV</button>
        </div>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="Sidick Abdoulaye Hissein" />
      </div>
    </section>
  );
};

export default Hero;
