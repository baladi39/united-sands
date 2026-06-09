"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useRef, useState } from "react";
import { useLang } from "@/lib/i18n/language-context";
import { useRequestProject } from "@/lib/request-project-context";
import { useCircleWaypoint } from "./gradient-circle-context";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Lightweight stroke glyph per service (0 Digital Twin · 1 Smart City · 2 GIS). */
function ServiceIcon({ index }: { index: number }) {
  if (index === 0)
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
        <path
          d="M12 2l9 5v10l-9 5-9-5V7z M12 12l9-5 M12 12v10 M12 12L3 7"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (index === 1)
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
        <path
          d="M3 21h18 M5 21V8l5-3v16 M14 21V11l5-2v12"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

/**
 * Part 7 — "Integrated Digital Services".
 *
 * Three services shown as click-to-expand cards (accordion, one open at a time),
 * with a "Request Project" button below. Simple + extensible per the spec: add a
 * service by adding to `t.services`. Reuses the Part 4 interaction idioms and
 * opens the existing global Request Project modal. Keeps the gradient circle alive
 * with a waypoint that continues from Part 6.
 */
export default function Services() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { openForm } = useRequestProject();
  const baseId = useId();
  const [open, setOpen] = useState(0);

  // Continue the circle from Part 6's centred glow — recede slightly behind the cards.
  useCircleWaypoint(ref, { x: 0, y: 6, scale: 1.4, opacity: 0.4 });

  const [lead, brand] = t.servicesTitle.split("\n");

  return (
    <section
      id="services"
      ref={ref}
      className="relative z-10 overflow-hidden px-6 py-32 md:py-48"
    >
      {/* Businessman backdrop (PSB Group_20 services panel) under a dim overlay */}
      <Image
        src="/assets/services.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right"
      />
      <div className="absolute inset-0 bg-[#0d0a1a]/80" />
      <div className="absolute inset-0 bg-linear-to-r from-[#0d0a1a] via-[#0d0a1a]/75 to-[#0d0a1a]/45" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-5 font-inter text-xs uppercase tracking-[0.35em] text-(--gold-light)/80">
            [ {t.servicesEyebrow} ]
          </p>
          <h2 className="font-inter text-4xl font-light leading-[1.02] tracking-tight text-white md:text-6xl">
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
          <p className="mt-6 font-inter text-sm leading-relaxed text-white/70 md:text-base">
            {t.servicesIntro}
          </p>
        </div>

        {/* Service cards — accordion (one open at a time) */}
        <div className="mt-16 grid gap-5 md:grid-cols-3 md:items-start">
          {t.services.map((s, i) => {
            const isOpen = open === i;
            const btnId = `${baseId}-btn-${i}`;
            const panelId = `${baseId}-panel-${i}`;
            return (
              <div
                key={s.name}
                className="relative rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-sm transition-colors hover:border-white/20"
              >
                <button
                  type="button"
                  id={btnId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-4 rounded-lg text-start after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--gold)"
                >
                  <span className="text-(--gold-light)">
                    <ServiceIcon index={i} />
                  </span>
                  <span className="flex-1 font-inter text-base uppercase leading-snug tracking-[0.12em] text-white/90">
                    {s.name}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className={`h-4 w-4 shrink-0 text-white/50 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        reduce ? { duration: 0 } : { duration: 0.4, ease: EASE }
                      }
                      className="overflow-hidden"
                    >
                      <p className="pt-4 font-inter text-sm leading-relaxed text-white/65">
                        {s.description}
                      </p>
                      <div className="mt-4 h-px w-10 bg-linear-to-r from-(--gold) to-transparent" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Request Project — opens the global modal. Part 8 will later target this
            button to morph it into a circle on scroll. */}
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={openForm}
            data-request-project
            className="rounded-full border border-(--gold)/40 bg-(--gold)/10 px-8 py-3 font-inter text-xs uppercase tracking-[0.25em] text-(--gold-light) transition hover:bg-(--gold)/20"
          >
            {t.navRequest}
          </button>
        </div>
      </div>
    </section>
  );
}
