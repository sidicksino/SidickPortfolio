import { useTranslation } from "react-i18next";
import "./Where.css";
import Reveal from "../common/Reveal";

/* Sphere radius as a fraction of the stage. The globe is built from CSS
   rings — nine meridians and five parallels — so it needs no 3D library and
   scales with one variable (--g, the stage size). */
const R = 0.46;
const MERIDIANS = Array.from({ length: 9 }, (_, i) => i * 20);
const PARALLELS = [-60, -30, 0, 30, 60];

const CITIES = [
  { key: "ndjamena", lat: 12.13, lon: 15.06, coords: "12.13° N · 15.06° E" },
  { key: "kigali", lat: -1.94, lon: 30.06, coords: "1.94° S · 30.06° E" },
];

const Where = () => {
  const { t } = useTranslation();

  return (
    <section className="section where" id="where">
      <div className="container where-layout">
        <div className="where-stage" role="img" aria-label={t("where.globeAlt")}>
          <div className="where-glow" />
          <div className="where-tilt">
            <div className="where-globe">
              {MERIDIANS.map((deg) => (
                <span key={`m${deg}`} className="where-ring" style={{ "--r": R, transform: `rotateY(${deg}deg)` }} />
              ))}
              {PARALLELS.map((lat) => {
                const rad = (lat * Math.PI) / 180;
                return (
                  <span
                    key={`p${lat}`}
                    className="where-ring"
                    style={{
                      "--r": R * Math.cos(rad),
                      transform: `translateY(calc(var(--g) * ${(-R * Math.sin(rad)).toFixed(4)})) rotateX(90deg)`,
                    }}
                  />
                );
              })}
              {CITIES.map((city) => (
                <span
                  key={city.key}
                  className="where-marker"
                  style={{ transform: `rotateY(${city.lon}deg) rotateX(${city.lat}deg) translateZ(calc(var(--g) * ${R}))` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="where-copy">
          <Reveal as="span" className="eyebrow">
            02 — {t("where.eyebrow")}
          </Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>
            {t("where.titleA")}
            <br />
            <em>{t("where.titleB")}</em>
          </Reveal>
          <Reveal as="p" className="section-lead" delay={0.1}>
            {t("where.text")}
          </Reveal>
          <Reveal className="where-cities" delay={0.15}>
            {CITIES.map((city) => (
              <div key={city.key} className="where-city">
                <span className="where-coords">{city.coords}</span>
                <h3>{t(`where.${city.key}City`)}</h3>
                <span className="where-country">{t(`where.${city.key}Country`)}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Where;
