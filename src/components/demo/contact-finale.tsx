"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ContactFinale() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  // Circle grows from the previous CTA morph → becomes massive backdrop
  const circleScale = useTransform(scrollYProgress, [0, 0.6, 1], [0.6, 2.2, 3.5]);
  const circleOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.4, 0.9, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden py-40 md:py-56">
      {/* Expanding circle backdrop */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "60vmin",
          height: "60vmin",
          scale: circleScale,
          opacity: circleOpacity,
          background:
            "radial-gradient(circle, rgba(212,168,83,0.5) 0%, rgba(155,89,182,0.35) 45%, transparent 75%)",
          filter: "blur(30px)",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
        style={{ opacity: contentOpacity }}
      >
        <p className="mb-6 text-xs tracking-[0.4em] text-[var(--gold-light)]/80 font-oswald">
          / CONTACT US
        </p>
        <h2 className="font-oswald text-5xl font-light leading-[0.95] tracking-tight md:text-8xl">
          <span
            style={{
              background:
                "linear-gradient(180deg, #ffffff, #f2d680 60%, #9b59b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Want to talk?
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/70 md:text-base">
          Anas Ibn Malik Rd, Almalqa, Riyadh 13521, Saudi Arabia
          <br />
          info@unitedsands.co · 00966 059 915 7370
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="rounded-full border border-[var(--gold)]/60 bg-[var(--gold)]/20 px-8 py-3 text-xs tracking-[0.3em] text-white backdrop-blur transition hover:bg-[var(--gold)]/30 font-oswald"
          >
            REQUEST PROJECT
          </button>
          <button
            type="button"
            className="rounded-full border border-white/20 bg-white/5 px-8 py-3 text-xs tracking-[0.3em] text-white/80 backdrop-blur transition hover:border-white/40 font-oswald"
          >
            SCHEDULE A CALL
          </button>
        </div>
        <div className="mt-20 flex flex-col items-center gap-2 text-xs tracking-[0.3em] text-white/40 font-oswald">
          <span>UNITED SANDS</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </motion.div>
    </section>
  );
}
