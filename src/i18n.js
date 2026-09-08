import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';

export const SUPPORTED_LANGUAGES = ['en', 'fr'];
export const DEFAULT_LANGUAGE = 'en';

/* Resolve the starting language, most explicit signal first.

   The `?lang=` parameter matters for more than convenience: with the language
   held only in localStorage, both translations lived on one URL, and a search
   engine can only index one version of a URL — so the French site was
   invisible to search. A distinct URL per language, declared with hreflang in
   index.html, makes both indexable and makes a shared link keep its language. */
const resolveInitialLanguage = () => {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (SUPPORTED_LANGUAGES.includes(fromUrl)) return fromUrl;

  const stored = localStorage.getItem('language');
  if (SUPPORTED_LANGUAGES.includes(stored)) return stored;

  // Fall back to the browser's preference before defaulting.
  const fromBrowser = (navigator.language || '').slice(0, 2).toLowerCase();
  if (SUPPORTED_LANGUAGES.includes(fromBrowser)) return fromBrowser;

  return DEFAULT_LANGUAGE;
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    fr: { translation: frTranslations }
  },
  lng: resolveInitialLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  interpolation: {
    escapeValue: false
  }
});

/* Keep <html lang> honest.
   index.html hard-coded lang="fr" while this defaults to English, so screen
   readers and translation tools were told the wrong language for most
   visitors. Sync it on boot and on every switch. */
const syncHtmlLang = (lng) => {
  document.documentElement.setAttribute('lang', lng);
};

syncHtmlLang(i18n.language);
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
