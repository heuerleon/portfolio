"use client";

import Link from "next/link";
import React, { useState, useRef } from "react";

export default function Nav() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [invisible, setInvisible] = useState(false);
  const scrollBefore = useRef(0);
  const wasFixedBefore = useRef(false);
  const isBrowser = typeof window !== "undefined";
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
        setInvisible(false);
        setFixed(false);
        wasFixedBefore.current = false;
      } else {
        let direction = Direction.NONE;
        if (window.scrollY > scrollBefore.current) {
          direction = Direction.DOWN;
        }
        if (window.scrollY < scrollBefore.current) {
          direction = Direction.UP;
        }

        if (direction === Direction.UP && !fixed) {
          setInvisible(false);
          setFixed(true);
          wasFixedBefore.current = true;
        }

        if (direction === Direction.DOWN && !invisible && wasFixedBefore.current) {
          setFixed(false);
          setInvisible(true);
        }
      }

      scrollBefore.current = window.scrollY;
    }
  }

  return (
    <nav
      className={`alt-section-dark ${invisible && !showMobileNav ? "nav-default" : ""
        } ${fixed || showMobileNav ? "nav-fixed" : ""}`}
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
        <div className="mobile-nav">
          <button className="mobile-nav-switcher" onClick={() => setShowMobileNav(it => !it)}>
            <i className={`fas ${showMobileNav ? "fa-times" : "fa-bars"}`}></i>
          </button>
          <ul
            className={`mobile-nav-links ${showMobileNav ? "mobile-nav-links-visible" : ""
              }`}
            onClick={() => setShowMobileNav(it => !it)}
          >
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
      </div>
    </nav>
  );
};
