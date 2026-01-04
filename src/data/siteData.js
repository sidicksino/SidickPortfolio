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
    color: "#6366f1",
  },
  {
    id: "mobile-app",
    titleKey: 'projects.mobileProjects',
    icon: FaMobileAlt,
    desc: 'projects.mobileDescription',
    link: "/projects/mobile",
    color: "#8b5cf6",
  },
  {
    id: "design",
    titleKey: 'projects.designProjects',
    icon: FaPaintBrush,
    desc: 'projects.designDescription',
    link: "/projects/design",
    color: "#ec4899",
  },
  {
    id: "ml-ai",
    titleKey: 'projects.aiProjects',
    icon: FaBrain,
    desc: 'projects.aiDescription',
    link: "/projects/ai",
    color: "#f59e0b",
  },
];

export const skillsData = [
  {
    id: "data",
    icon: FaChartBar,
    titleKey: 'skills.data',
    desc: "R, Pandas, NumPy, Scikit-learn, TensorFlow, Power BI, Tableau, Matplotlib, Seaborn",
  },
  {
    id: "frontend",
    icon: FaCode,
    titleKey: 'skills.frontend',
    desc: "HTML, CSS, JavaScript, React.js, React Native",
  },
  {
    id: "backend",
    icon: FaDatabase,
    titleKey: 'skills.backend',
    desc: "Python, Node.js, SQL, MySQL, PostgreSQL, MongoDB",
  },
];

export const servicesData = [
  'services.webDevelopment',
  'services.uiDesign',
  'services.consulting',
];
