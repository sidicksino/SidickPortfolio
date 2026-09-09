import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Skills from "./components/skills/Skills";
import Featured from "./components/featured/Featured";
import Projects from "./components/project/Projects";
import Services from "./components/services/Services";
import Footer from "./components/footer/Footer";
import Contact from "./components/contact/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Seo from "./components/Seo";
import ThemeToggle from "./components/ThemeToggle";
import HeroPage from "./components/pages/HeroPage";

/* GSAP was imported and its plugins registered here, but the only component
   that ever used it is <Art />, which is disabled. That pulled the whole of
   gsap + ScrollTrigger + SplitText into the main bundle for nothing. If Art is
   re-enabled, register the plugins inside Art.jsx where they're used. */

// Lazy Load Project Pages
const WebProjects = lazy(() => import("./components/projects/WebProjects"));
const MobileProjects = lazy(
  () => import("./components/projects/MobileProjects"),
);
const DesignProjects = lazy(
  () => import("./components/projects/DesignProjects"),
);
const AIProjects = lazy(() => import("./components/projects/AIProjects"));
/* Admin is lazy like the project pages: visitors never load it. */
const Admin = lazy(() => import("./components/admin/Admin"));

function App() {
  return (
    <>
      {/* framer-motion animates in JS, so the CSS reduced-motion reset in
          index.css can't reach it. "user" makes it follow the OS setting. */}
      <MotionConfig reducedMotion="user">
        <ScrollToTop />
        <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Seo />
                  <Navbar />
                  <Hero />
                  <About />
                  <Skills />
                  {/* Real work first, category navigation after it */}
                  <Featured />
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

            <Route path="/admin" element={<Admin />} />

            <Route path="/pages/hero" element={<HeroPage />} />
          </Routes>
        </Suspense>
        <ThemeToggle />
      </MotionConfig>
    </>
  );
}

export default App;
