import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar scrolled={scrolled} />
      <Hero />
    </>
  );
}

export default App;