import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import "./Hero.css";
import heroImage from "../../assets/hero-cutout.webp";
import MyPDF from "../../assets/sidick.pdf";
import SocialLinks from "../SocialLinks";

/* Three orbit rings. `size` is a fraction of the stage height; each one
   spins at its own speed so the rings never line up the same way twice. */
const RINGS = [
  { size: 0.68, className: "ring ring--a" },
  { size: 0.85, className: "ring ring--b ring--dash" },
  { size: 0.98, className: "ring ring--c" },
];

const CHIPS = [
  { label: "Python · TensorFlow", className: "hero-chip hero-chip--1" },
  { label: "React · React Native", className: "hero-chip hero-chip--2" },
  { label: "Node.js · MongoDB", className: "hero-chip hero-chip--3" },
];

/* Each ring is drawn twice: once behind the portrait and once in front,
   clipped to its lower half. That's what makes the rings pass behind his back
   and in front of his chest without any real 3D engine. */
const Orbit = ({ front = false }) => (
  <div className={`orbit ${front ? "orbit--front" : ""}`} aria-hidden="true">
    <div className="orbit-tilt">
      {RINGS.map((ring) => (
        <div key={ring.className} className={ring.className} style={{ "--size": ring.size }}>
          <span className="ring-rider" />
        </div>
      ))}
    </div>
  </div>
);

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] },
});

const Hero = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const portraitRef = useRef(null);

  /* Pointer drives two CSS variables: the ring tilt and the spotlight. They're
     written straight to the element inside requestAnimationFrame, so moving
     the mouse never re-renders React. Skipped for coarse pointers (touch) and
     for people who prefer less motion. */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return undefined;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return undefined;

    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", (x * 2 - 1).toFixed(3));
        el.style.setProperty("--my", (y * 2 - 1).toFixed(3));
        el.style.setProperty("--px", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--py", `${(y * 100).toFixed(1)}%`);
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  /* The scan lens: hovering the portrait reveals a "scanned" circle of it
     (accent dot-matrix over a dimmed photo, like the Scan concept) that
     follows the cursor. Position goes straight into CSS variables, again
     without re-rendering. Touch screens have no hover, so they skip it. */
  useEffect(() => {
    const el = portraitRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return undefined;

    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--sx", `${(e.clientX - r.left).toFixed(1)}px`);
        el.style.setProperty("--sy", `${(e.clientY - r.top).toFixed(1)}px`);
      });
    };
    const onEnter = (e) => {
      onMove(e);
      el.classList.add("is-scanning");
    };
    const onLeave = () => el.classList.remove("is-scanning");
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-spot" aria-hidden="true" />

      <div className="container hero-layout">
        <div className="hero-copy">
          <motion.p className="hero-eyebrow" {...fadeUp(0)}>
            <span className="hero-dot" aria-hidden="true" />
            {t("hero.eyebrow")}
          </motion.p>

          <motion.h1 className="hero-title" {...fadeUp(0.1)}>
            {t("hero.hello")}
            <br />
            <em>{t("hero.name")}</em>
          </motion.h1>

          <motion.p className="hero-lead" {...fadeUp(0.2)}>
            {t("hero.lead")}
          </motion.p>

          <motion.div className="hero-actions" {...fadeUp(0.3)}>
            <a href="#work" className="btn btn-primary">
              {t("hero.ctaWork")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href={MyPDF} download="Sidick_CV.pdf" className="btn btn-ghost">
              {t("hero.downloadCV")}
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.4)}>
            <SocialLinks variant="hero" />
          </motion.div>
        </div>

        <div className="hero-stage">
          <div className="hero-halo" aria-hidden="true" />
          <Orbit />
          <div
            className="hero-portrait-wrap"
            ref={portraitRef}
            style={{ "--portrait": `url(${heroImage})` }}
          >
            <motion.img
              className="hero-portrait"
              src={heroImage}
              alt={t("hero.portraitAlt")}
              fetchPriority="high"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
            />
            {/* Each layer is masked twice: to his silhouette (the image's own
                alpha) and to a circle at the cursor. */}
            <span className="hero-scan hero-scan--dim" aria-hidden="true" />
            <span className="hero-scan hero-scan--dots" aria-hidden="true" />
            <span className="hero-scan hero-scan--line" aria-hidden="true" />
            <span className="hero-scan-ring" aria-hidden="true">
              <span className="hero-scan-label">{t("hero.scanning")}</span>
            </span>
          </div>
          <Orbit front />

          {CHIPS.map((chip) => (
            <span key={chip.label} className={chip.className} aria-hidden="true">
              <i />
              {chip.label}
            </span>
          ))}

          <div className="hero-badge" aria-hidden="true">
            <svg viewBox="0 0 150 150">
              <defs>
                <path id="hero-badge-circle" d="M75 75 m-58 0 a58 58 0 1 1 116 0 a58 58 0 1 1 -116 0" />
              </defs>
              <circle cx="75" cy="75" r="72" className="hero-badge-bg" />
              <g className="hero-badge-ring">
                <text className="hero-badge-text">
                  <textPath href="#hero-badge-circle">{t("hero.badge")}</textPath>
                </text>
              </g>
              <path d="M66 75h18M77 68l7 7-7 7" className="hero-badge-arrow" />
            </svg>
          </div>
        </div>
      </div>

      <a href="#about" className="hero-scroll">
        <span>{t("hero.scroll")}</span>
        <span className="hero-scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
};

export default Hero;
