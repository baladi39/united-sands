"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CtaMorph() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map progress → button dimensions and position
  const width = useTransform(scrollYProgress, [0.2, 0.7], ["200px", "70vmin"]);
  const height = useTransform(scrollYProgress, [0.2, 0.7], ["48px", "70vmin"]);
  const radius = useTransform(scrollYProgress, [0.2, 0.7], ["999px", "999px"]);
  const top = useTransform(scrollYProgress, [0.2, 0.7], ["15%", "50%"]);
  const left = useTransform(scrollYProgress, [0.2, 0.7], ["75%", "50%"]);
  const fontSize = useTransform(
    scrollYProgress,
    [0.2, 0.55, 0.7],
    ["11px", "18px", "32px"]
  );
  const letterSpacing = useTransform(
    scrollYProgress,
    [0.2, 0.7],
    ["0.25em", "0.4em"]
  );
  const bgOpacity = useTransform(scrollYProgress, [0.2, 0.7], [0.1, 0.9]);
  const background = useMotionTemplate`radial-gradient(circle at 50% 50%, rgba(212,168,83,${bgOpacity}) 0%, rgba(155,89,182,0.3) 70%)`;
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.7],
    [0, 1, 1, 0]
  );

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Headline that fades out as button grows */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6 text-center"
          style={{ opacity: headingOpacity }}
        >
          <div className="max-w-3xl">
            <p className="mb-4 text-xs tracking-[0.35em] text-[var(--gold-light)]/70 font-inter">
              / 08
            </p>
            <h2 className="font-inter text-4xl font-light leading-[0.95] tracking-tight md:text-6xl">
              Ready to shape
              <br />
              <span className="text-[var(--gold-light)]">your transformation?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-sm text-white/60">
              Scroll to reach out.
            </p>
          </div>
        </motion.div>

        {/* Morphing button */}
        <motion.button
          type="button"
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[var(--gold)]/60 text-center font-inter uppercase text-white backdrop-blur-sm"
          style={{
            width,
            height,
            borderRadius: radius,
            top,
            left,
            fontSize,
            letterSpacing,
            background,
          }}
        >
          <motion.span
            style={{
              background:
                "linear-gradient(90deg, #ffffff, #f2d680)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Request Project
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
