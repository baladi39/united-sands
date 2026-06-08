"use client";

import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/lib/i18n/language-context";
import { useCircleWaypoint } from "./gradient-circle-context";

/**
 * Part 6 — "Sectoral Evolution Through Technology".
 *
 * Scroll-driven parallax: the six sector "windows" start scattered + tilted and,
 * as the user scrolls, rise faster than the centre title, straighten, and gather
 * into a centred 3×2 grid (spec ref: requirements doc Part 6; mechanics adapted
 * from `src/components/demo/sectors.tsx`). The title parallaxes slower and fades
 * out as the grid takes focus. This is also where the gradient circle resumes its
 * journey (Part 5 registered none) — a large centred glow behind the grid.
 *
 * Conventions: transforms (x/y/rotate/scale) scrub reliably via useTransform, but
 * opacity is driven imperatively (the Lenis + sticky caveat — see hero.tsx). On
 * small screens and under reduced-motion the parallax is replaced by a plain grid.
 */

// Scattered start positions (vw / vh offsets from centre, with a slight tilt).
const START_POSITIONS = [
  { x: "-38vw", y: "-28vh", r: -8 },
  { x: "32vw", y: "-34vh", r: 6 },
  { x: "-34vw", y: "12vh", r: 4 },
  { x: "36vw", y: "8vh", r: -5 },
  { x: "-18vw", y: "-8vh", r: 3 },
  { x: "22vw", y: "26vh", r: -3 },
];

// Gathered end positions — a centred 3 columns × 2 rows grid. Rows sit ±16vh
// from centre so the ~4:3 cards clear each other (and the fading title) with a gap.
const END_POSITIONS = [
  { x: "-23vw", y: "-16vh", r: 0 },
  { x: "0vw", y: "-16vh", r: 0 },
  { x: "23vw", y: "-16vh", r: 0 },
  { x: "-23vw", y: "16vh", r: 0 },
  { x: "0vw", y: "16vh", r: 0 },
  { x: "23vw", y: "16vh", r: 0 },
];

const CARD_CLASS =
  "flex aspect-[4/3] flex-col justify-between rounded-xl border border-white/15 bg-[#16102a]/80 p-5 backdrop-blur-md";

function CardContent({ index, name }: { index: number; name: string }) {
  return (
    <>
      <span className="font-oswald text-[10px] tracking-[0.3em] text-[var(--gold-light)]/50">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <p className="font-oswald text-sm uppercase leading-snug tracking-[0.15em] text-white/90">
          {name}
        </p>
        <div className="mt-3 h-px w-8 bg-gradient-to-r from-[var(--gold)] to-transparent" />
      </div>
    </>
  );
}

function SectorCard({
  index,
  name,
  progress,
}: {
  index: number;
  name: string;
  progress: MotionValue<number>;
}) {
  const start = START_POSITIONS[index];
  const end = END_POSITIONS[index];
  const x = useTransform(progress, [0, 0.6], [start.x, end.x]);
  const y = useTransform(progress, [0, 0.6], [start.y, end.y]);
  const rotate = useTransform(progress, [0, 0.6], [start.r, end.r]);
  const scale = useTransform(progress, [0, 0.3, 0.6], [0.85, 1, 1]);

  return (
    <motion.div
      className={`absolute left-1/2 top-1/2 w-[28vw] max-w-[280px] -translate-x-1/2 -translate-y-1/2 md:w-[22vw] ${CARD_CLASS}`}
      style={{ x, y, rotate, scale }}
    >
      <CardContent index={index} name={name} />
    </motion.div>
  );
}

function Heading({
  title,
  intro,
  innerRef,
}: {
  title: string;
  intro: string;
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  const [lead, brand] = title.split("\n");
  return (
    <div ref={innerRef}>
      <p className="mb-4 font-oswald text-xs tracking-[0.4em] text-[var(--gold-light)]/70">
        / 06
      </p>
      <h2 className="font-oswald text-4xl font-light leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
        {lead}
        <br />
        <span
          style={{
            background: "linear-gradient(90deg, #f2d680 0%, #8556c3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {brand}
        </span>
      </h2>
      <p className="mx-auto mt-6 max-w-md font-roboto text-sm leading-relaxed text-white/60">
        {intro}
      </p>
    </div>
  );
}

export default function Sectors() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -48]);

  // Opacity scrubbing via MotionValue is unreliable under Lenis + sticky, so the
  // title fade is driven imperatively from the scroll progress (see hero.tsx).
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (titleRef.current)
      titleRef.current.style.opacity = String(1 - Math.max(0, (v - 0.55) / 0.45));
  });

  // Resume the gradient circle after the Part 5 gap — a large centred glow that
  // sits behind the gathering grid (cards are translucent, so it reads through).
  useCircleWaypoint(ref, { x: 0, y: 0, scale: 1.6, opacity: 0.45 });

  const staticGrid = (
    <div className="mx-auto max-w-5xl">
      <div className="text-center">
        <Heading title={t.sectorsTitle} intro={t.sectorsIntro} />
      </div>
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {t.sectors.map((s, i) => (
          <div key={s.name} className={`mx-auto w-full max-w-[280px] ${CARD_CLASS}`}>
            <CardContent index={i} name={s.name} />
          </div>
        ))}
      </div>
    </div>
  );

  // Reduced motion: a plain grid, no parallax / sticky / scroll math.
  if (reduce) {
    return (
      <section ref={ref} className="relative z-10 px-6 py-32 md:py-48">
        {staticGrid}
      </section>
    );
  }

  return (
    <section ref={ref} className="relative z-10">
      {/* Mobile / small screens — static grid (the parallax is desktop-first). */}
      <div className="px-6 py-32 md:hidden">{staticGrid}</div>

      {/* md+ — scroll-driven scatter → gather parallax. */}
      <div className="hidden h-[240vh] md:block">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          {/* Centre title (slower parallax layer, behind the cards). */}
          <motion.div
            className="absolute inset-0 z-0 flex items-center justify-center px-6 text-center"
            style={{ y: titleY, opacity: 1 }}
          >
            <Heading
              title={t.sectorsTitle}
              intro={t.sectorsIntro}
              innerRef={titleRef}
            />
          </motion.div>

          {/* Sector windows (gather to the front). */}
          <div className="absolute inset-0 z-10">
            {t.sectors.map((s, i) => (
              <SectorCard
                key={s.name}
                index={i}
                name={s.name}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
