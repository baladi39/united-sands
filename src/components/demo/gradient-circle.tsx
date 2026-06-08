"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function GradientCircle() {
  const { scrollYProgress } = useScroll();

  // Circle travels a path across viewport as user scrolls sections 3-7
  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
    ["120%", "80%", "20%", "60%", "15%", "50%", "50%"]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
    ["-20%", "30%", "60%", "40%", "55%", "30%", "50%"]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.85, 1],
    [0, 1, 1.2, 1.5, 3]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.85, 1],
    [0, 0.7, 0.6, 1]
  );

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        x,
        y,
        scale,
        opacity,
        background:
          "radial-gradient(circle, rgba(212,168,83,0.55) 0%, rgba(155,89,182,0.35) 45%, transparent 70%)",
        filter: "blur(60px)",
      }}
    />
  );
}
