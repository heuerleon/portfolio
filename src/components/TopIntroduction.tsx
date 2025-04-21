"use client";

import { useState, useRef, useEffect } from "react";
import TypeIt from "typeit-react";

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
            <div className="social-media-container">
              <a
                href="https://github.com/heuerleon"
                target="_blank"
                rel="noreferrer"
                aria-label="github"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.instagram.com/heuerleon/"
                target="_blank"
                rel="noreferrer"
                aria-label="instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/leonheuer/"
                target="_blank"
                rel="noreferrer"
                aria-label="linkedin"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
            <div>
              <a href="#about" className="btn-primary">
                <span>Learn More</span>
              </a>
              <a href="#projects" className="btn-alt">
                <span>View my work</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <a href="#about" className="scroll-down" aria-label="scroll-down">
        <span></span>
      </a>
    </section>
  )
}