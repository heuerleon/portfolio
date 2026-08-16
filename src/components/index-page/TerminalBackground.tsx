"use client";

import { useEffect, useRef } from "react";

const CELL_W = 14;
const CELL_H = 26;
const GAP = 2;

const RADIUS = 430;
const MAX_ALPHA = 0.1;
const LEVELS = 16;

const IDLE_SPREAD = 0.18;
const IDLE_SPEED = 32;
const IDLE_TURN = 1.2;
const IDLE_ARRIVED = 60;
const IDLE_MIN_TRAVEL = 180;

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

export default function TerminalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const section = canvas.closest("section") ?? canvas.parentElement;
    if (!section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let started = false;

    // Null while the cursor is away, which hands the glow back to its drift.
    let pointer: { x: number; y: number } | null = null;

    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let targetX = 0;
    let targetY = 0;

    let lastTime = 0;
    let frameId = 0;
    let onScreen = true;

    const drawAt = (originX: number, originY: number) => {
      ctx.clearRect(0, 0, width, height);

      const firstCol = Math.max(0, Math.floor((originX - RADIUS) / CELL_W));
      const lastCol = Math.min(
        Math.ceil(width / CELL_W),
        Math.ceil((originX + RADIUS) / CELL_W),
      );
      const firstRow = Math.max(0, Math.floor((originY - RADIUS) / CELL_H));
      const lastRow = Math.min(
        Math.ceil(height / CELL_H),
        Math.ceil((originY + RADIUS) / CELL_H),
      );

      for (let col = firstCol; col < lastCol; col++) {
        for (let row = firstRow; row < lastRow; row++) {
          const dx = col * CELL_W + CELL_W / 2 - originX;
          const dy = row * CELL_H + CELL_H / 2 - originY;
          const distance = Math.hypot(dx, dy);
          if (distance >= RADIUS) continue;

          const t = 1 - distance / RADIUS;
          const smooth = t * t * (3 - 2 * t);
          const falloff = smooth * smooth;
          const weighted = falloff * (0.8 + 0.4 * cellWeight(col, row));
          const level = Math.round(weighted * LEVELS) / LEVELS;
          if (level <= 0) continue;

          ctx.globalAlpha = Math.min(level, 1) * MAX_ALPHA;
          ctx.fillRect(col * CELL_W, row * CELL_H, CELL_W - GAP, CELL_H - GAP);
        }
      }
    };

    const pickTarget = () => {
      for (let attempt = 0; attempt < 8; attempt++) {
        targetX = width / 2 + (Math.random() * 2 - 1) * width * IDLE_SPREAD;
        targetY = height / 2 + (Math.random() * 2 - 1) * height * IDLE_SPREAD;
        if (Math.hypot(targetX - x, targetY - y) > IDLE_MIN_TRAVEL) break;
      }
    };

    const tick = (time: number) => {
      frameId = 0;

      // Nothing to animate while the cursor drives, so this stays on demand.
      if (pointer) {
        drawAt(pointer.x, pointer.y);
        return;
      }

      if (reduceMotion.matches) {
        drawAt(width / 2, height / 2);
        return;
      }

      const elapsed = lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 0;
      lastTime = time;

      // Steering the heading rather than easing the position keeps one pace.
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

      drawAt(x, y);
      if (onScreen) frameId = requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (!frameId) frameId = requestAnimationFrame(tick);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      // Sizing the canvas wipes its context state.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#ffffff";

      if (!started) {
        x = width / 2;
        y = height / 2;
        const heading = Math.random() * Math.PI * 2;
        vx = Math.cos(heading) * IDLE_SPEED;
        vy = Math.sin(heading) * IDLE_SPEED;
        started = true;
      }
      pickTarget();
      schedule();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer = {
        x: holdOffEdges(event.clientX - rect.left, width),
        y: holdOffEdges(event.clientY - rect.top, height),
      };
      schedule();
    };

    const onPointerLeave = () => {
      if (pointer) {
        x = pointer.x;
        y = pointer.y;
      }
      pointer = null;
      lastTime = 0;
      pickTarget();
      schedule();
    };

    const sizing = new ResizeObserver(resize);
    sizing.observe(canvas);
    resize();

    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) {
          lastTime = 0;
          schedule();
        } else if (frameId) {
          cancelAnimationFrame(frameId);
          frameId = 0;
        }
      },
      { threshold: 0 },
    );
    visibility.observe(canvas);

    // On the section, so the glow stays with the cursor over the hero text.
    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerleave", onPointerLeave);

    return () => {
      sizing.disconnect();
      visibility.disconnect();
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas className="terminal-bg" ref={canvasRef} aria-hidden="true" />;
}
