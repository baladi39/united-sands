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
 * A single statement that drifts gently sideways as the user scrolls, sized so
 * the whole sentence stays readable (spec ref: relm.co). Copy + flat brand
 * purple match the client PSB (`in_between` artboard). This is also where the
 * gradient circle first appears: the section registers a waypoint so the circle
 * fades in and settles behind the text.
 */
export default function ScrollText() {
  const { t, dir } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle, bounded drift — the whole sentence stays on screen the entire time
  // (not a marquee). Mirror the direction in RTL so it reads naturally either way.
  const range: [string, string] =
    dir === "rtl" ? ["-5%", "5%"] : ["5%", "-5%"];
  const x = useTransform(scrollYProgress, [0, 1], range);

  // The gradient sphere is this section's visual anchor — in the PSB the same
  // statement sits over the purple sphere so the whitespace reads as composed,
  // not empty. Bring it well forward (brighter + larger), offset behind/right
  // of the sentence, to replicate that on the dark theme.
  useCircleWaypoint(ref, { x: 22, y: -6, scale: 1.35, opacity: 0.82 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center overflow-hidden py-24 md:py-36"
    >
      <motion.p
        // Reduced motion: render static + centred, fully legible.
        style={reduce ? undefined : { x }}
        // Wraps on small screens; on md+ it's one line sized to stay fully
        // visible (~75vw) with room for the drift.
        className="relative z-10 mx-auto max-w-[92vw] text-center font-inter text-[2rem] font-bold uppercase leading-tight text-[var(--purple-accent)] md:whitespace-nowrap md:text-[3.4vw] md:leading-none"
      >
        {t.scrollStatement}
      </motion.p>

      {/* Faint scroll cue — signals "this is a transition, keep going" so the
          breather doesn't read as a broken/empty screen. */}
      <motion.div
        aria-hidden
        className="relative z-10 mt-14 h-9 w-px bg-gradient-to-b from-[var(--purple-light)]/40 to-transparent"
        style={{ transformOrigin: "top" }}
        animate={reduce ? undefined : { scaleY: [0.5, 1, 0.5], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
