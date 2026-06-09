"use client";

import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n/language-context";
import { useCircleWaypoint } from "./gradient-circle-context";
import { useCarousel } from "./use-carousel";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Gap between cards, in px — must match the `gap-6` (1.5rem) on the track. */
const GAP = 24;

/** Left-pointing chevron; flip horizontally with `rotate-180` for the other way. */
function Chevron({ rotated }: { rotated: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-4 w-4 ${rotated ? "rotate-180" : ""}`}
    >
      <path
        d="M15 18l-6-6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Part 11 — "THE TEAM".
 *
 * A multi-card sliding track (3 cards on desktop, 2 on tablet, 1 on mobile)
 * navigated by next/previous, keyboard arrows, AND drag/swipe. Index + keyboard
 * + clamped (non-wrapping) navigation come from {@link useCarousel} (`wrap:
 * false`); the track translate + drag-to-nearest-stop are track-specific here.
 * Each card flips up an inline bio on "Read Bio" and links to LinkedIn.
 * Continues the gradient circle toward the Part 13 finale.
 */
export default function Team() {
  const { t, dir } = useLang();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const members = t.team;
  const [perView, setPerView] = useState(3);
  const [step, setStep] = useState(0); // card width + gap, measured from the DOM
  const [expanded, setExpanded] = useState<number | null>(null);

  // Number of valid track stops (one card per step, no wrap).
  const stops = Math.max(1, members.length - perView + 1);
  const maxIndex = stops - 1;
  const { index, prev, next, goTo, onKeyDown } = useCarousel(stops, {
    dir,
    reduce,
    wrap: false,
  });
  const clampedIndex = Math.min(index, maxIndex);

  // Continue the circle's growth from Part 10 toward the Part 13 finale.
  useCircleWaypoint(sectionRef, { x: 0, y: 0, scale: 1.7, opacity: 0.3 });

  // Track responsive cards-per-view + the per-step pixel distance.
  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
      const first = trackRef.current?.firstElementChild as HTMLElement | null;
      if (first) setStep(first.getBoundingClientRect().width + GAP);
    };
    measure();
    const raf = requestAnimationFrame(measure); // catch late layout (fonts)
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, []);

  // RTL lays the row right-to-left, so advancing moves the track the other way.
  const x = (dir === "rtl" ? 1 : -1) * clampedIndex * step;
  const limit = maxIndex * step;
  const dragConstraints =
    dir === "rtl" ? { left: 0, right: limit } : { left: -limit, right: 0 };

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    if (!step) return;
    const delta = (info.offset.x + info.velocity.x * 0.2) / step;
    const moved = dir === "rtl" ? clampedIndex + delta : clampedIndex - delta;
    goTo(Math.round(moved)); // goTo clamps to [0, stops-1]
  };

  const [titleLead, titleBrand] = t.teamTitle.split("\n");

  return (
    <section id="team" ref={sectionRef} className="relative z-10 px-6 py-32 md:py-48">
      <div className="mx-auto max-w-6xl">
        {/* Header — title on the leading side, nav on the trailing side */}
        <div className="mb-12 flex items-end justify-between gap-6">
          <div className="max-w-md">
            <p className="mb-4 font-oswald text-xs tracking-[0.4em] text-[var(--gold-light)]/70">
              / 11
            </p>
            <h2 className="font-oswald text-3xl font-light leading-[1.02] tracking-tight text-white md:text-5xl">
              {titleBrand ? (
                <>
                  {titleLead}
                  <br />
                  <span
                    style={{
                      background:
                        "linear-gradient(90deg, #f2d680 0%, #8556c3 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {titleBrand}
                  </span>
                </>
              ) : (
                titleLead
              )}
            </h2>
            <p className="mt-5 font-roboto text-sm leading-relaxed text-white/65">
              {t.teamIntro}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={prev}
              disabled={clampedIndex <= 0}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[var(--gold)]/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              aria-label={t.teamPrev}
              type="button"
            >
              <Chevron rotated={dir === "rtl"} />
            </button>
            <button
              onClick={next}
              disabled={clampedIndex >= maxIndex}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[var(--gold)]/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              aria-label={t.teamNext}
              type="button"
            >
              <Chevron rotated={dir !== "rtl"} />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label={t.teamTitle.replace("\n", " ")}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="overflow-hidden rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
        >
          <motion.div
            ref={trackRef}
            className="flex cursor-grab gap-6 touch-pan-y active:cursor-grabbing"
            drag="x"
            dragConstraints={dragConstraints}
            dragElastic={0.15}
            onDragEnd={onDragEnd}
            animate={{ x }}
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 260, damping: 34 }
            }
          >
            {members.map((m, i) => {
              const isOpen = expanded === i;
              return (
                <article
                  key={m.name}
                  className="shrink-0 grow-0 basis-full sm:basis-[calc((100%_-_24px)/2)] lg:basis-[calc((100%_-_48px)/3)]"
                >
                  <div className="relative h-[440px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                    {/* Photo placeholder — TODO: swap for /assets/team/<slug>.webp (dim overlay per Part 5). */}
                    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[var(--purple-accent)]/35 via-[#0d0a1a] to-[var(--gold)]/15">
                      <span className="select-none font-oswald text-7xl font-light text-white/10">
                        {m.initials}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a1a] via-[#0d0a1a]/40 to-transparent" />

                    {/* Bottom content */}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="font-oswald text-2xl font-light leading-tight text-white">
                        {m.name}
                      </h3>
                      <p className="mt-1 font-oswald text-xs uppercase tracking-[0.25em] text-[var(--gold-light)]/80">
                        {m.role}
                      </p>
                      <div className="mt-5 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          className="font-oswald text-xs tracking-[0.3em] text-white/80 transition hover:text-[var(--gold-light)]"
                        >
                          {t.teamReadBio}
                        </button>
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${m.name} ${t.teamLinkedin}`}
                          className="opacity-70 transition-opacity hover:opacity-100"
                        >
                          <Image
                            src="/images/linkedin.png"
                            alt=""
                            width={20}
                            height={20}
                            draggable={false}
                          />
                        </a>
                      </div>
                    </div>

                    {/* Inline bio — slides up over the card */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={reduce ? { opacity: 0 } : { y: "100%" }}
                          animate={reduce ? { opacity: 1 } : { y: 0 }}
                          exit={reduce ? { opacity: 0 } : { y: "100%" }}
                          transition={
                            reduce ? { duration: 0.15 } : { duration: 0.4, ease: EASE }
                          }
                          className="absolute inset-0 flex flex-col bg-[#0d0a1a]/95 p-6 backdrop-blur-sm"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-oswald text-xl font-light leading-tight text-white">
                                {m.name}
                              </h3>
                              <p className="mt-1 font-oswald text-xs uppercase tracking-[0.25em] text-[var(--gold-light)]/80">
                                {m.role}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setExpanded(null)}
                              aria-label={t.formClose}
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white"
                            >
                              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                <path
                                  d="M1 1l14 14M15 1L1 15"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                />
                              </svg>
                            </button>
                          </div>
                          <p className="mt-5 font-roboto text-sm leading-relaxed text-white/75">
                            {m.bio}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </div>

        {/* Progress dashes — one per stop */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: stops }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-px transition-all ${
                i === clampedIndex ? "w-16 bg-[var(--gold)]" : "w-8 bg-white/20"
              }`}
              aria-label={`${i + 1}`}
              aria-current={i === clampedIndex}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
