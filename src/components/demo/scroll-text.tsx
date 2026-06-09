"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollText() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["20%", "-60%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-40%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-40 md:py-56"
    >
      <motion.div style={{ x }} className="whitespace-nowrap">
        <span
          className="font-inter text-[14vw] font-light leading-none tracking-tight"
          style={{
            background:
              "linear-gradient(90deg, #ffffff 0%, #f2d680 40%, #9b59b6 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          SHAPING THE FUTURE · ENGINEERING TOMORROW ·
        </span>
      </motion.div>
      <motion.div style={{ x: x2 }} className="mt-6 whitespace-nowrap">
        <span
          className="font-inter text-[10vw] font-light leading-none tracking-tight text-white/15"
          style={{ WebkitTextStroke: "1px rgba(212, 168, 83, 0.3)" }}
        >
          SMART CITIES · DIGITAL TWINS · GEOSPATIAL INTELLIGENCE ·
        </span>
      </motion.div>
    </section>
  );
}
