import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Skills from "./components/skills/Skills";
import Projects from "./components/project/Projects"
function App() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          transformOrigin: "0%",
          backgroundColor: "#0033A0",
          zIndex: 9999,
        }}
      />

      <Navbar scrolled={scrolled} />
      <Hero />
      <About />
      <Skills />
      <Projects />
    </>
  );
}

export default App;