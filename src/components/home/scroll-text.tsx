"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/lib/i18n/language-context";
import { useCircleWaypoint } from "./gradient-circle-context";

/**
 * Part 3 — Scroll Text Animation (between sections).
 *
 * The `/demo` sweep, made readable: two oversized keyword bands drift sideways
 * in opposite directions (clipping at the edges is intentional — they read as
 * fragments) while the actual brand statement sits centred *between* them,
 * fully legible and barely moving, so the reader can finish the sentence at
 * rest. This is also where the gradient circle first appears: the section
 * registers a waypoint so the circle settles behind the text.
 */
export default function ScrollText() {
  const { t, dir } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Large opposing drifts give the framing bands a parallax marquee feel; the
  // centre statement only nudges ±5% so it stays readable. Mirror in RTL so
  // each band still enters from the natural reading side.
  const rangeTop: [string, string] =
    dir === "rtl" ? ["-20%", "60%"] : ["20%", "-60%"];
  const rangeBottom: [string, string] =
    dir === "rtl" ? ["40%", "-30%"] : ["-40%", "30%"];
  const rangeStatement: [string, string] =
    dir === "rtl" ? ["-5%", "5%"] : ["5%", "-5%"];
  const xTop = useTransform(scrollYProgress, [0, 1], rangeTop);
  const xBottom = useTransform(scrollYProgress, [0, 1], rangeBottom);
  const xStatement = useTransform(scrollYProgress, [0, 1], rangeStatement);

  // The gradient sphere is this section's visual anchor — bring it well forward
  // (brighter + larger), offset behind/right of the text, to echo the PSB.
  useCircleWaypoint(ref, { x: 22, y: -6, scale: 1.35, opacity: 0.82 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center overflow-hidden py-32 md:py-44"
    >
      {/* Top band — bright gold→purple sweep (decorative; reads as fragments). */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { x: xTop }}
        className="self-stretch whitespace-nowrap"
      >
        <span
          className="font-inter text-[12vw] font-light leading-none tracking-tight"
          style={{
            background:
              "linear-gradient(90deg, #ffffff 0%, #f2d680 40%, #9b59b6 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t.scrollTagline}
        </span>
      </motion.div>

      {/* Centre — the actual statement, kept fully legible at rest. */}
      <motion.p
        style={reduce ? undefined : { x: xStatement }}
        className="relative z-10 my-10 max-w-[92vw] text-center font-inter text-[2rem] font-bold uppercase leading-tight text-[var(--purple-accent)] md:my-14 md:whitespace-nowrap md:text-[3.2vw] md:leading-none"
      >
        {t.scrollStatement}
      </motion.p>

      {/* Bottom band — faint stroked keyword sweep (decorative). */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { x: xBottom }}
        className="self-stretch whitespace-nowrap"
      >
        <span
          className="font-inter text-[10vw] font-light leading-none tracking-tight text-white/15"
          style={{ WebkitTextStroke: "1px rgba(212, 168, 83, 0.3)" }}
        >
          {t.scrollKeywords}
        </span>
      </motion.div>
    </section>
  );
}
