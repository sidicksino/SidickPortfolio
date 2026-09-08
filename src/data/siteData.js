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
  {
    id: "data",
    icon: FaChartBar,
    color: "var(--fam-1)",
    titleKey: 'skills.data',
    desc: "R, Pandas, NumPy, Scikit-learn, TensorFlow, Power BI, Tableau, Matplotlib, Seaborn",
  },
  {
    id: "frontend",
    icon: FaCode,
    color: "var(--fam-2)",
    titleKey: 'skills.frontend',
    desc: "HTML, CSS, JavaScript, React.js, React Native",
  },
  {
    id: "backend",
    icon: FaDatabase,
    color: "var(--fam-3)",
    titleKey: 'skills.backend',
    desc: "Python, Node.js, SQL, MySQL, MongoDB",
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
    url: "https://www.linkedin.com/in/sidick-abdoulaye-sino-72153a384",
    brand: "var(--brand-linkedin)",
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: "FaFacebook",
    url: "https://www.facebook.com/share/1BTDC1znZD/?mibextid=wwXIfr",
    brand: "var(--brand-facebook)",
  },
];
