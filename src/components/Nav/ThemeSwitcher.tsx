import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";
import styles from "./Nav.module.scss"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={styles.themeSwitcher}>
      <button
        onClick={() => {
          const newTheme = theme === "light" ? "dark" : "light";
          setTheme(newTheme);
        }}
      >
        {theme === "light" ? (
          <SunIcon className={styles.icon} weight="bold" />
        ) : (
          <MoonIcon className={styles.icon} weight="bold" />
        )}
      </button>
    </div>
  );
}
