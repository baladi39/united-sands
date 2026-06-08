"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  type RefObject,
} from "react";
import {
  useMotionValue,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

/**
 * Gradient circle — the "core branding element" that travels with the user
 * down the homepage (spec Part 3, reappears in Parts 9 and 13).
 *
 * Architecture: each section that wants to steer the circle registers a
 * *waypoint* — an anchor state ("when my section is centred in the viewport,
 * the circle should sit here") via {@link useCircleWaypoint}. The provider
 * sorts every registered anchor by its position in the document and
 * interpolates the circle between consecutive anchors from the global scroll
 * position. Adding a future Part is one `useCircleWaypoint(ref, {...})` call —
 * no global keyframes to re-tune when the page grows.
 *
 * Coordinates: `x` is a horizontal offset from viewport centre in `vw`,
 * `y` a vertical offset in `vh` (0,0 = dead centre). The circle element is
 * centred in a fixed full-viewport wrapper, so these read as simple offsets.
 */

export type CircleAnchor = {
  /** Horizontal offset from viewport centre, in vw (negative = left). */
  x: number;
  /** Vertical offset from viewport centre, in vh (negative = up). */
  y: number;
  scale: number;
  opacity: number;
  /** Which point of the section aligns with the viewport centre for this anchor. */
  align?: "start" | "center" | "end";
};

type Waypoint = { getEl: () => HTMLElement | null; anchor: CircleAnchor };

type CircleContext = {
  x: MotionValue<string>;
  y: MotionValue<string>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  set: (id: string, wp: Waypoint) => void;
  remove: (id: string) => void;
};

const Ctx = createContext<CircleContext | null>(null);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const smoothstep = (t: number) => {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
};

function anchorDocY(wp: Waypoint): number | null {
  const el = wp.getEl();
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  switch (wp.anchor.align ?? "center") {
    case "start":
      return top;
    case "end":
      return top + rect.height;
    default:
      return top + rect.height / 2;
  }
}

export function GradientCircleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  const x = useMotionValue("0vw");
  const y = useMotionValue("0vh");
  const scale = useMotionValue(0.8);
  const opacity = useMotionValue(0);

  const waypoints = useRef(new Map<string, Waypoint>());
  const { scrollY } = useScroll();

  const recompute = useCallback(() => {
    if (reduce) {
      // Static branding presence — no scroll-driven travel.
      x.set("18vw");
      y.set("0vh");
      scale.set(1);
      opacity.set(0.4);
      return;
    }

    const stops = Array.from(waypoints.current.values())
      .map((wp) => ({ wp, docY: anchorDocY(wp) }))
      .filter((s): s is { wp: Waypoint; docY: number } => s.docY !== null)
      .sort((a, b) => a.docY - b.docY);

    if (stops.length === 0) {
      opacity.set(0);
      return;
    }

    const innerH = window.innerHeight;
    const vpCenter = window.scrollY + innerH / 2;
    const first = stops[0];
    const last = stops[stops.length - 1];

    const apply = (a: CircleAnchor, o: number, s: number) => {
      x.set(`${a.x}vw`);
      y.set(`${a.y}vh`);
      scale.set(s);
      opacity.set(o);
    };

    if (vpCenter <= first.docY) {
      // Approaching the first anchor: grow + fade in over the viewport above it.
      const t = smoothstep((vpCenter - (first.docY - innerH)) / innerH);
      apply(
        first.wp.anchor,
        first.wp.anchor.opacity * t,
        lerp(first.wp.anchor.scale * 0.7, first.wp.anchor.scale, t)
      );
    } else if (vpCenter >= last.docY) {
      // Past the last anchor: ease back out over the viewport below it.
      const t = smoothstep((last.docY + innerH - vpCenter) / innerH);
      apply(
        last.wp.anchor,
        last.wp.anchor.opacity * t,
        lerp(last.wp.anchor.scale * 0.7, last.wp.anchor.scale, t)
      );
    } else {
      // Travelling between two anchors.
      let i = 0;
      for (let k = 0; k < stops.length - 1; k++) {
        if (vpCenter >= stops[k].docY && vpCenter <= stops[k + 1].docY) {
          i = k;
          break;
        }
      }
      const a = stops[i];
      const b = stops[i + 1];
      const t = smoothstep((vpCenter - a.docY) / (b.docY - a.docY || 1));
      x.set(`${lerp(a.wp.anchor.x, b.wp.anchor.x, t)}vw`);
      y.set(`${lerp(a.wp.anchor.y, b.wp.anchor.y, t)}vh`);
      scale.set(lerp(a.wp.anchor.scale, b.wp.anchor.scale, t));
      opacity.set(lerp(a.wp.anchor.opacity, b.wp.anchor.opacity, t));
    }
  }, [reduce, x, y, scale, opacity]);

  const set = useCallback(
    (id: string, wp: Waypoint) => {
      waypoints.current.set(id, wp);
      recompute();
    },
    [recompute]
  );
  const remove = useCallback(
    (id: string) => {
      waypoints.current.delete(id);
      recompute();
    },
    [recompute]
  );

  useMotionValueEvent(scrollY, "change", () => recompute());

  useEffect(() => {
    recompute();
    const onResize = () => recompute();
    window.addEventListener("resize", onResize);
    // Recompute after first paint / late layout shifts (fonts, images).
    const raf = requestAnimationFrame(recompute);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [recompute]);

  const value = useMemo<CircleContext>(
    () => ({ x, y, scale, opacity, set, remove }),
    [x, y, scale, opacity, set, remove]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Read the shared circle MotionValues (used by the GradientCircle visual). */
export function useGradientCircle() {
  return useContext(Ctx);
}

/**
 * Register this section as a waypoint on the gradient circle's path.
 * Pass the section's ref and the anchor state the circle should reach when the
 * section is centred in the viewport. Safe to call even if no provider is
 * mounted (no-op).
 */
export function useCircleWaypoint<T extends HTMLElement>(
  ref: RefObject<T | null>,
  anchor: CircleAnchor
) {
  const ctx = useContext(Ctx);
  const id = useId();
  const { x, y, scale, opacity, align } = anchor;

  useLayoutEffect(() => {
    if (!ctx) return;
    ctx.set(id, {
      getEl: () => ref.current,
      anchor: { x, y, scale, opacity, align },
    });
    return () => ctx.remove(id);
  }, [ctx, id, ref, x, y, scale, opacity, align]);
}
