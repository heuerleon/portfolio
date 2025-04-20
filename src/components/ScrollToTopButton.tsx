"use client";

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
    return(
        <span className={`scroll-to-top ${showToTop ? "visible" : ""}`}>
          <a href="#top" aria-label="to-top"><i className="fas fa-chevron-up"></i></a>
        </span>
    )
}