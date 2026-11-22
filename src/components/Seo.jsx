import { useTranslation } from "react-i18next";

const SITE = "https://www.sidickabdoulaye.com";

/* Per-language metadata for the homepage.
 *
 * The split with index.html is deliberate, because two different kinds of bot
 * read this page and only one of them runs JavaScript:
 *
 *   index.html  — static, English. What social scrapers (WhatsApp, LinkedIn,
 *                 Facebook, Slack) see. They do NOT execute JS, so the share
 *                 card is always English. Owns og:* and twitter:*.
 *   this file   — dynamic, per language. Google renders JS, so it sees these
 *                 and can index / (English) and /?lang=fr separately. Owns
 *                 <title>, description, canonical and hreflang.
 *
 * Nothing is declared in both places: react-helmet-async appends its tags
 * rather than replacing matching static ones, so overlapping here would leave
 * two of each in the <head> and let the crawler pick either.
 *
 * <html lang> is not set here — src/i18n.js owns it, and two systems writing
 * the same attribute left it empty.
 *
 * These are rendered as plain elements, not wrapped in <Helmet>. React 19
 * hoists <title>/<meta>/<link> into <head> natively, and that conflicts with
 * react-helmet-async 2.x: under React 19 Helmet was emitting <title> but
 * silently dropping every <meta> and <link>. (The same silent failure affects
 * the four project pages — see plan.md.)
 */
const Seo = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "fr" ? "fr" : "en";

  return (
    <>
      <title>{t("seo.title")}</title>
      <meta name="description" content={t("seo.description")} />

      {/* English is the plain URL, French adds ?lang=fr (same as the sitemap). */}
      <link rel="canonical" href={lang === "en" ? `${SITE}/` : `${SITE}/?lang=fr`} />
      <link rel="alternate" hrefLang="en" href={`${SITE}/`} />
      <link rel="alternate" hrefLang="fr" href={`${SITE}/?lang=fr`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE}/`} />
    </>
  );
};

export default Seo;
