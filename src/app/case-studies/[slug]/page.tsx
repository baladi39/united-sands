"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n/language-context";
import { useRequestProject } from "@/lib/request-project-context";
import CaseStudiesShell from "@/components/case-studies/shell";

const GRADIENT_TEXT = {
  background: "linear-gradient(180deg, #ffffff 0%, #f2d680 60%, #8556c3 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
} as const;

const GRADIENT_STAT = {
  background: "linear-gradient(180deg, #f2d680, #8556c3)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
} as const;

// Portfolio project detail — "Pipeline Inspection for ADNOC (UAE)" and friends
// (website.psb artboard 12). Looks the study up from the localized dictionary by
// slug. Data is client-side (language context), so this renders the not-found
// state inline rather than calling notFound().
export default function CaseStudyDetailPage() {
  const { t, dir } = useLang();
  const { openForm } = useRequestProject();
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const study = t.caseStudies.find((c) => c.slug === slug);

  const backArrow = dir === "rtl" ? "→" : "←";

  if (!study) {
    return (
      <CaseStudiesShell>
        <section className="px-6 py-32 text-center md:px-10">
          <p className="font-inter text-sm text-white/60">
            {t.caseStudyNotFound}
          </p>
          <Link
            href="/case-studies"
            className="mt-6 inline-block font-inter text-xs tracking-[0.3em] text-[var(--gold-light)] transition hover:text-white"
          >
            {backArrow} {t.caseStudiesBackToGrid}
          </Link>
        </section>
      </CaseStudiesShell>
    );
  }

  const meta = [study.client, study.country].filter(Boolean).join(" · ");

  return (
    <CaseStudiesShell>
      <article className="relative px-6 pt-4 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 font-inter text-xs tracking-[0.25em] text-white/55 transition hover:text-white"
          >
            {backArrow} {t.caseStudiesBackToGrid}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-stretch"
          >
            {/* Project panel */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[var(--purple-accent)]/30 via-[#1a1330]/50 to-transparent p-8 md:p-12">
              <div className="relative h-10 w-9">
                <Image
                  src="/assets/u-mark.svg"
                  alt=""
                  fill
                  className="object-contain object-left opacity-90"
                />
              </div>

              <p className="mt-7 font-inter text-[11px] uppercase tracking-[0.35em] text-[var(--gold-light)]/80">
                {study.sector}
              </p>
              <h1
                className="mt-3 font-inter text-3xl font-light uppercase leading-[1.05] tracking-tight md:text-5xl"
                style={GRADIENT_TEXT}
              >
                {study.title}
              </h1>
              {meta && (
                <p className="mt-4 font-inter text-xs tracking-[0.25em] text-white/45">
                  {meta}
                </p>
              )}

              <p className="mt-7 max-w-xl font-inter text-sm leading-relaxed text-white/70">
                {study.description}
              </p>

              {/* Headline figure */}
              <div className="mt-9 flex items-end gap-4 border-t border-white/10 pt-7">
                <span
                  className="font-inter text-6xl font-light leading-none md:text-7xl"
                  style={GRADIENT_STAT}
                >
                  {study.stat}
                </span>
                <p className="max-w-xs pb-1 font-inter text-xs leading-relaxed text-white/60">
                  {study.statLabel}
                </p>
              </div>

              {/* Services used */}
              {study.tags.length > 0 && (
                <div className="mt-9">
                  <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-white/40">
                    {t.caseStudyServicesUsed}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-inter text-[10px] uppercase tracking-[0.2em] text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Featured visual */}
            <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-[var(--gold)]/20 bg-gradient-to-br from-[var(--gold)]/10 via-transparent to-[var(--purple-accent)]/25">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(133,86,195,0.25),transparent_65%)]" />
              <Image
                src={study.image}
                alt={study.title}
                fill
                sizes="(min-width:1024px) 40vw, 90vw"
                className="object-contain p-8"
                priority
              />
            </div>
          </motion.div>

          {/* Request Project circle CTA */}
          <div className="mt-20 flex flex-col items-center">
            <button
              type="button"
              onClick={openForm}
              className="group relative flex h-44 w-44 flex-col items-center justify-center rounded-full border border-[var(--gold)]/40 bg-[radial-gradient(circle,rgba(133,86,195,0.25),rgba(13,10,26,0.6))] text-center transition hover:border-[var(--gold)]/80"
              aria-label={t.caseStudyRequestCta}
            >
              <span className="absolute inset-0 rounded-full bg-[var(--gold)]/0 transition group-hover:bg-[var(--gold)]/10" />
              <div className="relative h-9 w-8">
                <Image
                  src="/assets/u-mark.svg"
                  alt=""
                  fill
                  className="object-contain opacity-90"
                />
              </div>
              <span className="relative mt-3 max-w-[7rem] font-inter text-[11px] uppercase tracking-[0.25em] text-white/85">
                {t.caseStudyRequestCta}
              </span>
            </button>
          </div>
        </div>
      </article>
    </CaseStudiesShell>
  );
}
