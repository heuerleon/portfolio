"use client";

import { Link } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const navItems: { link: string; labelKey: string }[] = [
  { link: "/#top", labelKey: "home" },
  { link: "/#about", labelKey: "about" },
  { link: "/#projects", labelKey: "projects" },
  { link: "/#publications", labelKey: "publications" },
  { link: "/#contact", labelKey: "contact" },
];

export default function Nav() {
  const t = useTranslations("Nav");
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [changeMobileNavColor, setChangeMobileNavColor] = useState(false);

  const [slideIn, setSlideIn] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let scrollBefore = window.scrollY;
    let wasFixedBefore = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;

      if (y === 0) {
        setCollapsed(false);
        setSlideIn(false);
        wasFixedBefore = false;
      } else if (y < scrollBefore) {
        // scrolling up: slide the fixed nav in
        setCollapsed(false);
        setSlideIn(true);
        wasFixedBefore = true;
      } else if (y > scrollBefore && wasFixedBefore) {
        // scrolling down: collapse it again
        setSlideIn(false);
        setCollapsed(true);
      }

      scrollBefore = y;
      setChangeMobileNavColor(y + 20 > window.innerHeight);
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
    <div>
      {/*Desktop Nav */}
      {}
      <nav
        className={`desktop-nav ${collapsed ? "nav-collapsed" : ""} ${slideIn ? "nav-slidein" : ""}`}
      >
        <div className="nav-inner">
          <h4 className="style-headline">
            <Link href="/">heuer.ovh</Link>
          </h4>
          <ul className="nav-links">
            {navItems.map((navItem, i) => (
              <li key={i}>
                <Link href={navItem.link}>{t(navItem.labelKey)}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className={`mobile-nav ${showMobileNav ? "nav-visible" : ""}`}>
        <div className="nav-top-bar">
          <div
            className={`nav-switcher ${changeMobileNavColor ? "dark-switcher" : ""}`}
          >
            <button onClick={() => setShowMobileNav((shown) => !shown)}>
              <span className="top-line"></span>
              <span className="middle-line"></span>
              <span className="bottom-line"></span>
            </button>
          </div>
        </div>
        <ul onClick={() => setShowMobileNav(false)}>
          {navItems.map((navItem, i) => (
            <li key={i}>
              <Link href={navItem.link}>{t(navItem.labelKey)}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
