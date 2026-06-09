"use client";

import { useRef } from "react";
import { useLang } from "@/lib/i18n/language-context";
import { useRequestProject } from "@/lib/request-project-context";
import { useCircleWaypoint } from "./gradient-circle-context";

/**
 * Part 13b — Contact (Circle-Morph Finale).
 *
 * The end of the journey: the shared gradient circle that's travelled down the
 * page expands into a massive ambient backdrop here (final waypoint, anchored to
 * the section END so it peaks at the page bottom and never eases back out),
 * focusing attention on the final CTA. The "Request Project" button opens the
 * same global modal used everywhere else; email/phone are direct links.
 */
export default function ContactFinale() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { openForm } = useRequestProject();

  // Final, massive waypoint — the circle becomes the finale backdrop.
  useCircleWaypoint(ref, {
    x: 0,
    y: 0,
    scale: 4.5,
    opacity: 0.7,
    align: "end",
  });

  const tel = `tel:${t.contactPhone.replace(/[^\d+]/g, "")}`;
  const year = new Date().getFullYear();

  return (
    <section
      ref={ref}
      className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center px-6 py-40 text-center md:py-56"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-6 font-oswald text-xs uppercase tracking-[0.4em] text-[var(--gold-light)]/80">
          [ {t.contactEyebrow} ]
        </p>
        <h2 className="font-oswald text-5xl font-light leading-[0.95] tracking-tight md:text-8xl">
          <span
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #f2d680 55%, #8556c3 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t.contactTitle}
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-lg font-roboto text-sm leading-relaxed text-white/70 md:text-base">
          {t.contactAddress}
        </p>
        <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-roboto text-sm text-white/70">
          <a
            href={`mailto:${t.email}`}
            className="transition-colors hover:text-white"
          >
            {t.email}
          </a>
          <span aria-hidden="true" className="text-white/25">
            ·
          </span>
          <a href={tel} dir="ltr" className="transition-colors hover:text-white">
            {t.contactPhone}
          </a>
        </p>

        <button
          type="button"
          onClick={openForm}
          className="mt-12 rounded-full border border-[var(--gold)]/60 bg-[var(--gold)]/15 px-10 py-4 font-oswald text-xs uppercase tracking-[0.3em] text-white backdrop-blur transition hover:bg-[var(--gold)]/25"
        >
          {t.navRequest}
        </button>
      </div>

      {/* Minimal closing line (full sitemap footer is a separate follow-up). */}
      <div className="mt-24 flex flex-col items-center gap-2 font-oswald text-[10px] uppercase tracking-[0.3em] text-white/40">
        <span>United Sands</span>
        <span dir="ltr">
          © {year} · {t.contactRights}
        </span>
      </div>
    </section>
  );
}
