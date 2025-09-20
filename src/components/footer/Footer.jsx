import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer animate-footer" id='footer'>
      <div className="footer-container">
        {/* Column 1 : Brand + Description */}
        <div className="footer-col fade-up">
          <h3 className="footer-logo">MyPortfolio</h3>
          <p className="footer-desc">
            Creating tailor-made digital experiences — elegant, smart, and performant.
          </p>
          <div className="footer-socials">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Column 2 : Navigation */}
        <div className="footer-col fade-up delay-1">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Me</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Column 3 : Contact */}
        <div className="footer-col fade-up delay-2">
          <h4>Contact</h4>
          <ul className="contact-list">
            <li>
              <FaEnvelope className="contact-icon" />
              <span>sidickabdoulayesino1@gmail.com</span>
            </li>
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>N'Djamena, Chad</span>
            </li>
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>Kigali, Rwanda</span>
            </li>
            <li>
              <FaPhoneAlt className="contact-icon" />
              <span>+250 793 22 58 53</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom fade-in">
        <p>
          &copy; {new Date().getFullYear()} <strong>MyPortfolio</strong> — All rights reserved. Made with 💜
        </p>
      </div>
    </footer>
  );
};

export default Footer;
