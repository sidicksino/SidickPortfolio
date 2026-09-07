import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import "./Featured.css";

import { featuredProjects, totalProjectCount } from "../../data/projectData";

const MotionLink = motion(Link);

/* Mobile apps have no public web URL — their liveUrl is "#" in the data.
   Those cards route to the category page instead of pretending to be a
   dead external link. */
const hasLiveSite = (url) => Boolean(url) && url.trim() !== "#";

/* Category drives the card's accent and its label. Colours come from the
   shared --fam-* family via the semantic --cat-* aliases in index.css. */
const CATEGORY = {
  web: { color: "var(--cat-web)", labelKey: "projects.webProjects" },
  mobile: { color: "var(--cat-mobile)", labelKey: "projects.mobileProjects" },
  design: { color: "var(--cat-design)", labelKey: "projects.designProjects" },
  ai: { color: "var(--cat-ai)", labelKey: "projects.aiProjects" },
};

const Featured = () => {
  const { t } = useTranslation();

  return (
    <section className="featured-section" id="work">
      <motion.div
        className="featured-head"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{t("featured.title")}</h2>
        <p>{t("featured.subtitle")}</p>
      </motion.div>

      <div className="featured-grid">
        {featuredProjects.map((project, i) => {
          const cat = CATEGORY[project.category] ?? CATEGORY.web;
          const title = t(project.titleKey);
          const live = hasLiveSite(project.liveUrl);
          const ctaLabel = t(live ? "featured.viewLive" : "featured.viewDetails");

          const Card = live ? motion.a : MotionLink;
          const linkProps = live
            ? { href: project.liveUrl.trim(), target: "_blank", rel: "noreferrer" }
            : { to: `/projects/${project.category}` };

          return (
            <Card
              key={`${project.category}-${project.id}`}
              className="featured-card"
              style={{ "--card-color": cat.color }}
              {...linkProps}
              aria-label={`${title} — ${ctaLabel}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.06, 0.3) }}
            >
              <div className="featured-media">
                <img src={project.image} alt={title} loading="lazy" />
                <span className="featured-tag">{t(cat.labelKey)}</span>
              </div>

              <div className="featured-body">
                <h3>{title}</h3>
                <p>{t(project.descriptionKey)}</p>

                <ul className="featured-tech">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                <span className="featured-cta">
                  {ctaLabel}
                  {live ? (
                    <FaExternalLinkAlt aria-hidden="true" />
                  ) : (
                    <FaArrowRight aria-hidden="true" />
                  )}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      <motion.a
        className="featured-all"
        href="#projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t("featured.seeAll", { count: totalProjectCount })}
        <FaArrowRight aria-hidden="true" />
      </motion.a>
    </section>
  );
};

export default Featured;
