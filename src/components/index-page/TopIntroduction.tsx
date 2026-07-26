"use client";

import { Link } from "@/i18n/navigation";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Typewriter from "@/components/Typewriter";
import Button from "@/components/Button";
import SocialMediaContainer from "@/components/SocialMediaContainer";
import LanguageSwitcher from "../LanguageSwitcher";

const typewriterStrings = [
  "Full-Stack Developer",
  "Linux Enthusiast",
  "Rust Enjoyer",
  "Hobby gamer",
];

export default function TopIntroduction() {
  const t = useTranslations("Hero");
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
          <div className="column-left col-3-double">
            <p className="headline-prefix typewriter">
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
        </div>
      </div>
      <Link href="/#about" className="scroll-down" aria-label={t("scrollDown")}>
        <span></span>
      </Link>
    </section>
  );
}
