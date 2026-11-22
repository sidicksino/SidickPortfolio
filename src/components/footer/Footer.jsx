import { useTranslation } from "react-i18next";
import SocialLinks from "../SocialLinks";
import "./Footer.css";

const LINKS = [
  { href: "#about", key: "nav.about" },
  { href: "#skills", key: "nav.skills" },
  { href: "#work", key: "nav.projects" },
  { href: "#services", key: "nav.services" },
  { href: "#contact", key: "nav.contact" },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="site-footer" id="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="footer-pitch">{t("footer.text")}</p>
            <a href="#contact" className="btn btn-primary">
              {t("cta.button")}
            </a>
          </div>

          <nav className="footer-col" aria-label={t("footer.navigation")}>
            <h4>{t("footer.navigation")}</h4>
            <ul>
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{t(link.key)}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h4>{t("footer.contact")}</h4>
            <ul>
              <li>
                <a href="mailto:sidickabdoulayesino1@gmail.com">sidickabdoulayesino1@gmail.com</a>
              </li>
              <li>
                <a href="tel:+250793225853">+250 793 22 58 53</a>
              </li>
              <li>
                {t("contact.ndjamena")} · {t("contact.kigali")}
              </li>
            </ul>
            <SocialLinks variant="footer" />
          </div>
        </div>

        {/* The oversized wordmark that closes the page. Decorative — the brand
            name is already read out by the logo at the top. */}
        <p className="footer-wordmark" aria-hidden="true">
          Sidick<span>Sino</span>
        </p>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Sidick Abdoulaye Hissein — {t("footer.rights")}
          </p>
          <a href="#home" className="footer-top-link">
            {t("footer.backToTop")} ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
