"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n/language-context";
import CaseStudiesShell from "@/components/case-studies/shell";

const GRADIENT_STAT = {
  background: "linear-gradient(180deg, #f2d680, #8556c3)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
} as const;

// Portfolio listing — "From Vision to Reality" (website.psb artboard 11).
// A filterable grid of case studies. Published studies link to their detail
// page; the remainder render as muted "coming soon" tiles until the client
// delivers the real engagements.
export default function CaseStudiesPage() {
  const { t } = useLang();
  const studies = t.caseStudies;

  const categories = useMemo(
    () => Array.from(new Set(studies.map((s) => s.sector))),
    [studies],
  );
  const companies = useMemo(
    () => Array.from(new Set(studies.map((s) => s.client))),
    [studies],
  );

  const [category, setCategory] = useState<string | null>(null);
  const [company, setCompany] = useState<string | null>(null);

  const filtered = studies.filter(
    (s) =>
      (!category || s.sector === category) && (!company || s.client === company),
  );
  const filtersActive = category !== null || company !== null;
  // Pad the grid to 8 tiles with "coming soon" placeholders when unfiltered.
  const comingSoon = filtersActive ? 0 : Math.max(0, 8 - studies.length);

  return (
    <CaseStudiesShell>
      {/* Hero band */}
      <section className="relative px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 font-inter text-xs tracking-[0.35em] text-[var(--gold-light)]/70">
              {t.caseStudiesEyebrow}
            </p>
            <h1 className="font-inter text-4xl font-light uppercase leading-[0.95] tracking-tight text-white md:text-7xl">
              {t.caseStudiesTitle}
              <br />
              <span style={GRADIENT_STAT}>{t.caseStudiesTitleAccent}</span>
            </h1>
            <p className="mt-6 max-w-md font-inter text-sm leading-relaxed text-white/65">
              {t.caseStudiesIntro}
            </p>
          </div>
          <div className="relative hidden md:block">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(133,86,195,0.28),transparent_65%)]" />
              <Image
                src="/assets/portfolio-city.webp"
                alt=""
                fill
                sizes="28rem"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Subtitle + filter bar */}
      <section className="relative border-y border-white/10 bg-white/[0.02] px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="font-inter text-sm font-light tracking-[0.25em] text-white/85 uppercase">
            {t.caseStudiesSubtitle}
          </h2>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="font-inter text-[11px] tracking-[0.2em] text-white/40 uppercase">
              {t.caseStudiesFilterBy}
            </span>
            <FilterGroup
              label={t.caseStudiesFilterCategory}
              options={categories}
              value={category}
              allLabel={t.caseStudiesFilterAll}
              onChange={setCategory}
            />
            <FilterGroup
              label={t.caseStudiesFilterCompany}
              options={companies}
              value={company}
              allLabel={t.caseStudiesFilterAll}
              onChange={setCompany}
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="relative px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          {filtered.length === 0 ? (
            <p className="py-16 text-center font-inter text-sm text-white/50">
              {t.caseStudiesEmpty}
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s, i) => (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Link
                    href={`/case-studies/${s.slug}`}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent"
                  >
                    <div
                      className={`absolute inset-0 ${
                        s.accent === "gold"
                          ? "bg-[radial-gradient(circle_at_50%_45%,rgba(242,214,128,0.18),transparent_60%)]"
                          : "bg-[radial-gradient(circle_at_50%_45%,rgba(133,86,195,0.22),transparent_60%)]"
                      }`}
                    />
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
                      className="object-contain p-7 transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    <span
                      className="absolute start-5 top-4 font-inter text-3xl font-light"
                      style={GRADIENT_STAT}
                    >
                      {s.stat}
                    </span>
                    {/* Mouse-over reveal — sector + title */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#0d0a1a] via-[#0d0a1a]/30 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-[var(--gold-light)]/80">
                        {s.sector}
                      </p>
                      <h3 className="mt-1 font-inter text-lg font-light leading-tight text-white">
                        {s.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {Array.from({ length: comingSoon }).map((_, i) => (
                <div
                  key={`soon-${i}`}
                  className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.015]"
                >
                  <span className="font-inter text-[11px] uppercase tracking-[0.3em] text-white/25">
                    {t.caseStudiesComingSoon}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </CaseStudiesShell>
  );
}

function FilterGroup({
  label,
  options,
  value,
  allLabel,
  onChange,
}: {
  label: string;
  options: string[];
  value: string | null;
  allLabel: string;
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="font-inter text-[11px] tracking-[0.15em] text-white/55">
        {label}:
      </span>
      <Chip active={value === null} onClick={() => onChange(null)}>
        {allLabel}
      </Chip>
      {options.map((opt) => (
        <Chip key={opt} active={value === opt} onClick={() => onChange(opt)}>
          {opt}
        </Chip>
      ))}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 font-inter text-[11px] tracking-[0.1em] transition ${
        active
          ? "border-[var(--gold)]/60 bg-[var(--gold)]/15 text-white"
          : "border-white/15 text-white/55 hover:border-white/40 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
