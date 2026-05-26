"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import styles from "./Nav.module.scss"

type MenuItem = {
  link: string;
  label: string;
};

export default function Nav() {
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
      <DesktopNav />
      <MobileNav changeMobileNavColor={changeMobileNavColor} />
    </div>
  );
}

function DesktopNav() {
  return (
    <nav className={styles.desktopNav}>
      <div className={styles.navInner}>
        <h4 className={styles.styleHeadline}>
          <Link href="/">LH</Link>
        </h4>
        <ul className={styles.navLinks}>
          <MenuItems />
        </ul>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}

function MobileNav({
  changeMobileNavColor,
}: {
  changeMobileNavColor: boolean;
}) {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <nav className={styles.mobileNav + (showMobileNav ? " " + styles.navVisible : "")}>
      <div className={styles.navTopBar}>
        <div
          className={styles.navSwitcher + (changeMobileNavColor ? " " + styles.darkSwitcher : "")}
        >
          <button onClick={() => setShowMobileNav((shown) => !shown)}>
            <span className={styles.topLine}></span>
            <span className={styles.middleLine}></span>
            <span className={styles.bottomLine}></span>
          </button>
        </div>
      </div>
      <ul onClick={() => setShowMobileNav(false)}>
        <MenuItems />
      </ul>
      <ThemeSwitcher />
    </nav>
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
