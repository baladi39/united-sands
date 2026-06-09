"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n/language-context";
import { useRequestProject } from "@/lib/request-project-context";

const RADIAL =
  "radial-gradient(circle, rgba(212,168,83,0.55) 0%, rgba(133,86,195,0.40) 45%, transparent 70%)";

/**
 * Part 13b — Contact (Circle-Morph Finale).
 *
 * The end of the journey. As the section scrolls into view a gradient circle
 * expands dramatically into a massive backdrop and the CTA reveals — a
 * self-contained, scroll-scrubbed finale (the travelling shared circle hands
 * off here: Part 13a "partners" holds the last shared waypoint, so this section
 * doesn't register one and there's only one glow). The "Request Project" button
 * opens the same global modal used everywhere else.
 *
 * Per CLAUDE.md: `scale`/`y` scrub reliably via useTransform; opacity does NOT
 * under Lenis, so the fades are driven imperatively through refs.
 */
export default function ContactFinale() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { openForm } = useRequestProject();

  // Progress 0 → 1 as the section scrolls from just-entering to fully in view
  // (it's the last section, so "end end" lands at the page bottom).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const circleScale = useTransform(scrollYProgress, [0, 0.65, 1], [0.5, 2.2, 4]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.75], [60, 0]);

  const applyFades = (v: number) => {
    if (circleRef.current)
      circleRef.current.style.opacity = String(Math.min(0.85, v * 1.1));
    if (contentRef.current)
      contentRef.current.style.opacity = String(
        Math.min(1, Math.max(0, (v - 0.2) / 0.45))
      );
  };
  useMotionValueEvent(scrollYProgress, "change", applyFades);
  // Initialise from current progress so the content isn't stuck hidden if no
  // scroll event fires (e.g. deep-link straight to the bottom).
  useEffect(() => {
    if (!reduce) applyFades(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  const tel = `tel:${t.contactPhone.replace(/[^\d+]/g, "")}`;
  const year = new Date().getFullYear();

  const content = (
    <>
      <p className="mb-6 font-inter text-xs uppercase tracking-[0.35em] text-[var(--gold-light)]/80">
        [ {t.contactEyebrow} ]
      </p>
      <h2 className="font-inter text-5xl font-light leading-[0.95] tracking-tight md:text-8xl">
        <span
          style={{
            background:
              "linear-gradient(180deg, #ffffff 0%, #f2d680 55%, #8556c3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t.contactTitle}
        </span>
      </h2>

      <p className="mx-auto mt-8 max-w-lg font-inter text-sm leading-relaxed text-white/70 md:text-base">
        {t.contactAddress}
      </p>
      <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-inter text-sm text-white/70">
        <a href={`mailto:${t.email}`} className="transition-colors hover:text-white">
          {t.email}
        </a>
        <span aria-hidden="true" className="text-white/25">
          ·
        </span>
        <a href={tel} dir="ltr" className="transition-colors hover:text-white">
          {t.contactPhone}
        </a>
      </p>

      <button
        type="button"
        onClick={openForm}
        className="mt-12 rounded-full border border-[var(--gold)]/60 bg-[var(--gold)]/15 px-10 py-4 font-inter text-xs uppercase tracking-[0.3em] text-white backdrop-blur transition hover:bg-[var(--gold)]/25"
      >
        {t.navRequest}
      </button>

      {/* Minimal closing line (full sitemap footer is a separate follow-up). */}
      <div className="mt-24 flex flex-col items-center gap-2 font-inter text-[10px] uppercase tracking-[0.3em] text-white/40">
        <span>United Sands</span>
        <span dir="ltr">
          © {year} · {t.contactRights}
        </span>
      </div>
    </>
  );

  // Reduced motion: a static, fully-revealed finale with a fixed glow.
  if (reduce) {
    return (
      <section
        id="contact"
        ref={ref}
        className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            className="h-[60vmin] w-[60vmin] rounded-full"
            style={{ background: RADIAL, filter: "blur(60px)", opacity: 0.55, transform: "scale(2.6)" }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl">{content}</div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center md:py-40"
    >
      {/* Expanding circle backdrop — grows as the finale scrolls in. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          ref={circleRef}
          className="h-[60vmin] w-[60vmin] rounded-full"
          style={{ scale: circleScale, opacity: 0, background: RADIAL, filter: "blur(60px)" }}
        />
      </div>

      <motion.div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-3xl"
        style={{ y: contentY, opacity: 0 }}
      >
        {content}
      </motion.div>
    </section>
  );
}
