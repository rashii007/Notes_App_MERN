import { useTheme } from "../context/ThemeContext";

const ThemeButton = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 dark:bg-yellow-100 dark:text-black dark:hover:bg-yellow-200 transition-all duration-300"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeButton;