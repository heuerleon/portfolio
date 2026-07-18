"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import TypeIt from "typeit-react";
import Button from "@/components/Button";
import SocialMediaContainer from "@/components/SocialMediaContainer";

export default function TopIntroduction() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (
      !bg ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      // handled by the compositor-driven CSS animation in base.scss
      CSS.supports("animation-timeline: view()")
    ) {
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      bg.style.transform = `translate3d(0, ${window.scrollY * 0.3}px, 0)`;
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
    <section className="alt-section-dark full-height y-axis-centered" id="top">
      <div className="parallax-bg" ref={bgRef} aria-hidden="true" />
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