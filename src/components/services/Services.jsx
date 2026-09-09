import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import "./Services.css";
import Service from "../../assets/rr.webp";
import Dark from "../../assets/image.webp";
import Slight from "../../assets/sdark.webp";
import { useTheme } from "../theme/useTheme";

import { servicesData } from "../../data/siteData";

const Services = () => {
  const { theme } = useTheme();

  const { t } = useTranslation();

  return (
    <section className="services-section" id="services">
      
        {/* IMAGE .rrrr that changes based on theme */}
      <motion.div
        className="rrrr"
        initial={{ opacity: 0, translateX: "50%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1 }}
      >
        <div className="floating-image-slight">
          <img
            src={theme === "light" ? Slight : Dark}
            loading="lazy"
            alt="Theme Illustration"
          />
        </div>
      </motion.div>

      <div className="services-container">

        {/* TEXTE */}
        <div className="services-text">
          <motion.h2
            initial={{ opacity: 0, translateX: "50%" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1 }}
          >
            {t('services.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            {t('services.subtitle')}
          </motion.p>

          <ul className="services-list">
            {servicesData.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.li
                  key={service.id}
                  className="service-item"
                  style={{ "--service-color": service.color }}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(i * 0.07, 0.28),
                  }}
                >
                  <span className="service-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="service-copy">
                    <strong>{t(service.titleKey)}</strong>
                    <span>{t(service.descKey)}</span>
                  </span>
                </motion.li>
              );
            })}
          </ul>

          <a href="#contact" className="cta-button">
            {t('cta.button')} →
          </a>
        </div>

        {/* IMAGE À DROITE */}
        <motion.div
          className="services-image-wrapper"
          initial={{ opacity: 0, translateX: "50%" }}
          whileInView={{ opacity: 1, translateX: 0 }}
          viewport={{ once: true, amount: 0.25 }}
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
