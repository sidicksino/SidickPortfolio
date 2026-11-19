import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle";
import "./BackToHome.css";

/**
 * The four category routes render outside the "/" route element, so they get
 * no Navbar and no Footer — a visitor arriving from "View Project" had no way
 * back except the browser button. The site's own nav links are all "#section"
 * anchors, which do nothing from a sub-route, so this is a real Link to "/".
 *
 * With no Navbar here, this bar also carries the theme toggle (it used to float
 * bottom-right on every page; that corner is now the chat assistant's).
 */
const BackToHome = () => {
  const { t } = useTranslation();
  return (
    <div className="back-home-bar">
      <Link to="/" className="back-home">
        <FaArrowLeft aria-hidden="true" />
        {t("projectsPage.backHome")}
      </Link>
      <ThemeToggle />
    </div>
  );
};

export default BackToHome;
