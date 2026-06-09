"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const SECTORS = [
  { name: "Smart Cities", icon: "◆" },
  { name: "Environment / ESG", icon: "◎" },
  { name: "Industrial Manufacturing", icon: "▣" },
  { name: "Utilities & Energy", icon: "⬢" },
  { name: "Transport & Mobility", icon: "⬡" },
  { name: "Satellite Imagery", icon: "◈" },
];

// Scattered starting positions (vw / vh offsets from center)
const START_POSITIONS = [
  { x: "-38vw", y: "-28vh", r: -8 },
  { x: "32vw", y: "-34vh", r: 6 },
  { x: "-34vw", y: "12vh", r: 4 },
  { x: "36vw", y: "8vh", r: -5 },
  { x: "-18vw", y: "-8vh", r: 3 },
  { x: "22vw", y: "26vh", r: -3 },
];

// Final aligned positions (3 cols x 2 rows, centered)
const END_POSITIONS = [
  { x: "-22vw", y: "-8vh", r: 0 },
  { x: "0vw", y: "-8vh", r: 0 },
  { x: "22vw", y: "-8vh", r: 0 },
  { x: "-22vw", y: "8vh", r: 0 },
  { x: "0vw", y: "8vh", r: 0 },
  { x: "22vw", y: "8vh", r: 0 },
];

function SectorCard({
  sector,
  index,
  progress,
}: {
  sector: (typeof SECTORS)[number];
  index: number;
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
      className="absolute left-1/2 top-1/2 flex aspect-[4/3] w-[28vw] max-w-[280px] -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-xl border border-white/15 bg-[#16102a]/80 p-5 backdrop-blur-md md:w-[22vw]"
      style={{ x, y, rotate, scale }}
    >
      <div className="flex items-start justify-between">
        <span className="text-2xl text-[var(--gold-light)]">{sector.icon}</span>
        <span className="font-inter text-[10px] tracking-[0.3em] text-white/40">
          0{index + 1}
        </span>
      </div>
      <div>
        <p className="font-inter text-sm tracking-[0.15em] text-white/90">
          {sector.name}
        </p>
        <div className="mt-3 h-px w-8 bg-gradient-to-r from-[var(--gold)] to-transparent" />
      </div>
    </motion.div>
  );
}

export default function Sectors() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.7, 1], [0, 1, 1, 0.3]);

  return (
    <section ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Middle text (slower parallax) */}
        <motion.div
          className="absolute inset-0 z-0 flex items-center justify-center px-6 text-center"
          style={{ y: textY, opacity: textOpacity }}
        >
          <div>
            <p className="mb-4 text-xs tracking-[0.35em] text-[var(--gold-light)]/70 font-inter">
              / 06
            </p>
            <h2 className="font-inter text-4xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              Sectoral Evolution
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #f2d680, #9b59b6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Through Technology
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm text-white/60">
              Six core sectors where we translate vision into operational intelligence.
            </p>
          </div>
        </motion.div>

        {/* Sector cards */}
        <div className="absolute inset-0 z-10">
          {SECTORS.map((sector, i) => (
            <SectorCard
              key={sector.name}
              sector={sector}
              index={i}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
