import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { socialLinks } from "../data/siteData";
import "./SocialLinks.css";

const ICONS = { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaXTwitter };

/**
 * Shared social row. The links live in src/data/siteData.js so the hero, the
 * footer and /pages/hero can't drift apart — they already had, with two
 * different LinkedIn URLs live at once and a Twitter link returning 404.
 *
 * Entries with an empty `url` are skipped, so a network can sit in the data
 * waiting for its handle without ever rendering a dead link.
 *
 * The class is `social-row`, deliberately NOT `social-links`: HeroPage.css
 * already owns that name, and CSS here isn't scoped.
 *
 * `variant` changes size and spacing. `showLabels` renders the network name
 * beside the icon (used on /pages/hero, which had that treatment already).
 */
const SocialLinks = ({ variant = "default", showLabels = false, className = "" }) => {
  const live = socialLinks.filter((s) => s.url && s.url.trim() && ICONS[s.icon]);
  if (live.length === 0) return null;

  return (
    <ul
      className={`social-row social-row--${variant}${
        showLabels ? " social-row--labelled" : ""
      } ${className}`.trim()}
    >
      {live.map(({ id, label, icon, url, brand, glow }) => {
        const Icon = ICONS[icon];
        return (
          <li key={id}>
            <a
              style={{ "--brand": brand, "--glow": glow ?? brand }}
              href={url.trim()}
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
};

export default SocialLinks;
