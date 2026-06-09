"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/lib/i18n/language-context";
import { useCircleWaypoint } from "./gradient-circle-context";
import { useCarousel } from "./use-carousel";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Left-pointing chevron; flip horizontally with `rotate-180` for the other way. */
function Chevron({ rotated }: { rotated: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-4 w-4 ${rotated ? "rotate-180" : ""}`}
    >
      <path
        d="M15 18l-6-6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Part 10 — "Why Being Saudi-Born Matters".
 *
 * Vision-2030 themed differentiators. PSB framing (Vision-2030 tag + heading +
 * intro) on the leading side; an interactive pillar carousel on the trailing
 * side. Navigable by next/previous, keyboard arrows, AND drag/swipe — the drag
 * logic lives in {@link useCarousel} so Part 11 (Team) reuses it. Continues the
 * gradient circle's path from Part 9 toward the Part 13 finale via a waypoint.
 */
export default function SaudiBorn() {
  const { t, dir } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const pillars = t.saudiPillars;
  const { index, prev, next, goTo, onKeyDown, dx, dragProps } = useCarousel(
    pillars.length,
    { dir, reduce }
  );
  const p = pillars[index];

  // Continue the circle from Part 9 (right) — drift to centre and grow toward
  // the Part 13 finale. Subtle so it doesn't fight the Saudi theme.
  useCircleWaypoint(ref, { x: 0, y: 0, scale: 1.6, opacity: 0.35 });

  const [titleLead, titleBrand] = t.saudiTitle.split("\n");
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(
    pillars.length
  ).padStart(2, "0")}`;

  return (
    <section ref={ref} className="relative z-10 py-32 md:py-48">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid gap-16 md:grid-cols-2 md:items-center md:gap-12">
          {/* Left — PSB framing */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="font-oswald text-xs tracking-[0.4em] text-[var(--gold-light)]/70">
                / 10
              </span>
              <span className="rounded-full border border-[var(--gold)]/30 px-3 py-1 font-oswald text-[10px] uppercase tracking-[0.25em] text-[var(--gold-light)]/80">
                {t.saudiEyebrow}
              </span>
            </div>
            <h2 className="font-oswald text-3xl font-light leading-[1.05] tracking-tight md:text-5xl">
              {titleLead}
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #f2d680 0%, #8556c3 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {titleBrand}
              </span>
            </h2>
            <p className="mt-6 max-w-md font-roboto text-base leading-relaxed text-white/70 md:text-lg">
              {t.saudiIntro}
            </p>
          </div>

          {/* Right — pillar carousel */}
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label={t.saudiTitle.replace("\n", " ")}
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
          >
            <div className="mb-6 flex items-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label={t.saudiPrev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[var(--gold)]/60 hover:text-white"
              >
                <Chevron rotated={dir === "rtl"} />
              </button>
              <span
                dir="ltr"
                className="font-oswald text-sm tracking-[0.2em] text-white/50"
              >
                {counter}
              </span>
              <button
                type="button"
                onClick={next}
                aria-label={t.saudiNext}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[var(--gold)]/60 hover:text-white"
              >
                <Chevron rotated={dir !== "rtl"} />
              </button>
            </div>

            {/* Saudi / Vision-2030 cityscape (PSB Group_7) under a dim overlay,
                with the pillar carousel riding on top. */}
            <div
              aria-live="polite"
              aria-atomic="true"
              className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/10 p-8 backdrop-blur-sm md:p-12"
            >
              <Image
                src="/assets/saudi-2030.webp"
                alt=""
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[#0d0a1a]/75" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a1a] via-[#0d0a1a]/55 to-[#0d0a1a]/30" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  {...dragProps}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: dx }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -dx }}
                  transition={
                    reduce ? { duration: 0.2 } : { duration: 0.5, ease: EASE }
                  }
                  className="relative z-10 cursor-grab touch-pan-y active:cursor-grabbing"
                >
                  {/* Faint position watermark — decorative imagery stand-in */}
                  <span
                    aria-hidden="true"
                    dir="ltr"
                    className="pointer-events-none absolute end-6 top-2 select-none font-oswald text-7xl font-light leading-none text-white/[0.05] md:text-8xl"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-oswald text-2xl font-light leading-tight text-white md:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-5 max-w-md font-roboto text-base leading-relaxed text-white/65">
                    {p.copy}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress dashes */}
            <div className="mt-6 flex justify-center gap-2">
              {pillars.map((pl, i) => (
                <button
                  key={pl.title}
                  onClick={() => goTo(i)}
                  className={`h-px transition-all ${
                    i === index ? "w-16 bg-[var(--gold)]" : "w-8 bg-white/20"
                  }`}
                  aria-label={pl.title}
                  aria-current={i === index}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
