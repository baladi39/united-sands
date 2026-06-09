"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroArch() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 3.5]);
  const archScale = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const archOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.8, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 0.6, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background */}
        <motion.div
          className="absolute inset-0"
          style={{
            scale: bgScale,
            backgroundImage: "url(/images/background.png)",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            filter: "brightness(0.35) saturate(1.1)",
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a1a]/40 via-transparent to-[#0d0a1a]" />

        {/* Cosmic arch */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%]"
          style={{ scale: archScale, opacity: archOpacity }}
        >
          <svg
            width="520"
            height="620"
            viewBox="0 0 520 620"
            fill="none"
            className="drop-shadow-[0_0_60px_rgba(212,168,83,0.5)]"
          >
            <defs>
              <linearGradient id="archGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f2d680" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#d4a853" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#9b59b6" stopOpacity="0.3" />
              </linearGradient>
              <radialGradient id="archFill" cx="0.5" cy="0.5">
                <stop offset="0%" stopColor="#d4a853" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#9b59b6" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d="M 40 620 L 40 260 Q 40 40 260 40 Q 480 40 480 260 L 480 620"
              stroke="url(#archGradient)"
              strokeWidth="1.5"
              fill="url(#archFill)"
            />
            <path
              d="M 80 620 L 80 270 Q 80 80 260 80 Q 440 80 440 270 L 440 620"
              stroke="url(#archGradient)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </motion.div>

        {/* Particle dots */}
        <div className="absolute inset-0">
          {Array.from({ length: 36 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-[var(--gold-light)]"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                opacity: 0.3 + ((i * 7) % 10) / 20,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <p className="mb-6 text-xs tracking-[0.35em] text-[var(--gold-light)]/80 font-inter">
            UNITED SANDS
          </p>
          <h1
            className="font-inter text-5xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
            style={{
              background:
                "linear-gradient(180deg, #ffffff 0%, #f2d680 60%, #9b59b6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            WE SHAPE
            <br />
            THE FUTURE
          </h1>
          <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-white/70">
            A Saudi-born technology consultancy engineering the next era of smart
            cities, digital twins, and geospatial intelligence.
          </p>
          <button
            type="button"
            className="mt-10 group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-xs tracking-[0.25em] backdrop-blur transition hover:border-[var(--gold)]/60 hover:bg-[var(--gold)]/10 font-inter"
          >
            OUR STORY
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: indicatorOpacity }}
        >
          <span className="text-[10px] tracking-[0.4em] text-white/50 font-inter">
            SCROLL
          </span>
          <motion.div
            className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent"
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }}
            style={{ transformOrigin: "top" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
