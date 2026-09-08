import { useState, useEffect } from "react";

/**
 * Which section is the reader currently looking at.
 *
 * Rewritten 2026-09-08. The previous version used `threshold: 0.5`, which asks
 * "is half of this section on screen" — impossible for any section taller than
 * twice the viewport, so tall sections could never become active. `#work` is
 * 1541px and would have failed on any screen under 770px tall.
 *
 * Instead this observes a thin horizontal BAND across the upper viewport
 * (25%–35% of its height, just below the fixed navbar) and marks whichever
 * section crosses it. Section height stops mattering entirely.
 *
 * When two sections overlap the band — which happens for a moment at every
 * boundary — the topmost wins, so the highlight moves in reading order rather
 * than whichever entry the observer happened to report last.
 *
 * `sectionIds` must be a stable reference (define it outside the component).
 * The old signature took an `options` object defaulting to `{}` — a fresh
 * object on every render, sitting in the effect's dependency array, which tore
 * down and rebuilt the observer on every single render.
 */
export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    // id -> distance from the top of the viewport, for the ones in the band
    const inBand = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            inBand.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            inBand.delete(entry.target.id);
          }
        }

        // Nothing in the band (e.g. resting on the footer): keep the last
        // answer rather than clearing the highlight entirely.
        if (inBand.size === 0) return;

        const [topmost] = [...inBand.entries()].sort((a, b) => a[1] - b[1])[0];
        setActiveSection((prev) => (prev === topmost ? prev : topmost));
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
