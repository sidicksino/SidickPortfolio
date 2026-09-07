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
