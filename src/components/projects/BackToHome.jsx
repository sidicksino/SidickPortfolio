import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import "./BackToHome.css";

/**
 * The four category routes render outside the "/" route element, so they get
 * no Navbar and no Footer — a visitor arriving from "View Project" had no way
 * back except the browser button. The site's own nav links are all "#section"
 * anchors, which do nothing from a sub-route, so this is a real Link to "/".
 */
const BackToHome = () => {
  const { t } = useTranslation();
  return (
    <Link to="/" className="back-home">
      <FaArrowLeft aria-hidden="true" />
      {t("projectsPage.backHome")}
    </Link>
  );
};

export default BackToHome;
