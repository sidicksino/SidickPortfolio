import { useEffect } from "react";
import { useTheme } from "./ThemeContext";
import { motion } from 'framer-motion';
import './ThemeToggle.css'
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  // Applique la classe sur <html> quand le thème change
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "light") {
      html.classList.add("light-theme");
    } else {
      html.classList.remove("light-theme");
    }
  }, [theme]);

  return (
    <motion.button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Activer le mode ${theme === "dark" ? "clair" : "sombre"}`}
      title={`Changer pour le mode ${theme === "dark" ? "clair" : "sombre"}`}
    >
      <div className="toggle-icon">
        {theme === "dark" ? (
          <>
            <motion.div
              className="sun"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              ☀️
            </motion.div>
            <motion.div
              className="moon"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0.5 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              🌙
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              className="sun"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0.5 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              ☀️
            </motion.div>
            <motion.div
              className="moon"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              🌙
            </motion.div>
          </>
        )}
      </div>
    </motion.button>
  );
}

export default ThemeToggle;