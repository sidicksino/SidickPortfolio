import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Skills from "./components/skills/Skills";
import Projects from "./components/project/Projects";
import Services from "./components/services/Services";
import Footer from "./components/footer/Footer";
import Contact from "./components/contact/Contact";

import WebProjects from "./components/projects/WebProjects";
import MobileProjects from "./components/projects/MobileProjects";
import DesignProjects from "./components/projects/DesignProjects";
import AIProjects from "./components/projects/AIProjects";
import ScrollToTop from "./components/ScrollToTop";
import ThemeToggle from "./components/ThemeToggle";

import HeroPage from "./components/pages/HeroPage";
import Art from "./components/art/Art";

import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <About />
              <Skills />
              <Art />
              <Projects />
              <Services />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/projects/web" element={<WebProjects />} />
        <Route path="/projects/mobile" element={<MobileProjects />} />
        <Route path="/projects/design" element={<DesignProjects />} />
        <Route path="/projects/ai" element={<AIProjects />} />

        <Route path="/pages/hero" element={<HeroPage />} />
      </Routes>
      <ThemeToggle />
    </>
  );
}

export default App;
