/**
 * The brand colours a visitor can switch between from the navbar.
 *
 * Every one was contrast-tested in both themes (dark text on the fill,
 * accent text on the dark page, and the derived --accent-strong on the light
 * page). Add a new one only after the same check — see SKILL.md.
 *
 * The site's DEFAULT is still the one line `--accent` in src/index.css; a
 * choice made here is saved per browser and layered on top of it.
 */
export const ACCENTS = [
  { id: "magenta", hex: "#e748c8" },
  { id: "aqua", hex: "#2dd4bf" },
  { id: "violet", hex: "#8b7cff" },
  { id: "lime", hex: "#a3e635" },
];

export const ACCENT_STORAGE_KEY = "accent";

/* The logo mark's paths, for the tab icon. Kept here so the favicon can be
   redrawn in the chosen colour — a static favicon.svg can't read page CSS. */
const LOGO_PATHS = [
  "M0.408432 42.4989L15.9084 49.9989L0.000228882 27L0.408432 42.4989Z",
  "M46.8148 14.2177V39.2114C46.7992 39.5143 46.7119 39.8091 46.5602 40.0717C46.4084 40.3343 46.1965 40.5571 45.9419 40.7218L45.1231 41.2114L45.0681 41.2433L45.0639 41.2457C41.0029 43.5961 37.4243 45.6674 33.8086 47.7531V20.7239L10.4065 7.19476C12.0875 6.22971 13.7661 5.26072 15.4445 4.2918C17.8097 2.92638 20.1747 1.56112 22.5461 0.207257C22.8165 0.0709844 23.1151 0 23.4179 0C23.7208 0 24.0194 0.0709844 24.2898 0.207257L46.8106 13.2135V14.2177H46.8148Z",
  "M28.6044 23.7218C23.2628 20.6333 17.9197 17.5472 12.5752 14.4635C12.3043 14.3288 12.0059 14.2587 11.7034 14.2587C11.4008 14.2587 11.1024 14.3288 10.8315 14.4635C7.22037 16.5468 3.60995 18.6329 0.000228882 20.7218L16.9023 30.4802V49.9989C18.0127 49.3585 19.1222 48.7165 20.2318 48.0745C22.728 46.6301 25.2242 45.1857 27.7294 43.7593C27.9826 43.5936 28.1934 43.3708 28.345 43.1089C28.4966 42.8469 28.5847 42.5531 28.6023 42.251L28.6044 23.7218Z",
];

const setFavicon = (hex) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 53" fill="${hex}">${LOGO_PATHS.map(
    (d) => `<path fill-rule="evenodd" d="${d}"/>`,
  ).join("")}</svg>`;
  const link = document.querySelector('link[rel="icon"]');
  if (link) link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

/** The colour the stylesheet ships with, ignoring any override. */
export const getDefaultAccent = () => {
  const root = document.documentElement;
  const override = root.style.getPropertyValue("--accent");
  root.style.removeProperty("--accent");
  const value = getComputedStyle(root).getPropertyValue("--accent").trim().toLowerCase();
  if (override) root.style.setProperty("--accent", override);
  return value;
};

/**
 * Apply a colour site-wide. Every accent shade in index.css is derived from
 * --accent, so setting this one property recolours the whole page. Pass null
 * to fall back to the stylesheet's default.
 */
export const applyAccent = (hex) => {
  const root = document.documentElement;
  if (hex) root.style.setProperty("--accent", hex);
  else root.style.removeProperty("--accent");
  setFavicon(hex || getDefaultAccent());
};
