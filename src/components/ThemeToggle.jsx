import { m } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "./theme/useTheme";
import "./ThemeToggle.css";

/**
 * Compact sun/moon button. It used to float fixed in the bottom-right corner;
 * that corner now belongs to the chat assistant, so this lives in the Navbar
 * (and next to "Back to portfolio" on the sub-pages). The <html> class itself
 * is applied by ThemeProvider, so this component only flips the value.
 */
function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";
  const label = isDark ? t("nav.lightMode") : t("nav.darkMode");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`.trim()}
      aria-label={label}
      title={label}
    >
      <m.span
        key={theme}
        className="theme-toggle-icon"
        initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      >
        {/* Shows the mode you will switch TO, like most sites. */}
        {isDark ? <FiSun /> : <FiMoon />}
      </m.span>
    </button>
  );
}

export default ThemeToggle;
