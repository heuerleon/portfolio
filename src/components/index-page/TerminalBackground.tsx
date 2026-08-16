"use client";

import { useEffect, useRef } from "react";
import { sectionArt } from "./sectionArt";

const CELL_W = 14;
const CELL_H = 26;
const GAP = 2;

const RADIUS = 430;
const NARROW_RADIUS = 320;
const NARROW_WIDTH = 800;
const MAX_ALPHA = 0.1;
const LEVELS = 16;

const ART_CELL_COLS = 2;
const ART_FIT_SHARE = 1;
const ART_ALPHA = 0.11;
const ART_AMBIENT = 0.35;
const ART_FADE = 400;

const SCROLLED_PAST_SHARE = 0.6;

const IDLE_SPREAD = 0.18;
const IDLE_SPEED = 32;
const IDLE_TURN = 1.2;
const IDLE_ARRIVED = 60;
const IDLE_MIN_TRAVEL = 180;

const FOLLOW_RATE = 6;
const FOLLOW_SPEED = 1000;
const FOLLOW_SETTLED = 0.5;

// Keep the push under the reach, or the glow moves against the cursor at an edge.
const EDGE_PUSH = 200;
const EDGE_REACH = 230;

function cellWeight(col: number, row: number) {
  const n = Math.sin(col * 127.1 + row * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function holdOffEdges(value: number, size: number) {
  const fromStart = EDGE_PUSH * Math.exp(-value / EDGE_REACH);
  const fromEnd = EDGE_PUSH * Math.exp(-(size - value) / EDGE_REACH);
  return value + fromStart - fromEnd;
}

function glowFalloff(dx: number, dy: number, radius: number) {
  const distance = Math.hypot(dx, dy);
  if (distance >= radius) return 0;
  const t = 1 - distance / radius;
  const smooth = t * t * (3 - 2 * t);
  return smooth * smooth;
}

type Art = { rows: string[]; cols: number };

export default function TerminalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const hero = document.getElementById("top");

    const sections: { element: HTMLElement; art: Art }[] = [];
    for (const { id, rows } of sectionArt) {
      const element = document.getElementById(id);
      if (!element) continue;
      const cols = Math.max(...rows.map((row) => row.length));
      sections.push({ element, art: { rows, cols } });
    }

    let width = 0;
    let height = 0;
    let radius = RADIUS;
    let heroHeight = 0;
    let started = false;

    let pointer: { x: number; y: number } | null = null;

    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let targetX = 0;
    let targetY = 0;

    let art: Art | null = null;
    let nextArt: Art | null = null;
    let fade = 0;

    let drawnX = NaN;
    let drawnY = NaN;
    let drawnAlpha = NaN;
    let drawnArt: Art | null = null;
    let drawnFade = NaN;

    let lastTime = 0;
    let frameId = 0;
    let focusFrame = 0;

    const drawArt = (originX: number, originY: number) => {
      if (!art || fade <= 0) return;

      const pixelCols =
        art.cols * ART_CELL_COLS * CELL_W <= width * ART_FIT_SHARE
          ? ART_CELL_COLS
          : 1;
      const startCol = Math.round((width / CELL_W - art.cols * pixelCols) / 2);
      const startRow = Math.round((height / CELL_H - art.rows.length) / 2);

      for (let line = 0; line < art.rows.length; line++) {
        const pixels = art.rows[line];
        const row = startRow + line;

        for (let pixel = 0; pixel < pixels.length; pixel++) {
          if (pixels[pixel] !== "#") continue;

          for (let part = 0; part < pixelCols; part++) {
            const col = startCol + pixel * pixelCols + part;
            const falloff = glowFalloff(
              col * CELL_W + CELL_W / 2 - originX,
              row * CELL_H + CELL_H / 2 - originY,
              radius,
            );

            ctx.globalAlpha =
              ART_ALPHA * fade * (ART_AMBIENT + (1 - ART_AMBIENT) * falloff);
            ctx.fillRect(
              col * CELL_W,
              row * CELL_H,
              CELL_W - GAP,
              CELL_H - GAP,
            );
          }
        }
      }
    };

    const drawAt = (originX: number, originY: number, alpha: number) => {
      ctx.clearRect(0, 0, width, height);

      const firstCol = Math.max(0, Math.floor((originX - radius) / CELL_W));
      const lastCol = Math.min(
        Math.ceil(width / CELL_W),
        Math.ceil((originX + radius) / CELL_W),
      );
      const firstRow = Math.max(0, Math.floor((originY - radius) / CELL_H));
      const lastRow = Math.min(
        Math.ceil(height / CELL_H),
        Math.ceil((originY + radius) / CELL_H),
      );

      for (let col = firstCol; col < lastCol; col++) {
        for (let row = firstRow; row < lastRow; row++) {
          const falloff = glowFalloff(
            col * CELL_W + CELL_W / 2 - originX,
            row * CELL_H + CELL_H / 2 - originY,
            radius,
          );
          if (falloff <= 0) continue;

          const weighted = falloff * (0.8 + 0.4 * cellWeight(col, row));
          const level = Math.round(weighted * LEVELS) / LEVELS;
          if (level <= 0) continue;

          ctx.globalAlpha = Math.min(level, 1) * alpha;
          ctx.fillRect(col * CELL_W, row * CELL_H, CELL_W - GAP, CELL_H - GAP);
        }
      }

      drawArt(originX, originY);
    };

    const pickTarget = () => {
      for (let attempt = 0; attempt < 8; attempt++) {
        targetX = width / 2 + (Math.random() * 2 - 1) * width * IDLE_SPREAD;
        targetY = height / 2 + (Math.random() * 2 - 1) * height * IDLE_SPREAD;
        if (Math.hypot(targetX - x, targetY - y) > IDLE_MIN_TRAVEL) break;
      }
    };

    const currentAlpha = () => {
      if (!heroHeight) return MAX_ALPHA;
      const heroScrolledPast = Math.min(
        Math.max(window.scrollY / heroHeight, 0),
        1,
      );
      return MAX_ALPHA * (1 - heroScrolledPast * (1 - SCROLLED_PAST_SHARE));
    };

    const pickArt = () => {
      const middle = window.innerHeight / 2;
      const focused = sections.find(({ element }) => {
        const { top, bottom } = element.getBoundingClientRect();
        return top <= middle && bottom > middle;
      });
      nextArt = focused ? focused.art : null;
    };

    const advanceFade = (elapsed: number) => {
      if (!art) {
        art = nextArt;
        fade = 0;
        return;
      }

      const step = (elapsed * 1000) / ART_FADE;
      if (art === nextArt) {
        fade = Math.min(fade + step, 1);
        return;
      }

      fade = Math.max(fade - step, 0);
      if (fade === 0) art = nextArt;
    };

    const chase = (elapsed: number) => {
      if (!pointer) return;
      const dx = pointer.x - x;
      const dy = pointer.y - y;
      const gap = Math.hypot(dx, dy);
      if (gap < FOLLOW_SETTLED) {
        x = pointer.x;
        y = pointer.y;
        return;
      }

      const eased = gap * (1 - Math.exp(-FOLLOW_RATE * elapsed));
      const step = Math.min(eased, FOLLOW_SPEED * elapsed);
      x += (dx / gap) * step;
      y += (dy / gap) * step;
    };

    const drift = (elapsed: number) => {
      const dx = targetX - x;
      const dy = targetY - y;
      const remaining = Math.hypot(dx, dy) || 1;
      const turn = 1 - Math.exp(-IDLE_TURN * elapsed);
      vx += ((dx / remaining) * IDLE_SPEED - vx) * turn;
      vy += ((dy / remaining) * IDLE_SPEED - vy) * turn;

      const speed = Math.hypot(vx, vy) || 1;
      vx = (vx / speed) * IDLE_SPEED;
      vy = (vy / speed) * IDLE_SPEED;

      x += vx * elapsed;
      y += vy * elapsed;
      if (remaining < IDLE_ARRIVED) pickTarget();
    };

    const tick = (time: number) => {
      const elapsed = lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 0;
      lastTime = time;

      if (reduceMotion.matches) {
        x = pointer ? pointer.x : width / 2;
        y = pointer ? pointer.y : height / 2;
      } else if (pointer) {
        chase(elapsed);
      } else {
        drift(elapsed);
      }

      advanceFade(elapsed);

      const alpha = currentAlpha();
      if (
        x !== drawnX ||
        y !== drawnY ||
        alpha !== drawnAlpha ||
        art !== drawnArt ||
        fade !== drawnFade
      ) {
        drawAt(x, y, alpha);
        drawnX = x;
        drawnY = y;
        drawnAlpha = alpha;
        drawnArt = art;
        drawnFade = fade;
      }

      frameId = requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (!frameId) {
        lastTime = 0;
        frameId = requestAnimationFrame(tick);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      radius = width <= NARROW_WIDTH ? NARROW_RADIUS : RADIUS;
      heroHeight = hero?.offsetHeight ?? 0;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      // Sizing the canvas wipes its context state, and its picture with it.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#ffffff";
      drawnX = NaN;

      if (!started) {
        x = width / 2;
        y = height / 2;
        const heading = Math.random() * Math.PI * 2;
        vx = Math.cos(heading) * IDLE_SPEED;
        vy = Math.sin(heading) * IDLE_SPEED;
        started = true;
      }
      pickTarget();
      pickArt();
      schedule();
    };

    const onScroll = () => {
      if (focusFrame) return;
      focusFrame = requestAnimationFrame(() => {
        focusFrame = 0;
        pickArt();
      });
    };

    // The canvas is fixed, so client coordinates are already canvas ones.
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer = {
        x: holdOffEdges(event.clientX, width),
        y: holdOffEdges(event.clientY, height),
      };
    };

    const onPointerLeave = () => {
      pointer = null;
      pickTarget();
    };

    const sizing = new ResizeObserver(resize);
    sizing.observe(canvas);
    resize();

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      sizing.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerleave", onPointerLeave);
      if (frameId) cancelAnimationFrame(frameId);
      if (focusFrame) cancelAnimationFrame(focusFrame);
    };
  }, []);

  return <canvas className="terminal-bg" ref={canvasRef} aria-hidden="true" />;
}
