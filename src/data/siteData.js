import {
  FaLaptopCode,
  FaMobileAlt,
  FaPaintBrush,
  FaBrain,
  FaChartBar,
  FaCode,
  FaDatabase,
} from "react-icons/fa";

export const mainProjectsData = [
  {
    id: "web-app",
    titleKey: 'projects.webProjects',
    icon: FaLaptopCode,
    desc: 'projects.webDescription',
    link: "/projects/web",
    color: "var(--cat-web)",
  },
  {
    id: "mobile-app",
    titleKey: 'projects.mobileProjects',
    icon: FaMobileAlt,
    desc: 'projects.mobileDescription',
    link: "/projects/mobile",
    color: "var(--cat-mobile)",
  },
  {
    id: "design",
    titleKey: 'projects.designProjects',
    icon: FaPaintBrush,
    desc: 'projects.designDescription',
    link: "/projects/design",
    color: "var(--cat-design)",
  },
  {
    id: "ml-ai",
    titleKey: 'projects.aiProjects',
    icon: FaBrain,
    desc: 'projects.aiDescription',
    link: "/projects/ai",
    color: "var(--cat-ai)",
  },
];

export const skillsData = [
  /* Every technology shown in the TechCubes cluster appears in exactly one
     category here. The picture and the list have to agree — an all-frontend
     image over a data-science list was the original reason to redo it, and
     Figma / Expo were showing in the cubes with no home in the text.
     Tool lists live in the locale files like every other user-facing string. */
  {
    id: "data",
    icon: FaChartBar,
    color: "var(--fam-1)",
    titleKey: "skills.data",
    descKey: "skills.dataTools",
  },
  {
    id: "frontend",
    icon: FaCode,
    color: "var(--fam-2)",
    titleKey: "skills.frontend",
    descKey: "skills.frontendTools",
  },
  {
    id: "mobile",
    icon: FaMobileAlt,
    color: "var(--fam-3)",
    titleKey: "skills.mobile",
    descKey: "skills.mobileTools",
  },
  {
    id: "backend",
    icon: FaDatabase,
    color: "var(--fam-4)",
    titleKey: "skills.backend",
    descKey: "skills.backendTools",
  },
];

export const servicesData = [
  'services.webDevelopment',
  'services.uiDesign',
  'services.consulting',
];

/* ---------------------------------------------------------------------------
   SOCIAL LINKS — one definition, consumed by the hero, the footer and
   /pages/hero.

   These were previously hard-coded in all three components, which had already
   caused two problems: two different LinkedIn URLs were live at once, and
   /pages/hero linked to a Twitter account that returns 404.

   `icon` is the react-icons name; components map it to the component so this
   file stays free of JSX imports.

   `brand` names a token, never a raw hex — the values live in index.css so
   GitHub's can differ per theme.
   This is a deliberate, narrow exception to the one-accent rule: people
   recognise these marks by colour, and a GitHub icon that turns magenta reads
   as a theme, not as GitHub. Nothing else on the site may use them.
--------------------------------------------------------------------------- */
export const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    icon: "FaGithub",
    url: "https://github.com/sidicksino",
    brand: "var(--brand-github)",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "FaLinkedin",
    url: "https://www.linkedin.com/in/sidick-sino",
    brand: "var(--brand-linkedin)",
  },
  /* Tracking parameters stripped from the URLs Sidick supplied:
       ?stkn=… &utm_source=qr           (Instagram — a token tied to his device)
       ?s=11                            (X — the app's share-source marker)
       ?utm_source=share_via&…=member_ios (LinkedIn — iOS share-sheet markers)
     They add nothing, and the Instagram one is personal to the device that
     generated the QR code. An entry with an empty `url` is skipped entirely,
     so a network can wait for its handle without rendering a dead link. */
  {
    id: "instagram",
    label: "Instagram",
    icon: "FaInstagram",
    url: "https://www.instagram.com/sidick_abdoulaye_sino",
    brand: "var(--brand-instagram)",
    glow: "var(--brand-instagram-glow)",
  },
  {
    id: "x",
    label: "X",
    icon: "FaXTwitter",
    url: "https://x.com/sinobour",
    brand: "var(--brand-x)",
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: "FaFacebook",
    url: "https://www.facebook.com/share/1BTDC1znZD/?mibextid=wwXIfr",
    brand: "var(--brand-facebook)",
  },
];
