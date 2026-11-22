import { useTranslation } from "react-i18next";
import "./Services.css";
import Reveal from "../common/Reveal";
import { servicesData } from "../../data/siteData";

const Services = () => {
  const { t } = useTranslation();

  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-head">
          <Reveal as="span" className="eyebrow">
            05 — {t("services.title")}
          </Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>
            {t("services.headline")} <em>{t("services.headlineAccent")}</em>
          </Reveal>
          <Reveal as="p" className="section-lead" delay={0.1}>
            {t("services.subtitle")}
          </Reveal>
        </div>

        <ul className="services-grid">
          {servicesData.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal
                as="li"
                key={service.id}
                className="service-card"
                style={{ "--service-color": service.color }}
                delay={Math.min(i * 0.08, 0.3)}
              >
                <div className="service-top">
                  <span className="service-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="service-index" aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>
                <h3>{t(service.titleKey)}</h3>
                <p>{t(service.descKey)}</p>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="services-cta">
          <div>
            <h3>{t("cta.title")}</h3>
            <p>{t("cta.text")}</p>
          </div>
          <a href="#contact" className="btn btn-primary">
            {t("cta.button")}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
