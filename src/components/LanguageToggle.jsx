import { useTranslation } from 'react-i18next';
import './LanguageToggle.css';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLng = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLng);
    localStorage.setItem('language', newLng);

    /* Reflect the choice in the URL so the link stays shareable and each
       language has its own address for search engines. replaceState keeps it
       out of the back-button history — toggling twice shouldn't trap someone
       behind two back presses. */
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLng);
    window.history.replaceState({}, '', url);
  };

  return (
    <button
      className="language-toggle"
      onClick={toggleLanguage}
      aria-label="Toggle language"
      title={i18n.language === 'en' ? 'Français' : 'English'}
    >
      {i18n.language === 'en' ? '🇫🇷 FR' : '🇬🇧 EN'}
    </button>
  );
};

export default LanguageToggle;
