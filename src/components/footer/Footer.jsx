import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import SocialLinks from '../SocialLinks';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="custom-footer animate-footer" id='footer'>
      <div className="footer-container">
        {/* Column 1 : Brand + Description */}
        <div className="footer-col fade-up">
          <h3 className="footer-logo">{t('footer.byMe')}</h3>
          <p className="footer-desc">
            {t('footer.text')}
          </p>
          <SocialLinks variant="footer" />
        </div>

        {/* Column 2 : Navigation */}
        <div className="footer-col fade-up delay-1">
          <h4>{t('footer.navigation') || 'Navigation'}</h4>
          <ul>
            <li><a href="#home">{t('nav.home') || 'Home'}</a></li>
            <li><a href="#about">{t('nav.about')}</a></li>
            <li><a href="#skills">{t('skills.title')}</a></li>
            <li><a href="#projects">{t('projects.title')}</a></li>
            <li><a href="#services">{t('services.title')}</a></li>
            <li><a href="#contact">{t('nav.contact')}</a></li>
          </ul>
        </div>

        {/* Column 3 : Contact */}
        <div className="footer-col fade-up delay-2">
          <h4>{t('footer.contact') || 'Contact'}</h4>
          <ul className="contact-list">
            <li>
              <FaEnvelope className="contact-icon" />
              <a href="mailto:sidickabdoulayesino1@gmail.com">sidickabdoulayesino1@gmail.com</a>
            </li>
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>{t('contact.ndjamena')}</span>
            </li>
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>{t('contact.kigali')}</span>
            </li>
            <li>
              <FaPhoneAlt className="contact-icon" />
              <a href="tel:+250793225853">+250 793 22 58 53</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom fade-in">
        <p>
          &copy; {new Date().getFullYear()} <strong>{t('footer.byMe')}</strong> — {t('footer.rights')} · {t('footer.madeWith')} 💜
        </p>
      </div>
    </footer>
  );
};

export default Footer;
