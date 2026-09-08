import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Navbar.css";
import Logo from "../../assets/Logo.svg";
import { RiContactsBook2Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import LanguageToggle from "../LanguageToggle";
import {
  MenuIcon,
  HomeIcon,
  SkillsIcon,
  ProjectsIcon,
  ServicesIcon,
} from "../common/Icons";

import { useActiveSection } from "../../hooks/useActiveSection";

/**
 * The nav, in the order the sections actually appear on the page.
 *
 * It used to list Contact before Services while the page renders Services
 * before Contact, so scrolling moved the highlight backwards.
 *
 * `match` is the set of section ids that light this item up. "Projects" points
 * at #work — the real, featured projects — and stays lit across the category
 * cards in #projects that follow it, so those don't need their own entry.
 */
const NAV_ITEMS = [
  { key: "home", label: "nav.home", href: "#home", match: ["home"], Icon: HomeIcon },
  { key: "about", label: "nav.about", href: "#about", match: ["about"], Icon: CgProfile },
  { key: "skills", label: "nav.skills", href: "#skills", match: ["skills"], Icon: SkillsIcon },
  {
    key: "projects",
    label: "nav.projects",
    href: "#work",
    match: ["work", "projects"],
    Icon: ProjectsIcon,
  },
  { key: "services", label: "nav.services", href: "#services", match: ["services"], Icon: ServicesIcon },
  { key: "contact", label: "nav.contact", href: "#contact", match: ["contact"], Icon: RiContactsBook2Line },
];

/* Derived, not hand-maintained: the watch list can't drift out of sync with
   the nav. #work was missing from the old hard-coded array, so the highlight
   went stale and kept showing Skills while you were reading Featured Work. */
const SECTION_IDS = NAV_ITEMS.flatMap((item) => item.match);

const Navbar = ({ scrolled = false }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  /* Tapping a link scrolled the page but left the mobile menu open on top of
     the section it had just scrolled to. */
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo">
        <img src={Logo} loading="lazy" alt="Logo" />
        <p className="nav-logo-text">
          <span>Sidick</span>Sino
        </p>
        <span className="nav-active" aria-hidden="true"></span>
      </div>

      {/* Nouveau bouton avec SVG animé */}
      <button
        className={`nav-toggle ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
      >
        <MenuIcon className="menu-icon" />
      </button>

      <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        {NAV_ITEMS.map((item) => {
          const { key, label, href, match } = item;
          /* Held as a local rather than destructured in the parameter list:
             eslint-plugin-react isn't installed, so ESLint can't tell that
             <Icon /> counts as a use. The config's varsIgnorePattern ^[A-Z_]
             covers variables but not arguments. */
          const Icon = item.Icon;
          const isActive = match.includes(activeSection);
          return (
            <li key={key}>
              <a
                href={href}
                onClick={closeMenu}
                className={isActive ? "active" : ""}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="mobile-icon">
                  <Icon />
                </span>
                {t(label)}
              </a>
            </li>
          );
        })}

        <li className="mobile-actions">
          <LanguageToggle />
        </li>
        <li className="mobile-cta">
          <a href="#contact" className="nav-cta" onClick={closeMenu}>
            {t("nav.getStarted")}
          </a>
        </li>
      </ul>

      <div className="nav-actions">
        <LanguageToggle />
        <a href="#contact" className="nav-cta">
          {t("nav.getStarted")}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
