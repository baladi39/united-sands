"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n/language-context";

/**
 * Part 5 — "Serving You Across Every Step" (Value Chain banner).
 *
 * A full-bleed cinematic banner: one purple data-highway cityscape (PSB homepage
 * frame `04_4` / `chain` artboard) under a dim overlay, with centred eyebrow,
 * heading, a one-line body and a "Walk With Us" pill that links to the inner
 * Value Chain page. Deliberately STATIC — the spec says NO ANIMATION here, so
 * there's no Framer Motion and (intentionally) no gradient-circle waypoint: the
 * circle eases out after Part 4 and Part 6 will pick its journey back up.
 */
export default function ValueChain() {
  const { t } = useLang();

  return (
    <section className="relative z-10 flex min-h-[80vh] items-center justify-center overflow-hidden">
      {/* Cityscape backdrop */}
      <Image
        src="/assets/value-chain.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dim color overlay — keeps the photo sleek and the text legible */}
      <div className="absolute inset-0 bg-[#0d0a1a]/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a1a]/70 via-[#0d0a1a]/35 to-[#0d0a1a]/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(133,86,195,0.18),transparent_65%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center md:py-32">
        <p className="mb-6 font-inter text-xs uppercase tracking-[0.35em] text-[var(--gold-light)]/80">
          [ {t.serveEyebrow} ]
        </p>
        <h2 className="whitespace-pre-line font-inter text-4xl font-light uppercase leading-[0.98] tracking-tight text-white md:text-6xl lg:text-7xl">
          {t.serveTitle}
        </h2>
        <p className="mt-6 max-w-md font-inter text-sm leading-relaxed text-white/70 md:text-base">
          {t.serveBody}
        </p>
        <Link
          href="/value-chain"
          className="group mt-10 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/5 px-8 py-3 font-inter text-xs uppercase tracking-[0.25em] text-white/85 backdrop-blur transition hover:border-[var(--gold)]/60 hover:bg-[var(--gold)]/10 hover:text-white"
        >
          {t.serveCta}
          <span className="transition-transform group-hover:translate-x-1 rtl:-scale-x-100">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
