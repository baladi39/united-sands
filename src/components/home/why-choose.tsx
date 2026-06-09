"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { useLang } from "@/lib/i18n/language-context";
import { useCircleWaypoint } from "./gradient-circle-context";

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
 * Part 4 — "Why Choose United Sands?".
 *
 * Hybrid section: the client PSB framing (tagline + heading + integrator
 * paragraph) on the left, and an interactive next/previous stats carousel
 * (requirements doc, ref julianfella.de) on the right. Click/keyboard driven —
 * not scroll-triggered. Continues the gradient circle's journey via a waypoint.
 */
export default function WhyChoose() {
  const { t, dir } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const stats = t.stats;
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + stats.length) % stats.length);
  const next = () => setIndex((i) => (i + 1) % stats.length);
  const s = stats[index];

  // Continue the circle from Part 3 (right) — drift it left-of-centre and grow.
  useCircleWaypoint(ref, { x: -12, y: 4, scale: 1.3, opacity: 0.55 });

  // Arrow keys follow VISUAL direction, so they invert under RTL.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      (dir === "rtl" ? prev : next)();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      (dir === "rtl" ? next : prev)();
    }
  };

  const [titleLead, titleBrand] = t.statsTitle.split("\n");
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(
    stats.length
  ).padStart(2, "0")}`;

  return (
    <section ref={ref} className="relative z-10 py-32 md:py-48">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid gap-16 md:grid-cols-2 md:items-center md:gap-12">
          {/* Left — PSB framing */}
          <div>
            <p className="mb-5 max-w-xs font-inter text-xs uppercase leading-relaxed tracking-[0.25em] text-[var(--gold-light)]/70">
              {t.statsTagline}
            </p>
            <h2 className="font-inter text-3xl font-light leading-[1.05] tracking-tight md:text-5xl">
              {titleLead}
              <br />
              <span className="text-[var(--gold-light)]">{titleBrand}</span>
            </h2>
            <p className="mt-6 max-w-md font-inter text-base leading-relaxed text-white/70 md:text-lg">
              {t.statsIntro}
            </p>
          </div>

          {/* Right — stats carousel */}
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label={t.statsTitle.replace("\n", " ")}
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
          >
            <div className="mb-6 flex items-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label={t.statsPrev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[var(--gold)]/60 hover:text-white"
              >
                <Chevron rotated={dir === "rtl"} />
              </button>
              <span
                dir="ltr"
                className="font-inter text-sm tracking-[0.2em] text-white/50"
              >
                {counter}
              </span>
              <button
                type="button"
                onClick={next}
                aria-label={t.statsNext}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[var(--gold)]/60 hover:text-white"
              >
                <Chevron rotated={dir !== "rtl"} />
              </button>
            </div>

            <div
              aria-live="polite"
              aria-atomic="true"
              className="relative min-h-[300px] rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm md:p-12"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -30 }}
                  transition={
                    reduce ? { duration: 0.2 } : { duration: 0.5, ease: EASE }
                  }
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-inter text-7xl font-light leading-none md:text-8xl"
                      style={{
                        background:
                          "linear-gradient(180deg, #f2d680 0%, #d4a853 60%, #8556c3 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {s.value}
                    </span>
                    {s.unit && (
                      <span className="font-inter text-sm tracking-[0.3em] text-[var(--gold-light)]/80">
                        {s.unit}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 font-inter text-lg tracking-[0.15em] text-white/90">
                    {s.label}
                  </p>
                  <p className="mt-4 font-inter text-base leading-relaxed text-white/65">
                    {s.copy}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
