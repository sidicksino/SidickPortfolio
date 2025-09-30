import React, { useState } from "react";
import "./Navbar.css";
import Logo from "../../assets/Logo.svg";
import { RiContactsBook2Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const Navbar = ({ scrolled = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo">
        <img src={Logo} alt="Logo" />
        <p className="nav-logo-text">
          <span>Sidick</span>Sino
        </p>
      </div>

      {/* Nouveau bouton avec SVG animé */}
      <button
        className={`nav-toggle ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="menu-icon"
        >
          <path
            d="M25 6.25H10M25 15H5M25 23.75H15"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <li>
          <a href="#home">
            <span className="mobile-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 22V12H15V22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Home
          </a>
        </li>
        <li>
          <a href="#about">
            <span className="mobile-icon">
              <CgProfile/>
            </span>
            About
          </a>
        </li>
        <li>
          <a href="#skills">
            <span className="mobile-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Skills
          </a>
        </li>
        <li>
          <a href="#projects">
            <span className="mobile-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 7L12 3L4 7V17L12 21L20 17V7Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 12V21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 7L12 12L20 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Projects
          </a>
        </li>
        <li>
          <a href="#contact">
            <span className="mobile-icon">
              <RiContactsBook2Line />
            </span>
            Contact
          </a>
        </li>
        <li>
          <a href="#services">
            <span className="mobile-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Services
          </a>
        </li>
      </ul>

      <button className="nav-cta" aria-label="Connect with me"><a  href="#contact">

        Connect With Me
      </a>
      </button>
    </nav>
  );
};

export default Navbar;
