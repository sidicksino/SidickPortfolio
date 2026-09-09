import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import BackToHome from "./projects/BackToHome";
import "./NotFound.css";

/**
 * Catch-all for unmatched routes.
 *
 * vercel.json rewrites every path to index.html so the SPA can handle its own
 * routing, which means an unknown URL returns HTTP 200 with an empty <Routes>
 * — a blank page, no error, no way out. This gives it something to say.
 *
 * Reuses <BackToHome /> rather than a second link: same styling, same
 * already-translated "Back to portfolio" string.
 */
const NotFound = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  /* The server still answered 200 (the SPA rewrite), so tell crawlers not to
     index this. Removed on unmount so it cannot leak onto a real page. */
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <main className="nf">
      <p className="nf-code">404</p>
      <h1>{t("notFound.title")}</h1>
      <p className="nf-text">{t("notFound.text")}</p>
      <code className="nf-path">{pathname}</code>
      <BackToHome />
    </main>
  );
};

export default NotFound;
