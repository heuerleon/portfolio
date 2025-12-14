"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import TypeIt from "typeit-react";
import Button from "@/components/Button";
import SocialMediaContainer from "@/components/SocialMediaContainer";

export default function TopIntroduction() {
  const [topParralax, setTopParallax] = useState("center");
  const scrollBefore = useRef(0);

  useEffect(() => {
    setTopParallax(`center ${window.scrollY * 0.3 - 200}px`);

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (scrollBefore.current !== currentY) {
        scrollBefore.current = currentY;
        setTopParallax(`center ${currentY * 0.3 - 200}px`);
      }
    };

    const onScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const topSectionStyle = {
    backgroundPosition: topParralax,
  };

  return (
    <section
      className="alt-section-dark full-height y-axis-centered"
      id="top"
      style={topSectionStyle}
    >
      <div className="container">
        <div className="row x-axis-space-between y-axis-centered">
          <div className="column-left col-2">
            <h3 className="headline-prefix typewriter">
              <TypeIt
                options={{
                  strings: [
                    "App developer",
                    "Linux enthusiast",
                    "Java & Kotlin developer",
                    "Hobby gamer",
                    "Hardware tinkerer",
                  ],
                  loop: true,
                  speed: 50,
                  deleteSpeed: 25,
                  nextStringDelay: [1500, 100],
                  lifeLike: false,
                  cursor: false,
                  breakLines: false,
                  waitUntilVisible: true,
                  html: false,
                }}
              />
            </h3>
            <h1>Leon Heuer</h1>
            <p className="p-no-margin">
              My name is Leon Heuer and I welcome you to my personal portfolio.
              I am a student and young software developer from Germany
              with an international focus.
            </p>
            <SocialMediaContainer />
            <div>
              <Button href="/#contact" primary large>Work With Me</Button>
              <Button href="/#featured" large>Browse Projects</Button>
            </div>
          </div>
        </div>
      </div>
      <Link href="/#about" className="scroll-down" aria-label="scroll-down">
        <span></span>
      </Link>
    </section>
  )
}