"use client";

import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [showNav, setShowNav] = useState(false);

  return (
    <nav className={showNav ? "nav-visible" : ""}>
      <div className="nav-top-bar">
        <div className="nav-switcher">
          <button onClick={() => setShowNav(shown => !shown)}>
            <span className="top-line"></span>
            <span className="middle-line"></span>
            <span className="bottom-line"></span>
          </button>
        </div>
      </div>
      <ul onClick={() => setShowNav(false)}>
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
  );
};
