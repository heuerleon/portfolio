import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="theme-switcher">
      <button onClick={() => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
      }}>
        {theme === "light" ? (<Sun className="icon" />) : (<Moon className="icon" />)}
      </button>
    </div>
  );
}
