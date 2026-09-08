import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    fr: { translation: frTranslations }
  },
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

/* Keep <html lang> honest.
   index.html hard-codes lang="fr" while this defaults to English, so screen
   readers and translation tools were told the wrong language for most
   visitors. Sync it on boot and on every switch. */
const syncHtmlLang = (lng) => {
  document.documentElement.setAttribute('lang', lng);
};

syncHtmlLang(i18n.language);
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
