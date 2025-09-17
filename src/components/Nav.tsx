"use client";

import Link from "next/link";
import { useState, useRef } from "react";

export default function Nav() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [changeMobileNavColor, setChangeMobileNavColor] = useState(false);

  const [slideIn, setSlideIn] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const scrollBefore = useRef(0);
  const wasFixedBefore = useRef(false);

  const isBrowser = typeof window !== "undefined";
  const baselineVH = (window.visualViewport?.height ?? window.innerHeight);

  if (isBrowser) {
    setInterval(() => handleScroll(), 10);
  }

  const Direction = {
    UP: 0,
    DOWN: 1,
    NONE: 2
  }

  function handleScroll() {
    if (scrollBefore.current !== window.scrollY) {
      if (window.scrollY === 0) {
        setCollapsed(false);
        setSlideIn(false);
        wasFixedBefore.current = false;
      } else {
        let direction = Direction.NONE;
        if (window.scrollY > scrollBefore.current) {
          direction = Direction.DOWN;
        }
        if (window.scrollY < scrollBefore.current) {
          direction = Direction.UP;
        }

        if (direction === Direction.UP && !slideIn) {
          setCollapsed(false);
          setSlideIn(true);
          wasFixedBefore.current = true;
        }

        if (direction === Direction.DOWN && !collapsed && wasFixedBefore.current) {
          setSlideIn(false);
          setCollapsed(true);
        }
      }

      scrollBefore.current = window.scrollY;
      setChangeMobileNavColor(window.scrollY + 20 > baselineVH);
    }

  }

  return (
    <div>
      {/*Desktop Nav */}
      {}
      <nav
        className={`desktop-nav ${collapsed ? "nav-collapsed" : ""} ${slideIn ? "nav-slidein" : ""}`}
      >
        <div className="nav-inner">
          <h4 className="style-headline"><Link href="/">heuer.ovh</Link></h4>
          <ul className="nav-links">
            <li>
              <Link href="/#top">Home</Link>
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
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className={`mobile-nav ${showMobileNav ? "nav-visible" : ""}`}>
        <div className="nav-top-bar">
          <div className={`nav-switcher ${changeMobileNavColor ? "dark-switcher" : ""}`}>
            <button onClick={() => setShowMobileNav(shown => !shown)}>
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
};
