import { useState, useEffect, useRef } from 'react';

export function useActiveSection(sectionIds, options = {}) {
  const [activeSection, setActiveSection] = useState('');
  const observerRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Trigger when 50% of the section is visible
      ...options,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds, options]);

  return activeSection;
}
