import { useTranslation } from "react-i18next";
import "./About.css";
import Reveal from "../common/Reveal";
import portrait from "../../assets/about-portrait.webp";
import portrait400 from "../../assets/about-portrait-400.webp";
import portrait600 from "../../assets/about-portrait-600.webp";

/* Four cards that pile up as you scroll. Each one sticks a little lower than
   the last, so the earlier cards stay peeking out above the newest. The last
   card is the magenta one — the mission is where the story lands. */
const CARDS = ["who", "what", "how", "mission"];

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="section about" id="about">
      <div className="container about-layout">
        <div className="about-aside">
          <Reveal as="span" className="eyebrow">
            01 — {t("about.title")}
          </Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>
            {t("about.headline")} <em>{t("about.headlineAccent")}</em>
          </Reveal>
          <Reveal as="figure" className="about-portrait" delay={0.1}>
            <span className="about-portrait-ring" aria-hidden="true" />
            {/* Rendered about 0.73 x the card width (max 400px): phones get the
                400px file instead of the full 829px one. */}
            <img
              src={portrait}
              srcSet={`${portrait400} 400w, ${portrait600} 600w, ${portrait} 829w`}
              sizes="(max-width: 440px) 66vw, 293px"
              alt={t("about.photoAlt")}
              loading="lazy"
            />
            <figcaption>
              <span className="about-portrait-name">Sidick Abdoulaye Hissein</span>
              <span className="about-portrait-role">{t("about.eyebrow")}</span>
            </figcaption>
          </Reveal>
          <p className="about-hint" aria-hidden="true">
            ↓ {t("about.scrollHint")}
          </p>
        </div>

        <ol className="about-stack">
          {CARDS.map((id, i) => (
            <li
              key={id}
              className={`about-card ${id === "mission" ? "about-card--accent" : ""}`}
              style={{ "--i": i }}
            >
              <span className="about-card-label">
                0{i + 1} — {t(`about.cards.${id}.label`)}
              </span>
              <h3>{t(`about.cards.${id}.title`)}</h3>
              <p>{t(`about.cards.${id}.text`)}</p>
              <span className="about-card-num" aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default About;
