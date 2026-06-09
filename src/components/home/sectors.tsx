"use client";

import {
  MotionValue,
  motion,
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
 * as the user scrolls, rise toward a centred-but-offset staggered grid (the middle
 * column sits lower, matching the spec's editorial zig-zag). The title is a pinned
 * header at the TOP of the sticky stage, so the cards gather *below* it rather than
 * over it. (spec ref: requirements doc Part 6; mechanics adapted from
 * `src/components/demo/sectors.tsx`.) This is also where the gradient circle resumes
 * its journey (Part 5 registered none) — a large centred glow behind the grid.
 *
 * Conventions: transforms (x/y/rotate/scale) scrub reliably via useTransform (the
 * Lenis + sticky caveat — see hero.tsx). On small screens and under reduced-motion
 * the parallax is replaced by a plain grid.
 */

// Scattered start positions (vw / vh offsets from centre, with a slight tilt).
// Biased toward the lower card region so they emerge from below the header.
const START_POSITIONS = [
  { x: "-38vw", y: "-12vh", r: -8 },
  { x: "32vw", y: "-18vh", r: 6 },
  { x: "-34vw", y: "22vh", r: 4 },
  { x: "36vw", y: "16vh", r: -5 },
  { x: "-16vw", y: "6vh", r: 3 },
  { x: "20vw", y: "34vh", r: -3 },
];

// Gathered end positions — a staggered 3-column grid in the lower portion of the
// stage (below the static header). The middle column (1, 4) is offset downward so
// the layout reads as the spec's zig-zag rather than a flat 3×2 grid. y offsets are
// measured from viewport centre; columns are spaced ±28vw to clear the wider cards,
// and the rows are tuned so the two ~210px-tall cards clear the header and each
// other even on short (~760px) laptop viewports.
const END_POSITIONS = [
  { x: "-28vw", y: "-4vh", r: 0 }, // left · top
  { x: "0vw", y: "2vh", r: 0 }, //    middle · top (offset down)
  { x: "28vw", y: "-4vh", r: 0 }, //  right · top
  { x: "-28vw", y: "26vh", r: 0 }, // left · bottom
  { x: "0vw", y: "32vh", r: 0 }, //   middle · bottom (offset down)
  { x: "28vw", y: "26vh", r: 0 }, //  right · bottom
];

const CARD_CLASS =
  "flex flex-col rounded-xl border border-white/15 bg-[#16102a]/80 p-6 backdrop-blur-md";

function CardContent({
  index,
  name,
  description,
}: {
  index: number;
  name: string;
  description: string;
}) {
  return (
    <>
      <span className="font-inter text-xs tracking-[0.35em] text-[var(--gold-light)]/60">
        {String(index + 1).padStart(2, "0")}
      </span>
      {/* Centre the title block in the remaining height so the card reads as full
          rather than top number / bottom text with an empty band between. */}
      <div className="flex flex-1 flex-col justify-center">
        <p className="font-inter text-base uppercase leading-snug tracking-[0.14em] text-white md:text-lg">
          {name}
        </p>
        <div className="mt-4 h-px w-10 bg-gradient-to-r from-[var(--gold)] to-transparent" />
        <p className="mt-4 font-inter text-sm leading-relaxed text-white/65">
          {description}
        </p>
      </div>
    </>
  );
}

function SectorCard({
  index,
  name,
  description,
  progress,
}: {
  index: number;
  name: string;
  description: string;
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
      className={`absolute left-1/2 top-1/2 w-[26vw] min-h-[210px] min-w-[200px] max-w-[360px] -translate-x-1/2 -translate-y-1/2 ${CARD_CLASS}`}
      style={{ x, y, rotate, scale }}
    >
      <CardContent index={index} name={name} description={description} />
    </motion.div>
  );
}

function Heading({ title, intro }: { title: string; intro: string }) {
  const [lead, brand] = title.split("\n");
  return (
    <div>
      <p className="mb-4 font-inter text-xs tracking-[0.35em] text-[var(--gold-light)]/70">
        / 06
      </p>
      <h2 className="font-inter text-4xl font-light leading-[0.95] tracking-tight text-white md:text-5xl">
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
      <p className="mx-auto mt-6 max-w-md font-inter text-sm leading-relaxed text-white/60">
        {intro}
      </p>
    </div>
  );
}

export default function Sectors() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
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
          <div
            key={s.name}
            className={`mx-auto min-h-[210px] w-full max-w-[360px] ${CARD_CLASS}`}
          >
            <CardContent index={i} name={s.name} description={s.description} />
          </div>
        ))}
      </div>
    </div>
  );

  // Reduced motion: a plain grid, no parallax / sticky / scroll math.
  if (reduce) {
    return (
      <section id="sectors" ref={ref} className="relative z-10 px-6 py-32 md:py-48">
        {staticGrid}
      </section>
    );
  }

  return (
    <section id="sectors" ref={ref} className="relative z-10">
      {/* Mobile / small screens — static grid (the parallax is desktop-first). */}
      <div className="px-6 py-32 md:hidden">{staticGrid}</div>

      {/* md+ — scroll-driven scatter → gather parallax. */}
      <div className="hidden h-[240vh] md:block">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Static header at the top — only the cards animate. z above the cards
              so any card drifting up during the scatter passes behind it. Top
              padding clears the fixed nav (~85px, frosted once scrolled) so the
              eyebrow + title aren't tucked behind it when the menu jumps straight
              to the gathered state; grows with viewport height on taller screens. */}
          <div className="absolute inset-x-0 top-0 z-20 flex justify-center px-6 pt-[max(6rem,9vh)] text-center">
            <Heading title={t.sectorsTitle} intro={t.sectorsIntro} />
          </div>

          {/* Sector windows (gather into the lower staggered grid). */}
          <div className="absolute inset-0 z-10">
            {t.sectors.map((s, i) => (
              <SectorCard
                key={s.name}
                index={i}
                name={s.name}
                description={s.description}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
