import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Skills from "./components/skills/Skills";
import Projects from "./components/project/Projects";
import Services from "./components/services/Services";
import Footer from "./components/footer/Footer";
import Contact from "./components/contact/Contact";
import ScrollToTop from "./components/ScrollToTop";
import ThemeToggle from "./components/ThemeToggle";
import HeroPage from "./components/pages/HeroPage";
import Art from "./components/art/Art";

import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger, SplitText);

// Lazy Load Project Pages
const WebProjects = lazy(() => import("./components/projects/WebProjects"));
const MobileProjects = lazy(() => import("./components/projects/MobileProjects"));
const DesignProjects = lazy(() => import("./components/projects/DesignProjects"));
const AIProjects = lazy(() => import("./components/projects/AIProjects"));

function App() {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Services />
                {/* <Art /> */}
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
      </Suspense>
      <ThemeToggle />
    </HelmetProvider>
  );
}

export default App;
