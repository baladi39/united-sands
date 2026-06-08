"use client";

import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Splash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"counting" | "reveal" | "exit">("counting");
  const [visible, setVisible] = useState(true);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => String(Math.floor(latest)).padStart(3, "0"));
  const barWidth = useTransform(count, (v) => `${v}%`);

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 2.6,
      ease: [0.25, 1, 0.5, 1],
      onComplete: () => {
        setPhase("reveal");
        setTimeout(() => setPhase("exit"), 900);
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 1700);
      },
    });
    return controls.stop;
  }, [count, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d0a1a] overflow-hidden"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Flare glow */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: "60vmin",
              height: "60vmin",
              background:
                "radial-gradient(circle, rgba(212,168,83,0.55) 0%, rgba(155,89,182,0.25) 40%, transparent 70%)",
              filter: "blur(40px)",
            }}
            animate={{
              scale: phase === "reveal" ? [1, 1.8, 1.4] : [0.8, 1.1, 0.8],
              opacity: phase === "reveal" ? [0.9, 1, 0.7] : [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: phase === "reveal" ? 1 : 2,
              repeat: phase === "counting" ? Infinity : 0,
              ease: "easeInOut",
            }}
          />

          {/* U mark + logo reveal */}
          <div className="relative flex flex-col items-center">
            <AnimatePresence mode="wait">
              {phase === "counting" && (
                <motion.div
                  key="u"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="font-oswald text-[22vmin] leading-none"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--gold-light) 0%, var(--gold) 50%, var(--purple-accent) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 300,
                    letterSpacing: "-0.05em",
                  }}
                >
                  U
                </motion.div>
              )}
              {(phase === "reveal" || phase === "exit") && (
                <motion.div
                  key="logo"
                  initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src="/images/logo.png"
                    alt="United Sands"
                    width={280}
                    height={340}
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Counter */}
          <motion.div
            className="mt-16 font-oswald text-3xl tracking-[0.3em] text-white/80"
            animate={{ opacity: phase === "counting" ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span>{rounded}</motion.span>
            <span className="text-white/30"> / 100</span>
          </motion.div>

          {/* Loading bar */}
          <div className="mt-6 h-px w-48 overflow-hidden bg-white/10">
            <motion.div
              className="h-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--gold), var(--purple-light))",
                width: barWidth,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
