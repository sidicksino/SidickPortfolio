import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./About.css";

import portrait from "../../assets/sidick1.webp";

/* Fact tiles. Each takes a hue from the shared --fam-* family already used by
   the project cards and the Skills icons, so this section belongs to the same
   system rather than introducing new colour. */
const TILES = [
  { id: "Location", color: "var(--fam-1)" },
  { id: "Focus", color: "var(--fam-2)" },
  { id: "Stack", color: "var(--fam-3)" },
  { id: "Mission", color: "var(--fam-4)" },
];

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="about" id="about">
      <motion.div
        className="about-head"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">{t("about.title")}</h2>
      </motion.div>

      <div className="about-container">
        <motion.figure
          className="about-card"
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <img src={portrait} alt="Sidick Abdoulaye Hissein" loading="lazy" />
          <figcaption>
            <span className="about-card-name">Sidick Abdoulaye Hissein</span>
            <span className="about-card-role">{t("about.eyebrow")}</span>
          </figcaption>
        </motion.figure>

        <div className="about-body">
          <motion.p
            className="about-lead"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            {t("about.whatIDoText")}
          </motion.p>

          <ul className="about-tiles">
            {TILES.map((tile, i) => (
              <motion.li
                key={tile.id}
                className="about-tile"
                style={{ "--tile-color": tile.color }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.07, 0.28) }}
              >
                <span className="about-tile-label">
                  {t(`about.tile${tile.id}Label`)}
                </span>
                {tile.id === "Stack" ? (
                  /* Two labelled rows. A single list read as an all-web stack,
                     which contradicted the role, the Focus tile and the Skills
                     section — all of which lead with data science. */
                  <dl className="about-tile-rows">
                    <dt>{t("about.tileStackDataLabel")}</dt>
                    <dd>{t("about.tileStackDataValue")}</dd>
                    <dt>{t("about.tileStackProductLabel")}</dt>
                    <dd>{t("about.tileStackProductValue")}</dd>
                  </dl>
                ) : (
                  <>
                    <span className="about-tile-value">
                      {t(`about.tile${tile.id}Value`)}
                    </span>
                    <span className="about-tile-sub">
                      {t(`about.tile${tile.id}Sub`)}
                    </span>
                  </>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
