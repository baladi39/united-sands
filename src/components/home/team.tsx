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

/** A real LinkedIn URL was provided (not the "#" placeholder). */
const hasLinkedin = (url: string) => Boolean(url) && url !== "#";

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

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/**
 * Part 11 — "THE TEAM".
 *
 * A multi-card sliding track (3 cards on desktop, 2 on tablet, 1 on mobile)
 * navigated by next/previous, keyboard arrows, and — on touch only — swipe.
 * Index + keyboard + clamped (non-wrapping) navigation come from
 * {@link useCarousel} (`wrap: false`); the track translate + swipe-to-nearest-stop
 * are track-specific here.
 *
 * Photos are intentionally omitted for now — each card is a typographic monogram
 * tile. Clicking anywhere on a card opens a centered dialog that flips open to
 * reveal the full (multi-paragraph) bio. Continues the gradient circle toward the
 * Part 13 finale.
 */
export default function Team() {
  const { t, dir } = useLang();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const members = t.team;
  const [perView, setPerView] = useState(3);
  const [step, setStep] = useState(0); // card width + gap, measured from the DOM
  const [openBio, setOpenBio] = useState<number | null>(null);
  // Swipe belongs to touch. On a mouse the whole card is a click target, so
  // dragging the track would only fight with it (and hand back a grab cursor).
  const [swipeable, setSwipeable] = useState(false);
  // A swipe ends in a click on whichever card is under the finger — swallow it.
  const swipedRef = useRef(false);

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

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const sync = () => setSwipeable(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Pause smooth scroll + close the bio dialog on Escape while it's open.
  useEffect(() => {
    if (openBio === null) return;
    const lenis = (
      window as unknown as { lenis?: { stop: () => void; start: () => void } }
    ).lenis;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenBio(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [openBio]);

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

  const openProfile = (i: number) => {
    if (swipedRef.current) return; // the click that trails a swipe
    setOpenBio(i);
  };

  const [titleLead, titleBrand] = t.teamTitle.split("\n");
  const active = openBio === null ? null : members[openBio];

  return (
    <section id="team" ref={sectionRef} className="relative z-10 px-6 py-32 md:py-48">
      <div className="mx-auto max-w-6xl">
        {/* Header — title on the leading side, nav on the trailing side */}
        <div className="mb-12 flex items-end justify-between gap-6">
          <div className="max-w-md">
            <h2 className="font-inter text-3xl font-light leading-[1.02] tracking-tight text-white md:text-5xl">
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
            <p className="mt-5 font-inter text-sm leading-relaxed text-white/65">
              {t.teamIntro}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={prev}
              disabled={clampedIndex <= 0}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-(--gold)/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              aria-label={t.teamPrev}
              type="button"
            >
              <Chevron rotated={dir === "rtl"} />
            </button>
            <button
              onClick={next}
              disabled={clampedIndex >= maxIndex}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-(--gold)/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
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
          className="overflow-hidden rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--gold)"
        >
          <motion.div
            ref={trackRef}
            className="flex gap-6 touch-pan-y"
            drag={swipeable ? "x" : false}
            dragConstraints={dragConstraints}
            dragElastic={0.15}
            onPointerDown={() => {
              swipedRef.current = false;
            }}
            onDrag={(_e, info: PanInfo) => {
              if (Math.abs(info.offset.x) > 6) swipedRef.current = true;
            }}
            onDragEnd={onDragEnd}
            animate={{ x }}
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 260, damping: 34 }
            }
          >
            {members.map((m, i) => (
              <article
                key={m.name}
                className="shrink-0 grow-0 basis-full sm:basis-[calc((100%-24px)/2)] lg:basis-[calc((100%-48px)/3)]"
              >
                <div className="group relative flex h-95 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-(--purple-accent)/20 via-white/2 to-(--gold)/10 p-7 transition-colors hover:border-(--gold)/50">
                  {/* Top glow */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_at_top,rgba(133,86,195,0.22),transparent_70%)]" />

                  {/* The whole card opens the bio. Kept under the LinkedIn link
                      (z-20) so that stays its own target. */}
                  <button
                    type="button"
                    onClick={() => openProfile(i)}
                    aria-haspopup="dialog"
                    aria-label={`${m.name} — ${t.teamReadBio}`}
                    className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--gold)"
                  />

                  {/* Monogram — the card's visual anchor in place of a photo */}
                  <span className="relative select-none font-inter text-[5.5rem] font-extralight leading-none text-white/10">
                    {m.initials}
                  </span>

                  {/* Bottom content */}
                  <div className="relative">
                    <h3 className="font-inter text-2xl font-light leading-tight text-white">
                      {m.name}
                    </h3>
                    <p className="mt-2 font-inter text-[11px] uppercase leading-[1.7] tracking-[0.2em] text-(--gold-light)/80">
                      {m.role}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span
                        aria-hidden="true"
                        className="font-inter text-xs tracking-[0.3em] text-white/80 transition-colors group-hover:text-(--gold-light)"
                      >
                        {t.teamReadBio}
                      </span>
                      {hasLinkedin(m.linkedin) && (
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${m.name} ${t.teamLinkedin}`}
                          className="relative z-20 opacity-70 transition-opacity hover:opacity-100"
                        >
                          <Image
                            src="/images/linkedin.png"
                            alt=""
                            width={20}
                            height={20}
                            draggable={false}
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        {/* Progress dashes — one per stop */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: stops }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-px transition-all ${
                i === clampedIndex ? "w-16 bg-(--gold)" : "w-8 bg-white/20"
              }`}
              aria-label={`${i + 1}`}
              aria-current={i === clampedIndex}
              type="button"
            />
          ))}
        </div>
      </div>

      {/* Bio dialog — flips open from the side, centered over the page */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-90 flex items-center justify-center p-4"
            dir={dir}
            style={{ perspective: 1400 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <button
              type="button"
              aria-label={t.formClose}
              onClick={() => setOpenBio(null)}
              className="absolute inset-0 cursor-default bg-[#07050f]/80 backdrop-blur-md"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.name}
              className="relative z-10 flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#120e22] shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
              style={{ transformStyle: "preserve-3d", transformOrigin: "center" }}
              initial={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, rotateY: -90, scale: 0.92 }
              }
              animate={
                reduce ? { opacity: 1 } : { opacity: 1, rotateY: 0, scale: 1 }
              }
              exit={
                reduce ? { opacity: 0 } : { opacity: 0, rotateY: 90, scale: 0.92 }
              }
              transition={
                reduce ? { duration: 0.15 } : { duration: 0.55, ease: EASE }
              }
            >
              {/* Glow accent */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(133,86,195,0.25),transparent_70%)]" />

              <div className="relative flex items-start justify-between gap-4 p-7 pb-0">
                <div>
                  <span className="font-inter text-5xl font-extralight leading-none text-white/10">
                    {active.initials}
                  </span>
                  <h3 className="mt-4 font-inter text-2xl font-light leading-tight text-white">
                    {active.name}
                  </h3>
                  <p className="mt-2 font-inter text-[11px] uppercase leading-[1.7] tracking-[0.2em] text-(--gold-light)/80">
                    {active.role}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenBio(null)}
                  aria-label={t.formClose}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:border-white/40 hover:text-white"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="relative space-y-4 overflow-y-auto p-7 pt-6">
                {active.bio.map((para, p) => (
                  <p
                    key={p}
                    className="font-inter text-sm leading-relaxed text-white/75"
                  >
                    {para}
                  </p>
                ))}
                {hasLinkedin(active.linkedin) && (
                  <a
                    href={active.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 pt-1 font-inter text-xs tracking-[0.2em] text-white/70 transition hover:text-(--gold-light)"
                  >
                    <Image
                      src="/images/linkedin.png"
                      alt=""
                      width={18}
                      height={18}
                      draggable={false}
                    />
                    {t.teamLinkedin}
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
