import React, { useState } from "react";
import "./HeroPage.css";
import Logo from "../../assets/Logo.svg";

const Navbar = ({ scrolled = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo">
        <img src={Logo} loading="lazy" alt="Logo" />
        <p className="nav-logo-text">
          <span>Sidick</span>Sino
        </p>
      </div>

      <button className="nav-cta" aria-label="Connect with me">
        <a href="#contact">Connect With Me</a>
      </button>
    </nav>
  );
};

export default Navbar;
