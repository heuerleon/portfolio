"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Typewriter from "@/components/Typewriter";
import Button from "@/components/Button";
import SocialMediaContainer from "@/components/SocialMediaContainer";
import LanguageSwitcher from "../LanguageSwitcher";
import Image from "next/image";

const typewriterStrings = [
  "Full-Stack Developer",
  "Linux Enthusiast",
  "Rust Enjoyer",
  "Hobby gamer",
];

export default function TopIntroduction() {
  const t = useTranslations("Hero");

  return (
    <section className="full-height y-axis-centered" id="top">
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
          <div className="column col-3">
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
      <Link href="/#about" className="scroll-down" aria-label={t("scrollDown")}>
        <span></span>
      </Link>
    </section>
  );
}
