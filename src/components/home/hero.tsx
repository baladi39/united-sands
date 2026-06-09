"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n/language-context";

export default function Hero() {
  const { t } = useLang();

  // Measure scroll against this section (not the whole document) so the arch
  // zoom completes within the hero's own 220vh regardless of the sections below
  // it. ["start start", "end end"] maps progress 0→1 across the hero's pinned
  // range — from when its top hits the viewport top (sticky engages) to when its
  // bottom hits the viewport bottom (sticky releases), i.e. heroHeight − 100vh of
  // travel. That's the same physical distance the old global mapping used back
  // when the hero stood alone, so the zoom + navy crossfade still finish exactly
  // as the section hands off to the content below.
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // Transform-bound scroll values (scale / y) scrub reliably.
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 2.4]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Opacity scrubbing via MotionValue is unreliable here, so drive the three
  // fades imperatively from the scroll progress instead.
  const contentRef = useRef<HTMLDivElement>(null);
  const navyRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (contentRef.current)
      contentRef.current.style.opacity = String(Math.max(0, 1 - v / 0.55));
    if (navyRef.current)
      navyRef.current.style.opacity = String(
        v < 0.72 ? 0 : ((v - 0.72) / 0.28) * 0.95
      );
    if (indicatorRef.current)
      indicatorRef.current.style.opacity = String(Math.max(0, 1 - v / 0.15));
  });

  return (
    <section ref={heroRef} id="top" className="relative h-[220vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Cosmic golden archway — the signature hero visual */}
        <motion.div
          className="absolute inset-0"
          style={{
            scale: bgScale,
            transformOrigin: "50% 46%",
            backgroundImage: "url(/assets/hero-arch.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center 46%",
            filter: "brightness(0.9) saturate(1.05)",
          }}
        />

        {/* Legibility + vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a1a]/50 via-transparent to-[#0d0a1a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(13,10,26,0.65)_100%)]" />
        {/* End-of-zoom crossfade to navy */}
        <div
          ref={navyRef}
          className="absolute inset-0 bg-[#0d0a1a]"
          style={{ opacity: 0 }}
        />

        {/* Particle dots */}
        <div className="absolute inset-0">
          {Array.from({ length: 28 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-[var(--gold-light)]"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                opacity: 0.25 + ((i * 7) % 10) / 25,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.15, 0.7, 0.15],
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                delay: i * 0.12,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <motion.div
          ref={contentRef}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
          style={{ y: contentY, opacity: 1 }}
        >
          <p className="mb-6 text-xs tracking-[0.35em] text-[var(--gold-light)]/80 font-inter">
            {t.heroEyebrow}
          </p>
          <h1
            className="font-inter text-5xl font-bold leading-[0.95] whitespace-pre-line md:text-7xl lg:text-8xl"
            style={{
              // White→gold only (PSB hero is solid white Inter-Bold). Keeping a
              // subtle gold fade for brand flair, but dropping the purple bottom
              // stop that tanked contrast over the bright archway.
              background:
                "linear-gradient(180deg, #ffffff 0%, #ffffff 52%, #f2d680 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t.heroHeadline}
          </h1>
          <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-white/70">
            {t.heroSub}
          </p>
          <Link
            href="/about"
            className="mt-10 group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-xs tracking-[0.25em] backdrop-blur transition hover:border-[var(--gold)]/60 hover:bg-[var(--gold)]/10 font-inter"
          >
            {t.ourStory}
            <span className="transition-transform group-hover:translate-x-1 rtl:-scale-x-100">→</span>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <div
          ref={indicatorRef}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 1 }}
        >
          <span className="text-[10px] tracking-[0.4em] text-white/50 font-inter">
            {t.scrollHint}
          </span>
          <motion.div
            className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent"
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }}
            style={{ transformOrigin: "top" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
