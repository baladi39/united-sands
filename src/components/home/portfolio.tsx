"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { useLang } from "@/lib/i18n/language-context";
import { useCircleWaypoint } from "./gradient-circle-context";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Part 9 — "Latest Portfolio".
 *
 * Simple per the spec: the 3 newest projects with next/previous navigation.
 * The gradient circle enters from the right (positive-x waypoint) and settles
 * into place as the section centres, continuing the "path" visual from Part 8.
 * Projects come from `t.portfolio` (placeholders until the client delivers the
 * real three). Slide direction + nav glyphs mirror under RTL.
 */
export default function Portfolio() {
  const { t, dir } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  // Circle enters from the right and settles centred — continues the path from Part 8.
  useCircleWaypoint(ref, { x: 18, y: 0, scale: 1.4, opacity: 0.45 });

  const projects = t.portfolio;
  const prev = () =>
    setIndex((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setIndex((i) => (i + 1) % projects.length);
  const p = projects[index];

  const [lead, brand] = t.portfolioTitle.split("\n");
  // Slide enters from the leading edge; flip the sign under RTL (and flatten when reduced).
  const dx = reduce ? 0 : dir === "rtl" ? -60 : 60;

  return (
    <section ref={ref} className="relative z-10 px-6 py-32 md:py-48">
      <div className="mx-auto max-w-6xl">
        {/* Header — heading on the leading side, nav on the trailing side */}
        <div className="mb-12 flex items-end justify-between gap-6">
          <div className="max-w-md">
            <p className="mb-4 font-oswald text-xs tracking-[0.4em] text-[var(--gold-light)]/70">
              / 09
            </p>
            <h2 className="font-oswald text-3xl font-light leading-[1.02] tracking-tight text-white md:text-5xl">
              {lead}
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #f2d680 0%, #8556c3 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {brand}
              </span>
            </h2>
            <p className="mt-5 font-roboto text-sm leading-relaxed text-white/65">
              {t.portfolioIntro}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[var(--gold)]/60 hover:text-white"
              aria-label={t.portfolioPrev}
              type="button"
            >
              {dir === "rtl" ? "→" : "←"}
            </button>
            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[var(--gold)]/60 hover:text-white"
              aria-label={t.portfolioNext}
              type="button"
            >
              {dir === "rtl" ? "←" : "→"}
            </button>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: dx }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -dx }}
              transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }}
              className="grid gap-10 p-10 md:grid-cols-[1fr_1.2fr] md:items-center md:p-16"
            >
              <div>
                <div className="flex items-center gap-3 font-oswald text-xs tracking-[0.3em] text-white/50">
                  <span>{p.client}</span>
                  <span className="h-px w-4 bg-white/30" />
                  <span>{p.country}</span>
                </div>
                <h3 className="mt-4 font-oswald text-3xl font-light leading-tight text-white md:text-5xl">
                  {p.title}
                </h3>
                <div className="mt-8 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-oswald text-[10px] tracking-[0.2em] text-white/70"
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-10 flex items-center gap-3 font-oswald text-xs tracking-[0.3em] text-[var(--gold-light)] transition hover:text-white"
                >
                  {t.portfolioCaseStudy}
                </button>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-[var(--gold)]/10 via-transparent to-[var(--purple-accent)]/20">
                  {/* Isometric smart-city render (PSB portfolio artboard) */}
                  <Image
                    src="/assets/portfolio-city.webp"
                    alt=""
                    fill
                    sizes="(min-width: 768px) 24rem, 90vw"
                    className="object-contain p-6"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a1a] via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col p-8">
                    <span
                      className="font-oswald text-7xl font-light leading-none md:text-8xl"
                      style={{
                        background: "linear-gradient(180deg, #f2d680, #8556c3)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {p.stat}
                    </span>
                    <p className="mt-3 font-roboto text-xs leading-relaxed text-white/60">
                      {p.statLabel}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {projects.map((proj, i) => (
            <button
              key={proj.client}
              onClick={() => setIndex(i)}
              className={`h-px transition-all ${
                i === index ? "w-16 bg-[var(--gold)]" : "w-8 bg-white/20"
              }`}
              aria-label={`${proj.client} — ${proj.title}`}
              aria-current={i === index}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
