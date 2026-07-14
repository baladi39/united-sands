"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const STATS = [
  {
    value: "12",
    unit: "CITIES",
    label: "Scale of Reach",
    copy: "Active deployments across Saudi Arabia's most strategic industrial zones and urban centres.",
  },
  {
    value: "97%",
    unit: "",
    label: "Customer Success",
    copy: "Customer satisfaction measured across pilots, long-term engagements, and transformation programs.",
  },
  {
    value: "15+",
    unit: "YEARS",
    label: "Combined Experience",
    copy: "Leadership bringing decades of geospatial, digital twin, and smart-infrastructure expertise.",
  },
  {
    value: "60",
    unit: "EXPERTS",
    label: "Team Strength",
    copy: "Engineers, data scientists, and regulatory specialists, fluent in both global tech and local context.",
  },
  {
    value: "30+",
    unit: "PROJECTS",
    label: "Strategic Delivery",
    copy: "From city-scale command centres to field-grade reality-capture programs.",
  },
];

export default function Stats() {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + STATS.length) % STATS.length);
  const next = () => setIndex((i) => (i + 1) % STATS.length);
  const s = STATS[index];

  return (
    <section className="relative py-32 md:py-48">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-16 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs tracking-[0.35em] text-(--gold-light)/70 font-inter">
              / 04
            </p>
            <h2 className="font-inter text-3xl font-light tracking-tight md:text-5xl">
              Why Choose
              <br />
              <span className="text-(--gold-light)">United Sands?</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-(--gold)/60 hover:text-white"
              aria-label="Previous stat"
              type="button"
            >
              ←
            </button>
            <span className="font-inter text-sm tracking-[0.2em] text-white/50">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(STATS.length).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-(--gold)/60 hover:text-white"
              aria-label="Next stat"
              type="button"
            >
              →
            </button>
          </div>
        </div>

        <div className="relative min-h-80 rounded-2xl border border-white/10 bg-white/3 p-10 backdrop-blur-sm md:p-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-10 md:grid-cols-2 md:items-center"
            >
              <div>
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-inter text-8xl font-light leading-none md:text-9xl"
                    style={{
                      background:
                        "linear-gradient(180deg, #f2d680 0%, #d4a853 60%, #9b59b6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.value}
                  </span>
                  {s.unit && (
                    <span className="font-inter text-sm tracking-[0.3em] text-(--gold-light)/80">
                      {s.unit}
                    </span>
                  )}
                </div>
                <p className="mt-4 font-inter text-lg tracking-[0.15em] text-white/90">
                  {s.label}
                </p>
              </div>
              <p className="text-base leading-relaxed text-white/70 md:text-lg">
                {s.copy}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
