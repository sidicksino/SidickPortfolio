import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import { socialLinks } from "../data/siteData";
import "./SocialLinks.css";

const ICONS = { FaGithub, FaLinkedin, FaFacebook, FaTwitter };

/**
 * Shared social row. The links live in src/data/siteData.js so the hero, the
 * footer and /pages/hero can't drift apart — they already had, with two
 * different LinkedIn URLs live at once and a Twitter link returning 404.
 *
 * The class is `social-row`, deliberately NOT `social-links`: HeroPage.css
 * already owns that name, and CSS here isn't scoped.
 *
 * `variant` changes size and spacing. `showLabels` renders the network name
 * beside the icon (used on /pages/hero, which had that treatment already).
 */
const SocialLinks = ({ variant = "default", showLabels = false, className = "" }) => (
  <ul
    className={`social-row social-row--${variant}${
      showLabels ? " social-row--labelled" : ""
    } ${className}`.trim()}
  >
    {socialLinks.map(({ id, label, icon, url }) => {
      const Icon = ICONS[icon];
      if (!Icon) return null;
      return (
        <li key={id}>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={showLabels ? undefined : label}
            title={label}
          >
            <Icon aria-hidden="true" />
            {showLabels && <span>{label}</span>}
          </a>
        </li>
      );
    })}
  </ul>
);

export default SocialLinks;
