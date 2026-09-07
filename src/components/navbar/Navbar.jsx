import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Navbar.css";
import Logo from "../../assets/Logo.svg";
import { RiContactsBook2Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import LanguageToggle from "../LanguageToggle";
import { MenuIcon, HomeIcon, SkillsIcon, ProjectsIcon, ServicesIcon } from "../common/Icons";

import { useActiveSection } from "../../hooks/useActiveSection";

const SECTION_IDS = ["home", "about", "skills", "projects", "contact", "services"];

const Navbar = ({ scrolled = false }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

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
        <span className="nav-active" aria-hidden="true"></span>
      </div>

      {/* Nouveau bouton avec SVG animé */}
      <button
        className={`nav-toggle ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <MenuIcon className="menu-icon" />
      </button>

      <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <li>
          <a href="#home" className={activeSection === "home" ? "active" : ""}>
            <span className="mobile-icon">
              <HomeIcon />
            </span>
            {t('nav.home')}
          </a>
        </li>
        <li>
          <a href="#about" className={activeSection === "about" ? "active" : ""}>
            <span className="mobile-icon">
              <CgProfile/>
            </span>
            {t('nav.about')}
          </a>
        </li>
        <li>
          <a href="#skills" className={activeSection === "skills" ? "active" : ""}>
            <span className="mobile-icon">
              <SkillsIcon />
            </span>
            {t('nav.skills')}
          </a>
        </li>
        <li>
          <a href="#projects" className={activeSection === "projects" ? "active" : ""}>
            <span className="mobile-icon">
              <ProjectsIcon />
            </span>
            {t('nav.projects')}
          </a>
        </li>
        <li>
          <a href="#contact" className={activeSection === "contact" ? "active" : ""}>
            <span className="mobile-icon">
              <RiContactsBook2Line />
            </span>
            {t('nav.contact')}
          </a>
        </li>
        <li>
          <a href="#services" className={activeSection === "services" ? "active" : ""}>
            <span className="mobile-icon">
              <ServicesIcon />
            </span>
            {t('nav.services')}
          </a>
        </li>
        <li className="mobile-actions">
          <LanguageToggle />
        </li>
        <li className="mobile-cta">
          <button className="nav-cta" aria-label="Connect with me"><a href="#contact">
            {t('nav.getStarted')}
          </a>
          </button>
        </li>
      </ul>

      <div className="nav-actions">
        <LanguageToggle />
        <button className="nav-cta" aria-label="Connect with me"><a href="#contact">
          {t('nav.getStarted')}
        </a>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
