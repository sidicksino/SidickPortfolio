import { useTranslation } from 'react-i18next';
import './LanguageToggle.css';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLng = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLng);
    localStorage.setItem('language', newLng);
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
