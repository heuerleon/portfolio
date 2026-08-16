"use client";

import { Link } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Typewriter from "@/components/Typewriter";
import Button from "@/components/Button";
import SocialMediaContainer from "@/components/SocialMediaContainer";
import LanguageSwitcher from "../LanguageSwitcher";
import Image from "next/image";

const HERO_LEAVING_SHARE = 0.12;

const typewriterStrings = [
  "Full-Stack Developer",
  "Linux Enthusiast",
  "Rust Enjoyer",
  "Hobby gamer",
];

export default function TopIntroduction() {
  const t = useTranslations("Hero");
  const heroRef = useRef<HTMLElement>(null);

  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let frame = 0;

    // Measured against the hero, not the viewport: 100vh outruns the visible
    // area on mobile while the browser chrome is showing.
    const update = () => {
      frame = 0;
      const { top, height } = hero.getBoundingClientRect();
      setHeroInView(top > -height * HERO_LEAVING_SHARE);
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
    <section className="full-height y-axis-centered" id="top" ref={heroRef}>
      <div className="container">
        <div className="row x-axis-space-between y-axis-centered">
          <div className="column col-3-double">
            <p className="typewriter">
              <Typewriter strings={typewriterStrings} />
            </p>
            <h1>Leon Heuer</h1>
            <p>{t("intro")}</p>
            <p className="p-no-margin">
              <LanguageSwitcher />
            </p>
            <SocialMediaContainer />
            <div>
              <Button href="/#contact" primary large>
                {t("workWithMe")}
              </Button>
              <Button href="/#projects" large>
                {t("browseProjects")}
              </Button>
            </div>
          </div>
          <div className="column col-3 hero-portrait">
          <Image
            src="/leon.jpg"
            className="portrait-photo"
            alt="Photo of Leon Heuer"
            width={300}
            height={300}
          ></Image>
          </div>
        </div>
      </div>
      <Link
        href="/#about"
        className={`scroll-down ${heroInView ? "" : "scroll-down-hidden"}`}
        aria-label={t("scrollDown")}
      >
        <span className="scroll-chevron"></span>
        <span className="scroll-chevron"></span>
        <span className="scroll-chevron"></span>
      </Link>
    </section>
  );
}
