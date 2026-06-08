"use client";

import { motion } from "framer-motion";
import { useGradientCircle } from "./gradient-circle-context";

/**
 * The gradient circle visual. Position / scale / opacity are driven by the
 * shared MotionValues from {@link GradientCircleProvider}; sections steer it by
 * registering waypoints. It starts invisible (opacity 0) so it stays out of the
 * way during the immersive hero, then fades in as the first waypoint approaches.
 *
 * `fixed` + `pointer-events-none` + `z-[5]` keeps it pinned behind foreground
 * content (hero/section text sit at z-10) and never intercepting clicks.
 */
export default function GradientCircle() {
  const circle = useGradientCircle();
  if (!circle) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] flex items-center justify-center overflow-hidden">
      <motion.div
        className="h-[55vmin] w-[55vmin] rounded-full"
        style={{
          x: circle.x,
          y: circle.y,
          scale: circle.scale,
          opacity: circle.opacity,
          background:
            "radial-gradient(circle, rgba(212,168,83,0.55) 0%, rgba(133,86,195,0.40) 45%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
    </div>
  );
}
