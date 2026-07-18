"use client";

import { useEffect, useRef } from "react";

type TypewriterProps = {
  strings: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  /** pause after a string is fully typed */
  holdDelay?: number;
  /** pause between deleting a string and typing the next */
  nextDelay?: number;
};

export default function Typewriter({
  strings,
  typeSpeed = 40,
  deleteSpeed = 20,
  holdDelay = 1500,
  nextDelay = 100,
}: TypewriterProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el || strings.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = strings[0];
      return;
    }

    let timer = 0;
    let index = 0;
    let length = 0;
    let deleting = false;

    const tick = () => {
      const current = strings[index];
      length += deleting ? -1 : 1;
      el.textContent = current.slice(0, length);

      if (!deleting && length === current.length) {
        deleting = true;
        timer = window.setTimeout(tick, holdDelay);
      } else if (deleting && length === 0) {
        deleting = false;
        index = (index + 1) % strings.length;
        timer = window.setTimeout(tick, nextDelay);
      } else {
        timer = window.setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
      }
    };

    timer = window.setTimeout(tick, typeSpeed);

    return () => clearTimeout(timer);
  }, [strings, typeSpeed, deleteSpeed, holdDelay, nextDelay]);

  return (
    <span aria-label={strings.join(", ")}>
      <span ref={textRef} aria-hidden="true" />
    </span>
  );
}
