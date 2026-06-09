"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/lib/i18n/language-context";
import { useRequestProject } from "@/lib/request-project-context";
import { useCircleWaypoint } from "./gradient-circle-context";

const BRAND_GRADIENT = {
  background: "linear-gradient(90deg, #f2d680 0%, #8556c3 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
} as const;

/**
 * Part 8 — "Request Project" Button Morph.
 *
 * As the user scrolls, the corner "Request Project" pill morphs into a large
 * gold→purple circle centred in the viewport (clickable → opens the global
 * Request Project modal), with a short lead-in heading that fades out as the
 * circle forms (spec ref: scrgroup.com). Mechanics adapted from
 * `src/components/demo/cta-morph.tsx`, with the project's sticky-scroll +
 * imperative-opacity conventions. Continues the gradient circle as a halo.
 *
 * Desktop-first (the corner button is desktop-only); mobile + reduced motion get
 * a plain static CTA.
 */
export default function CtaMorph() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const { openForm } = useRequestProject();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Pill → circle morph over the early pin range, then held centred. Width/height
  // stay in vmin at BOTH ends — Framer can't interpolate mixed units (px↔vmin),
  // which would balloon the "px" end into a huge vmin value.
  const width = useTransform(scrollYProgress, [0.1, 0.55], ["26vmin", "68vmin"]);
  const height = useTransform(scrollYProgress, [0.1, 0.55], ["6vmin", "68vmin"]);
  const top = useTransform(scrollYProgress, [0.1, 0.55], ["14%", "50%"]);
  const left = useTransform(scrollYProgress, [0.1, 0.55], ["78%", "50%"]);
  const fontSize = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.55],
    ["11px", "16px", "30px"]
  );
  const letterSpacing = useTransform(
    scrollYProgress,
    [0.1, 0.55],
    ["0.25em", "0.32em"]
  );
  const bgOpacity = useTransform(scrollYProgress, [0.1, 0.55], [0.12, 0.92]);
  const background = useMotionTemplate`radial-gradient(circle at 50% 50%, rgba(212,168,83,${bgOpacity}) 0%, rgba(133,86,195,0.5) 70%)`;
  const headingY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  // Opacity scrubbing is unreliable under Lenis + sticky, so drive the heading
  // fade imperatively (see hero.tsx): fade in, hold, fade out as the circle forms.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (headingRef.current) {
      const fadeIn = Math.min(1, v / 0.1);
      const fadeOut = 1 - Math.min(1, Math.max(0, (v - 0.3) / 0.15));
      headingRef.current.style.opacity = String(Math.min(fadeIn, fadeOut));
    }
  });

  // Continue the gradient circle from Part 7 — a centred glow that haloes the CTA.
  useCircleWaypoint(ref, { x: 0, y: 0, scale: 1.7, opacity: 0.5 });

  const [lead, brand] = t.ctaHeading.split("\n");

  const heading = (
    <div className="max-w-3xl">
      <p className="mb-4 font-inter text-xs uppercase tracking-[0.35em] text-[var(--gold-light)]/70">
        [ {t.ctaEyebrow} ]
      </p>
      <h2 className="font-inter text-4xl font-light leading-[1.0] tracking-tight text-white md:text-6xl">
        {lead}
        <br />
        <span style={BRAND_GRADIENT}>{brand}</span>
      </h2>
    </div>
  );

  const staticCta = (
    <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
      {heading}
      <button
        type="button"
        onClick={openForm}
        className="mt-12 flex h-44 w-44 items-center justify-center rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 font-inter text-xs uppercase tracking-[0.25em] text-[var(--gold-light)] transition hover:bg-[var(--gold)]/20"
      >
        {t.navRequest}
      </button>
    </div>
  );

  // Reduced motion: a plain static CTA at any width.
  if (reduce) {
    return (
      <section ref={ref} className="relative z-10 px-6 py-32 md:py-48">
        {staticCta}
      </section>
    );
  }

  return (
    <section ref={ref} className="relative z-10">
      {/* Mobile / small screens — static CTA (the morph is desktop-first). */}
      <div className="px-6 py-32 md:hidden">{staticCta}</div>

      {/* md+ — scroll-driven pill → circle morph. */}
      <div className="hidden h-[220vh] md:block">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Lead-in heading (imperative opacity), behind the morphing button. */}
          <motion.div
            ref={headingRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center"
            style={{ y: headingY, opacity: 1 }}
          >
            {heading}
          </motion.div>

          {/* Morphing CTA — pill in the top-right that grows to a centred circle. */}
          <motion.button
            type="button"
            onClick={openForm}
            aria-label={t.navRequest}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[var(--gold)]/40 font-inter uppercase backdrop-blur-sm"
            style={{
              width,
              height,
              borderRadius: 9999,
              top,
              left,
              fontSize,
              letterSpacing,
              background,
            }}
          >
            <span
              className="whitespace-nowrap"
              style={{
                background: "linear-gradient(90deg, #ffffff, #f2d680)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t.navRequest}
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
