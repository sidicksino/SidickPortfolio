import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import "./Services.css";
import Service from "../../assets/rr.png";
import Dark from "../../assets/image.png";
import Slight from "../../assets/sdark.png";
import { useTheme } from "../theme/useTheme";
import Art from "../art/Art";

import { servicesData } from "../../data/siteData";

const Services = () => {
  const { theme } = useTheme();

  const { t } = useTranslation();

  return (
    <section className="services-section" id="services">
      <Art />
        {/* IMAGE .rrrr that changes based on theme */}
      <motion.div
        className="rrrr"
        initial={{ opacity: 0, translateX: "50%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
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
            transition={{ duration: 1 }}
          >
            {t('services.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {t('services.webDevDesc')}
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {servicesData.map((serviceKey, index) => (
              <li key={index}>{t(serviceKey)}</li>
            ))}
          </motion.ul>

          <a href="#contact" className="cta-button">
            {t('cta.button')} →
          </a>
        </div>

        {/* IMAGE À DROITE */}
        <motion.div
          className="services-image-wrapper"
          initial={{ opacity: 0, translateX: "50%" }}
          whileInView={{ opacity: 1, translateX: 0 }}
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
