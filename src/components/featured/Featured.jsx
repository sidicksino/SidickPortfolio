import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import "./Featured.css";
import Reveal from "../common/Reveal";
import { allProjects, featuredProjects, pickLang } from "../../data/projectData";

/* Mobile and design projects have no public URL — the API stores null. */
const hasLiveSite = (url) => Boolean(url) && url.trim() !== "" && url.trim() !== "#";

/* Category drives each card's tag colour, from the shared --fam-* family. */
const CATEGORY = {
  web: { color: "var(--cat-web)", labelKey: "projects.webProjects" },
  mobile: { color: "var(--cat-mobile)", labelKey: "projects.mobileProjects" },
  design: { color: "var(--cat-design)", labelKey: "projects.designProjects" },
  ai: { color: "var(--cat-ai)", labelKey: "projects.aiProjects" },
};

/* "featured" is the curated set; the rest filter the full list. These replace
   the four separate /projects/* pages, which used to take visitors off the
   homepage with no way back but a "Back" link. */
const FILTERS = ["featured", "web", "mobile", "ai", "design", "all"];

const Featured = ({ initialCategory }) => {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState(
    FILTERS.includes(initialCategory) ? initialCategory : "featured",
  );

  /* Old links like /projects/web land here with that filter chosen. Scroll to
     the grid after <ScrollToTop> has had its turn, or it resets us to 0. */
  useEffect(() => {
    if (!initialCategory) return undefined;
    setFilter(FILTERS.includes(initialCategory) ? initialCategory : "featured");
    /* "instant": a smooth scroll across the whole page gets interrupted
       while the hero is still animating in, and stops short. */
    const id = setTimeout(
      () => document.getElementById("work")?.scrollIntoView({ behavior: "instant" }),
      150,
    );
    return () => clearTimeout(id);
  }, [initialCategory]);

  const counts = useMemo(() => {
    const c = { featured: featuredProjects.length, all: allProjects.length };
    for (const p of allProjects) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  const visible = useMemo(() => {
    if (filter === "featured") return featuredProjects;
    if (filter === "all") return allProjects;
    return allProjects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section className="section work" id="work">
      <div className="container">
        <div className="work-head">
          <div className="section-head">
            <Reveal as="span" className="eyebrow">
              04 — {t("featured.eyebrow")}
            </Reveal>
            <Reveal as="h2" className="section-title" delay={0.05}>
              {t("featured.title")} <em>{t("featured.titleAccent")}</em>
            </Reveal>
            <Reveal as="p" className="section-lead" delay={0.1}>
              {t("featured.subtitle")}
            </Reveal>
          </div>

          <Reveal className="work-filters" role="tablist" aria-label={t("featured.filterLabel")} delay={0.15}>
            {FILTERS.map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={filter === key}
                className={`work-filter ${filter === key ? "active" : ""}`}
                onClick={() => setFilter(key)}
              >
                {t(`featured.filter.${key}`)}
                <span className="work-filter-count">{counts[key] ?? 0}</span>
              </button>
            ))}
          </Reveal>
        </div>

        <m.div layout className="work-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => {
              const cat = CATEGORY[project.category] ?? CATEGORY.web;
              const { title, description } = pickLang(project, i18n.language);
              const live = hasLiveSite(project.liveUrl);
              return (
                <m.article
                  layout
                  key={project.id}
                  className="work-card"
                  style={{ "--card-color": cat.color }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.24), ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <div className="work-media">
                    {project.image ? (
                      <img src={project.image} alt={title} loading="lazy" />
                    ) : (
                      <span className="work-media-empty" aria-hidden="true" />
                    )}
                    <span className="work-tag">{t(cat.labelKey)}</span>
                  </div>

                  <div className="work-body">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <ul className="work-tech">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                    <div className="work-links">
                      {live && (
                        <a href={project.liveUrl.trim()} target="_blank" rel="noreferrer" className="work-link work-link--primary">
                          {t(project.category === "design" ? "featured.viewDesign" : "featured.viewLive")}
                          <FaArrowRight aria-hidden="true" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl.trim()} target="_blank" rel="noreferrer" className="work-link">
                          <FaGithub aria-hidden="true" />
                          {t("projectsPage.viewCode")}
                        </a>
                      )}
                    </div>
                  </div>
                </m.article>
              );
            })}
          </AnimatePresence>
        </m.div>
      </div>
    </section>
  );
};

export default Featured;
