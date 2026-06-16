"use client";

import Link from "next/link";
import { useState, useRef, useEffect, ReactNode } from "react";
import TypeIt from "typeit-react";
import Button from "@/components/Button";
import SocialMediaContainer from "@/components/SocialMediaContainer";
import Image from "next/image";

export default function TopIntroduction({ children }: { children: ReactNode }) {
  return (
    <section className="padding-section" id="top">
      <div className="container">
        <div className="row x-axis-space-between y-axis-centered">
          <div className="column-left col-3-double">
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
            {children}
            <SocialMediaContainer />
            <div>
              <Button href="/#contact" primary large>
                Work With Me
              </Button>
              <Button href="/#featured" large>
                Browse Projects
              </Button>
            </div>
          </div>
          <div className="column-right col-3">
            <Image
              src="/portrait.jpeg"
              id="about-me-img"
              alt="Leon Heuer"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
