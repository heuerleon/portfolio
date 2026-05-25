"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

type MenuItem = {
  link: string;
  label: string;
};

export default function Nav() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [changeMobileNavColor, setChangeMobileNavColor] = useState(false);

  const [slideIn, setSlideIn] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const scrollBefore = useRef(0);
  const wasFixedBefore = useRef(false);

  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    if (isBrowser) {
      setInterval(() => handleScroll(), 10);
    }
  }, []);

  const Direction = {
    UP: 0,
    DOWN: 1,
    NONE: 2,
  };

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

        if (
          direction === Direction.DOWN &&
          !collapsed &&
          wasFixedBefore.current
        ) {
          setSlideIn(false);
          setCollapsed(true);
        }
      }

      scrollBefore.current = window.scrollY;
      setChangeMobileNavColor(window.scrollY + 20 > window.innerHeight);
    }
  }

  return (
    <div>
      {/*Desktop Nav */}
      <nav
        className={`desktop-nav ${collapsed ? "nav-collapsed" : ""} ${slideIn ? "nav-slidein" : ""}`}
      >
        <div className="nav-inner">
          <h4 className="style-headline">
            <Link href="/">LH</Link>
          </h4>
          <ul className="nav-links">
            <MenuItems />
          </ul>
          <ThemeSwitcher />
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
          <MenuItems />
        </ul>
          <ThemeSwitcher />
      </nav>
    </div>
  );
}

function MenuItems() {
  const menuItems: MenuItem[] = [
    {
      link: "/#top",
      label: "Home",
    },
    {
      link: "/#projects",
      label: "Projects",
    },
    {
      link: "/blog",
      label: "Blog",
    },
    {
      link: "/#contact",
      label: "Contact",
    },
  ];

  return (
    <>
      {menuItems.map((item, index) => (
        <li key={index}>
          <Link href={item.link}>{item.label}</Link>
        </li>
      ))}
    </>
  );
}
