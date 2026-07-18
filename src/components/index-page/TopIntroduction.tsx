"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import Typewriter from "@/components/Typewriter";
import Button from "@/components/Button";
import SocialMediaContainer from "@/components/SocialMediaContainer";

const typewriterStrings = [
  "Full-Stack Developer",
  "Linux Enthusiast",
  "Rust Enjoyer",
  "Hobby gamer",
];

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
              <Typewriter strings={typewriterStrings} />
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