import { useTranslation } from "react-i18next";
import "./About.css";
import Reveal from "../common/Reveal";
import portrait from "../../assets/sidick1.webp";

const TILES = ["Location", "Focus", "Stack", "Mission"];

const About = () => {
  const { t } = useTranslation();

  /* The statement lights up word by word as it scrolls past. Each word gets
     its own slice of the scroll range, so the brightening travels across the
     sentence instead of everything changing at once. */
  const words = t("about.statement").split(" ");

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="section-head center about-head">
          <Reveal as="span" className="eyebrow">
            01 — {t("about.title")}
          </Reveal>
          <p className="about-statement">
            {words.map((word, i) => {
              const start = 4 + i * (40 / words.length);
              return (
                <span
                  key={`${word}-${i}`}
                  className="reveal-word"
                  style={{ animationRange: `entry ${start.toFixed(1)}% cover ${(start + 18).toFixed(1)}%` }}
                >
                  {word}{" "}
                </span>
              );
            })}
          </p>
        </div>

        <div className="about-grid">
          <Reveal as="figure" className="about-photo">
            <img src={portrait} alt={t("about.photoAlt")} loading="lazy" />
            <figcaption>
              <span className="about-photo-name">Sidick Abdoulaye Hissein</span>
              <span className="about-photo-role">{t("about.eyebrow")}</span>
            </figcaption>
          </Reveal>

          <ul className="about-bento">
            {TILES.map((id, i) => (
              <Reveal as="li" key={id} className="about-tile" delay={Math.min(i * 0.08, 0.3)}>
                <span className="about-tile-label">{t(`about.tile${id}Label`)}</span>
                {id === "Stack" ? (
                  /* Two labelled rows, so the stack reads data-first like the
                     role does, not as an all-web list. */
                  <dl className="about-tile-rows">
                    <div>
                      <dt>{t("about.tileStackDataLabel")}</dt>
                      <dd>{t("about.tileStackDataValue")}</dd>
                    </div>
                    <div>
                      <dt>{t("about.tileStackProductLabel")}</dt>
                      <dd>{t("about.tileStackProductValue")}</dd>
                    </div>
                  </dl>
                ) : (
                  <>
                    <h3 className="about-tile-value">{t(`about.tile${id}Value`)}</h3>
                    <p className="about-tile-sub">{t(`about.tile${id}Sub`)}</p>
                  </>
                )}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
