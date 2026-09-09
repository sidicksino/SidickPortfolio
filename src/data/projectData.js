/**
 * Projects now come from the API, baked into this bundle at build time by
 * scripts/fetch-projects.mjs. Nothing here is edited by hand any more — add a
 * project in the dashboard and the deploy hook rebuilds the site.
 *
 * Two shape changes from the old hardcoded array:
 *
 *  - Titles and descriptions are real columns (title_en / title_fr), not
 *    i18n keys pointing into en.json / fr.json. Use pickLang() to read them.
 *    That indirection was the thing that made adding a project a three-file
 *    edit in the first place.
 *  - liveUrl is null when there is no public site, where it used to be "#".
 */
import generated from "./projects.generated.json";

const byCategory = (cat) => generated.filter((p) => p.category === cat);

/** Normalises one API row into the shape the components read. */
const shape = (p) => ({
  id: p.id,
  category: p.category,
  title_en: p.title_en,
  title_fr: p.title_fr,
  description_en: p.description_en,
  description_fr: p.description_fr,
  technologies: p.technologies ?? [],
  image: p.image_url || "",
  liveUrl: p.live_url || "",
  githubUrl: p.github_url || "",
  featured: Boolean(p.featured),
  featuredOrder: p.featured_order ?? 0,
});

export const webProjects = byCategory("web").map(shape);
export const mobileProjects = byCategory("mobile").map(shape);
export const designProjects = byCategory("design").map(shape);
export const aiProjects = byCategory("ai").map(shape);

export const featuredProjects = generated
  .filter((p) => p.featured)
  .map(shape)
  /* featured_order is its own column: sort_order ranks a project inside its
     category page, this ranks it in the Featured grid — and phones show only
     the first six, so the order decides what they see. */
  .sort((a, b) => a.featuredOrder - b.featuredOrder || a.id - b.id);

export const totalProjectCount = generated.length;

/**
 * Reads the right language off a project.
 * i18next reports "fr", "fr-FR", "en-US"... so match on the prefix.
 */
export const pickLang = (project, language) => {
  const fr = String(language || "en").toLowerCase().startsWith("fr");
  return {
    title: (fr ? project.title_fr : project.title_en) || project.title_en,
    description:
      (fr ? project.description_fr : project.description_en) ||
      project.description_en,
  };
};
