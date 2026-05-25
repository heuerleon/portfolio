"use client";

import { type PropsWithChildren, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeProvider({ children }: PropsWithChildren<{}>) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
