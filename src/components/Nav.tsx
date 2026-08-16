"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";
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
  const [showNav, setShowNav] = useState(false);

  return (
    <nav className={`nav ${showNav ? "nav-visible" : ""}`}>
      <div className="nav-top-bar">
        <h4 className="style-headline">
          <Link href="/">heuer.ovh</Link>
        </h4>
        <div className="nav-switcher">
          <button onClick={() => setShowNav((shown) => !shown)}>
            <span className="top-line"></span>
            <span className="middle-line"></span>
            <span className="bottom-line"></span>
          </button>
        </div>
      </div>
      <ul onClick={() => setShowNav(false)}>
        {navItems.map((navItem, i) => (
          <li key={i}>
            <Link href={navItem.link}>{t(navItem.labelKey)}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
