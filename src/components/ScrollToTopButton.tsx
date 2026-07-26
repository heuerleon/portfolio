"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function ScrollToTopButton() {
  const t = useTranslations("Common");
  const [showToTop, setShowToTop] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setShowToTop(window.scrollY >= 600);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span className={`scroll-to-top ${showToTop ? "visible" : ""}`}>
      <a href="#top" aria-label={t("toTop")}><i className="fas fa-chevron-up"></i></a>
    </span>
  )
}
