import SinoAi from "../assets/sino-ai.png";
import SinoCoffee from "../assets/SinoCoffee.png";
import Insta from "../assets/insta.png";
import SinoEcommerce from "../assets/team-work.png";

export const webProjects = [
  {
    id: 1,
    titleKey: 'projects.items.web.1.title',
    descriptionKey: 'projects.items.web.1.description',
    technologies: [
      "React",
      "Vite",
      "Supabase",
      "TypeScript",
      "Tailwind CSS",
      "shadcn-ui",
    ],
    image: SinoCoffee,
    liveUrl: "https://sino-coffee.vercel.app/",
    githubUrl: "https://github.com/sidicksino/SinoCoffee",
  },
  {
    id: 2,
    titleKey: 'projects.items.web.2.title',
    descriptionKey: 'projects.items.web.2.description',
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "OpenAI API",
      "Tailwind CSS",
      "Axios",
    ],
    image: SinoAi,
    liveUrl: "https://sinoai-chi.vercel.app/",
    githubUrl: "https://github.com/sidicksino/sino_Ai",
  },
  {
    id: 3,
    titleKey: 'projects.items.web.3.title',
    descriptionKey: 'projects.items.web.3.description',
    technologies: ["HTML", "CSS", "JavaScript", "MySQL"],
    image: Insta,
    liveUrl: "https://insta-uxnh.onrender.com/",
    githubUrl: "https://github.com/sidicksino/insta_abeche",
  },
  {
    id: 4,
    titleKey: 'projects.items.web.4.title',
    descriptionKey: 'projects.items.web.4.description',
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "MySQL"],
    image: SinoEcommerce,
    liveUrl: "https://team-work-30tj.onrender.com/",
    githubUrl: "https://github.com/sidicksino/team_work",
  },
];

// Placeholder arrays for other categories - can be populated as they are discovered or needed
export const mobileProjects = [];
export const designProjects = [];
export const aiProjects = [];
