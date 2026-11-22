import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* New page → top. A URL with a hash (/#about, which the old /pages/hero
   now redirects to) scrolls to that section once it has rendered. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    /* "instant": a smooth scroll gets interrupted while the hero is still
       animating in, and stops short. */
    const id = setTimeout(
      () => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "instant" }),
      150,
    );
    return () => clearTimeout(id);
  }, [pathname, hash]);

  return null;
}
