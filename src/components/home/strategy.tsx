"use client";

import { useLang } from "@/lib/i18n/language-context";

/**
 * Part 12 — "Now Meet the Strategy".
 *
 * A deliberately STATIC editorial section (spec: no animation): the founding-
 * team / strategy statement on the leading side, a single feature image on the
 * trailing side. Like Part 5 it registers NO gradient-circle waypoint, so the
 * circle eases out after Part 11 and the Part 13 finale picks it back up.
 *
 * The "Meet the rest of the team" CTA smooth-scrolls up to the Part 11 team
 * carousel (`#team`) via the global Lenis instance, falling back to native
 * scrollIntoView. Photos are placeholders — swap for the client's own when
 * delivered.
 */
export default function Strategy() {
  const { t } = useLang();

  const goToTeam = () => {
    const lenis = (
      window as unknown as {
        lenis?: { scrollTo: (target: string, opts?: { offset?: number }) => void };
      }
    ).lenis;
    if (lenis) lenis.scrollTo("#team", { offset: -20 });
    else
      document
        .getElementById("team")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [titleLead, titleBrand] = t.strategyTitle.split("\n");

  return (
    <section className="relative z-10 px-6 py-32 md:py-48">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Statement */}
          <div>
            <p className="mb-4 font-oswald text-xs tracking-[0.4em] text-[var(--gold-light)]/70">
              / 12
            </p>
            <p className="mb-5 font-oswald text-xs uppercase tracking-[0.3em] text-[var(--gold-light)]/80">
              [ {t.strategyEyebrow} ]
            </p>
            <h2 className="font-oswald text-3xl font-light leading-[1.05] tracking-tight text-white md:text-5xl">
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
            <p className="mt-6 max-w-md font-roboto text-base leading-relaxed text-white/70">
              {t.strategyBody}
            </p>
            <button
              type="button"
              onClick={goToTeam}
              className="group mt-10 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/5 px-8 py-3 font-oswald text-xs uppercase tracking-[0.25em] text-white/85 backdrop-blur transition hover:border-[var(--gold)]/60 hover:bg-[var(--gold)]/10 hover:text-white"
            >
              {t.strategyCta}
              <span className="transition-transform group-hover:translate-x-1 rtl:-scale-x-100">
                →
              </span>
            </button>
          </div>

          {/* Feature image — TODO: swap for /assets/strategy.webp (founding-team
              photo, dim overlay) once the client delivers it. */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 md:aspect-auto md:h-[520px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple-accent)]/40 via-[#0d0a1a] to-[var(--gold)]/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a1a]/80 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(133,86,195,0.25),transparent_60%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
