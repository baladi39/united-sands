"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n/language-context";

export default function AboutPage() {
  const { t } = useLang();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Ambient brand glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(133,86,195,0.22),transparent_60%)]" />

      <Link
        href="/"
        className="absolute start-6 top-6 h-11 w-10"
        aria-label="United Sands — home"
      >
        <Image
          src="/assets/logo-lockup.svg"
          alt="United Sands"
          fill
          className="object-contain object-left opacity-90"
        />
      </Link>

      <div className="relative max-w-xl">
        <p className="mb-5 text-xs tracking-[0.35em] text-[var(--gold-light)]/80 font-inter">
          {t.aboutEyebrow}
        </p>
        <h1
          className="font-inter text-4xl font-light leading-tight md:text-6xl"
          style={{
            background:
              "linear-gradient(180deg, #ffffff 0%, #f2d680 58%, #8556c3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t.aboutTitle}
        </h1>
        <p className="mx-auto mt-7 max-w-md text-sm leading-relaxed text-white/70">
          {t.aboutBody}
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-xs tracking-[0.25em] text-white/80 backdrop-blur transition hover:border-[var(--gold)]/60 hover:bg-[var(--gold)]/10 font-inter"
        >
          {t.aboutBack}
        </Link>
      </div>
    </main>
  );
}
