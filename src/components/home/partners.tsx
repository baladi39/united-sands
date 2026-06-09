"use client";

import { useRef } from "react";
import { useLang } from "@/lib/i18n/language-context";
import { useCircleWaypoint } from "./gradient-circle-context";

/** Placeholder partner slots until the client delivers real logos. */
const PARTNER_SLOTS = 6;

/**
 * Part 13a — "Strategic Alliances & Global Technology Partners".
 *
 * The partner logo strip that opens the finale. Largely static; it registers an
 * intermediate gradient-circle waypoint so the travelling circle keeps growing
 * through here into the Part 13b contact finale (where it becomes the massive
 * backdrop). Logos are placeholders — swap for client artwork when delivered.
 */
export default function Partners() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);

  // Keep the circle present and growing through the finale run-in.
  useCircleWaypoint(ref, { x: 0, y: 0, scale: 2.4, opacity: 0.4 });

  const [titleLead, titleBrand] = t.partnersTitle.split("\n");

  return (
    <section ref={ref} className="relative z-10 px-6 py-32 md:py-48">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-5 font-oswald text-xs uppercase tracking-[0.3em] text-[var(--gold-light)]/80">
          [ {t.partnersEyebrow} ]
        </p>
        <h2 className="mx-auto max-w-3xl font-oswald text-3xl font-light leading-[1.05] tracking-tight text-white md:text-5xl">
          {titleLead}
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #f2d680 0%, #8556c3 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {titleBrand}
          </span>
        </h2>

        {/* TODO: swap these placeholder tiles for client partner logos
            (/assets/partners/*) once delivered. */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
          {Array.from({ length: PARTNER_SLOTS }).map((_, i) => (
            <div
              key={i}
              role="img"
              aria-label="Partner logo (placeholder)"
              className="flex h-24 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm md:h-28"
            >
              <span
                aria-hidden="true"
                className="font-oswald text-sm tracking-[0.3em] text-white/25"
              >
                LOGO
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
