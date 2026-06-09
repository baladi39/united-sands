"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const PROJECTS = [
  {
    client: "ADNOC",
    country: "UAE",
    title: "Pipeline Inspection Program",
    stat: "40%",
    statLabel: "Cost reduction vs. traditional inspection",
    tags: ["Reality Capture", "GIS", "Drone Intelligence"],
  },
  {
    client: "NEOM",
    country: "KSA",
    title: "Smart City Command Platform",
    stat: "6M+",
    statLabel: "IoT signals processed per day",
    tags: ["Digital Twin", "Command & Control", "Predictive Ops"],
  },
  {
    client: "Royal Commission",
    country: "KSA",
    title: "Industrial Zone Digital Twin",
    stat: "24/7",
    statLabel: "Live 4D operational visibility",
    tags: ["Digital Twin", "LiDAR", "Spatial Analytics"],
  },
];

export default function Portfolio() {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length);
  const next = () => setIndex((i) => (i + 1) % PROJECTS.length);
  const p = PROJECTS[index];

  return (
    <section className="relative py-32 md:py-48">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs tracking-[0.35em] text-[var(--gold-light)]/70 font-inter">
              / 09
            </p>
            <h2 className="font-inter text-3xl font-light tracking-tight md:text-5xl">
              Latest
              <br />
              <span className="text-[var(--gold-light)]">Portfolio</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[var(--gold)]/60 hover:text-white"
              aria-label="Previous project"
              type="button"
            >
              ←
            </button>
            <span className="font-inter text-sm tracking-[0.2em] text-white/50">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(PROJECTS.length).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[var(--gold)]/60 hover:text-white"
              aria-label="Next project"
              type="button"
            >
              →
            </button>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-10 p-10 md:grid-cols-[1fr_1.2fr] md:items-center md:p-16"
            >
              <div>
                <div className="flex items-center gap-3 text-xs tracking-[0.3em] text-white/50 font-inter">
                  <span>{p.client}</span>
                  <span className="h-px w-4 bg-white/30" />
                  <span>{p.country}</span>
                </div>
                <h3 className="mt-4 font-inter text-3xl font-light leading-tight md:text-5xl">
                  {p.title}
                </h3>
                <div className="mt-8 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] tracking-[0.2em] text-white/70 font-inter"
                    >
                      {t.toUpperCase()}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-10 flex items-center gap-3 text-xs tracking-[0.3em] text-[var(--gold-light)] transition hover:text-white font-inter"
                >
                  VIEW CASE STUDY →
                </button>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="aspect-square w-full max-w-sm rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-[var(--gold)]/10 via-transparent to-[var(--purple-accent)]/20 p-10">
                  <div className="flex h-full flex-col justify-end">
                    <span
                      className="font-inter text-7xl font-light leading-none md:text-8xl"
                      style={{
                        background:
                          "linear-gradient(180deg, #f2d680, #9b59b6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {p.stat}
                    </span>
                    <p className="mt-3 text-xs leading-relaxed text-white/60">
                      {p.statLabel}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
