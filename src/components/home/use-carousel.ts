"use client";

import { useCallback, useState } from "react";
import type { PanInfo } from "framer-motion";

/**
 * Shared next/previous carousel logic for the homepage's click + keyboard +
 * drag carousels (Part 10 "Why Being Saudi-Born Matters", Part 11 Team).
 *
 * Pure logic — it owns the wrapped index and hands back the handlers + the
 * `dragProps` to spread onto the animated slide. Each section keeps its own
 * markup. Everything that has a visual left/right (arrow keys, slide offset,
 * drag) mirrors under RTL.
 */

type Dir = "ltr" | "rtl";

/** Pointer travel (px, blended with velocity) needed to flip to the next slide. */
const SWIPE_THRESHOLD = 60;

export type CarouselApi = {
  index: number;
  prev: () => void;
  next: () => void;
  goTo: (i: number) => void;
  /** Attach to the focusable carousel wrapper for ←/→ navigation. */
  onKeyDown: (e: React.KeyboardEvent) => void;
  /** Slide enter offset in px (RTL-flipped, 0 under reduced motion). */
  dx: number;
  /** Spread onto the animated slide to enable drag/swipe-to-advance. */
  dragProps: {
    drag: "x";
    dragConstraints: { left: 0; right: 0 };
    dragElastic: number;
    onDragEnd: (e: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => void;
  };
};

export function useCarousel(
  count: number,
  { dir, reduce }: { dir: Dir; reduce: boolean | null }
): CarouselApi {
  const [index, setIndex] = useState(0);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count]
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const goTo = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count]
  );

  // Arrow keys follow VISUAL direction, so they invert under RTL.
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        (dir === "rtl" ? prev : next)();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        (dir === "rtl" ? next : prev)();
      }
    },
    [dir, prev, next]
  );

  const onDragEnd = useCallback(
    (_e: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
      const power = info.offset.x + info.velocity.x * 0.2;
      // Dragging toward the leading edge advances; flip the mapping under RTL.
      if (power < -SWIPE_THRESHOLD) (dir === "rtl" ? prev : next)();
      else if (power > SWIPE_THRESHOLD) (dir === "rtl" ? next : prev)();
    },
    [dir, prev, next]
  );

  const dx = reduce ? 0 : dir === "rtl" ? -60 : 60;

  return {
    index,
    prev,
    next,
    goTo,
    onKeyDown,
    dx,
    dragProps: {
      drag: "x",
      dragConstraints: { left: 0, right: 0 },
      dragElastic: 0.2,
      onDragEnd,
    },
  };
}
