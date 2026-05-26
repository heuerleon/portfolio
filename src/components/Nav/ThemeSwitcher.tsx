import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="theme-switcher">
      <button
        onClick={() => {
          const newTheme = theme === "light" ? "dark" : "light";
          setTheme(newTheme);
        }}
      >
        {theme === "light" ? (
          <SunIcon className="icon" weight="bold" size={24} />
        ) : (
          <MoonIcon className="icon" weight="bold" size={24} />
        )}
      </button>
    </div>
  );
}
