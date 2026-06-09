"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n/language-context";

// Focal point of the zoom — the arch's mouth in the source frame. Both the
// scene and the arch plane scale from here so the zoom drives into the portal.
const FOCAL = "50% 48%";

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

  // The hero visual is the real PSB artwork split into two planes that share an
  // origin on the arch's mouth (FOCAL). The scene zooms gently while the golden
  // arch zooms much faster and fades — so you appear to fly through the portal.
  // (The PSB arch is a flat bake, so it was masked out of the scene into its own
  // transparent layer; the scene has the arch removed to avoid a ghost double.)
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.85]);
  const archScale = useTransform(scrollYProgress, [0, 1], [1, 4.6]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Opacity scrubbing via MotionValue is unreliable here, so drive the fades
  // imperatively from the scroll progress instead.
  const archRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navyRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (archRef.current)
      // Arch rushes past the viewer and dissolves before the navy crossfade.
      archRef.current.style.opacity = String(Math.max(0, 1 - v / 0.62));
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
        {/* Cosmic scene (arch removed) — slow zoom */}
        <motion.div
          className="absolute inset-0"
          style={{
            scale: sceneScale,
            transformOrigin: FOCAL,
            backgroundImage: "url(/assets/hero-scene.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center 48%",
            filter: "brightness(0.92) saturate(1.05)",
          }}
        />
        {/* Golden arch — fast zoom + fade, flying past the viewer */}
        <motion.div
          ref={archRef}
          className="absolute inset-0"
          style={{
            scale: archScale,
            transformOrigin: FOCAL,
            backgroundImage: "url(/assets/hero-arch-glow.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center 48%",
            opacity: 1,
            willChange: "transform, opacity",
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
            className="font-inter text-5xl font-bold leading-[0.95] whitespace-pre-line text-white md:text-7xl lg:text-8xl"
            style={{
              // PSB hero title is solid white Inter-Bold. Soft shadow keeps it
              // legible across the bright arch as it zooms past.
              textShadow: "0 2px 40px rgba(13,10,26,0.55)",
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
