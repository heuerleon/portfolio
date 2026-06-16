"use client";

import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [changeMobileNavColor, setChangeMobileNavColor] = useState(false);

  return (
    <div>
      <nav className="desktop-nav">
        <div className="nav-inner">
          <ul className="nav-links">
            <li>
              <Link href="/#about">About Me</Link>
            </li>
            <li>
              <Link href="/#projects">Projects</Link>
            </li>
            <li>
              <Link href="/#cv">CV</Link>
            </li>
          </ul>
        </div>
      </nav>

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
          <li>
            <Link href="/#top">Intro</Link>
          </li>
          <li>
            <Link href="/#about">About Me</Link>
          </li>
          <li>
            <Link href="/#what-i-do">What I Do</Link>
          </li>
          <li>
            <Link href="/#featured">Featured</Link>
          </li>
          <li>
            <Link href="/#projects">Projects</Link>
          </li>
          <li>
            <Link href="/#contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
