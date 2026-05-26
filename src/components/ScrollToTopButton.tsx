"use client";

import { CaretUpIcon } from "@phosphor-icons/react/dist/ssr";
import { useRef, useState } from "react";

export default function ScrollToTopButton() {
  const [showToTop, setShowToTop] = useState(false);
  const scrollBefore = useRef(0);
  const isBrowser = typeof window !== "undefined";
  if (isBrowser) {
    setInterval(() => handleScroll(), 10);
  }

  function handleScroll() {
    if (scrollBefore.current !== window.scrollY) {
      if (window.scrollY >= 600 && !showToTop) {
        setShowToTop(true);
      }
      if (window.scrollY < 600 && showToTop) {
        setShowToTop(false);
      }
      scrollBefore.current = window.scrollY;
    }
  }
  return (
    <span className={`scroll-to-top ${showToTop ? "visible" : ""}`}>
      <a href="#top" aria-label="to-top"><CaretUpIcon weight="bold" /></a>
    </span>
  )
}