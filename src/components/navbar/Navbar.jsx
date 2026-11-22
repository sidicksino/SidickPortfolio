import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Navbar.css";
import LogoMark from "../common/LogoMark";
import LanguageToggle from "../LanguageToggle";
import ThemeToggle from "../ThemeToggle";
import { CloseIcon, MenuIcon } from "../common/Icons";
import { useActiveSection } from "../../hooks/useActiveSection";

/**
 * The nav, in the order the sections appear on the page. `match` is the set
 * of section ids that light an item up — About stays lit through the globe
 * section that follows it, Work through the whole project grid.
 */
const NAV_ITEMS = [
  { key: "about", label: "nav.about", href: "#about", match: ["about", "where"] },
  { key: "skills", label: "nav.skills", href: "#skills", match: ["skills"] },
  { key: "work", label: "nav.projects", href: "#work", match: ["work"] },
  { key: "services", label: "nav.services", href: "#services", match: ["services"] },
  { key: "contact", label: "nav.contact", href: "#contact", match: ["contact"] },
];

/* Derived, so the watch list can't drift out of sync with the nav. */
const SECTION_IDS = ["home", ...NAV_ITEMS.flatMap((item) => item.match)];

const Navbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  /* Transparent over the hero, a blurred bar once the page moves. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock the page behind the drawer, or iOS keeps scrolling underneath it. */
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Outside <nav> on purpose: the bar's backdrop-filter would make it the
          containing block for this fixed overlay. */}
      <div
        className={`nav-backdrop ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <nav className={`navbar ${scrolled || isMenuOpen ? "scrolled" : ""}`} aria-label="Main">
        <div className="navbar-inner">
          <a href="#home" className="nav-logo" onClick={closeMenu}>
            <LogoMark className="nav-logo-mark" />
            <span className="nav-logo-text">
              Sidick<span>Sino</span>
            </span>
            {/* The green status dot — a deliberate exception, see SKILL.md */}
            <span className="nav-active" aria-hidden="true"></span>
          </a>

          <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            {NAV_ITEMS.map(({ key, label, href, match }, i) => {
              const isActive = match.includes(activeSection);
              return (
                <li key={key}>
                  <a
                    href={href}
                    onClick={closeMenu}
                    className={isActive ? "active" : ""}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="nav-index" aria-hidden="true">
                      0{i + 1}
                    </span>
                    {t(label)}
                  </a>
                </li>
              );
            })}
            <li className="nav-drawer-only">
              <LanguageToggle />
            </li>
            <li className="nav-drawer-only">
              <a href="#contact" className="btn btn-primary" onClick={closeMenu}>
                {t("nav.getStarted")}
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            <span className="nav-desktop-only">
              <LanguageToggle />
            </span>
            <ThemeToggle />
            <a href="#contact" className="btn btn-primary nav-cta nav-desktop-only">
              {t("nav.getStarted")}
            </a>
            <button
              className="nav-toggle"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <CloseIcon className="menu-icon" /> : <MenuIcon className="menu-icon" />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
