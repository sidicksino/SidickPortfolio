import { useEffect } from "react";
import { useTheme } from "./ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  console.log("Current theme:", theme);

  const html = document.documentElement;
  if (theme === "light") {
    html.classList.add("light-theme");
  } else {
    html.classList.remove("light-theme");
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-5 right-5 z-50 p-3 rounded-full shadow-lg transition duration-300 bg-primary text-white hover:scale-110"
      title="Toggle theme"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;
