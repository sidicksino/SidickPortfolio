import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import "./Hero.css";
import heroImage from "../../assets/sidick.jpg";
import { motion } from "framer-motion";
import MyPDF from "../../assets/sidick.pdf";
import { Link } from "react-router-dom";

const Hero = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector(".hero").classList.add("animate");
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const { t } = useTranslation();

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
          {t('hero.greeting')}
          <br />
          {t('hero.namePart')} <span className="span-sidick-hero">SIDICK</span>
          <br />
          <span>ABDOULAYE HISSEIN</span>
        </h1>
        <motion.p
          initial={{ opacity: 0, translateX: "-100%" }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 1 }}
        >
          {t('hero.title')}
        </motion.p>
        <div className="hero-buttons">
          <Link to="/pages/hero" className="btn btn-primary">{t('hero.cta')}</Link>
          <button onClick={handleDownload} className="btn btn-secondary">{t('hero.downloadCV')}</button>
        </div>
      </div>
      <div className="hero-image">
        <img src={heroImage} loading="lazy" alt="Sidick Abdoulaye Hissein" />
      </div>
    </section>
  );
};

export default Hero;
