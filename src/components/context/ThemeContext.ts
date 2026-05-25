"use client";

import { createContext } from "react";

export type ThemeContextValue = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
});