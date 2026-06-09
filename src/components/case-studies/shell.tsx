"use client";

import Link from "next/link";
import Image from "next/image";
import LanguageToggle from "@/components/language-toggle";
import { useLang } from "@/lib/i18n/language-context";
import { useRequestProject } from "@/lib/request-project-context";

/**
 * Shared chrome for the Portfolio / Case Studies inner pages (grid + detail).
 * These routes live outside the homepage's Lenis experience, so this provides
 * the lightweight header, ambient brand glow, and footer the inner pages share.
 * `useLang` / `useRequestProject` are global (root `Providers`), so the language
 * toggle and "Request Project" modal work here just like on the homepage.
 */
export default function CaseStudiesShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useLang();
  const { openForm } = useRequestProject();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-white">
      {/* Ambient brand glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(133,86,195,0.18),transparent_60%)]" />

      {/* Top bar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="relative h-11 w-10 shrink-0"
          aria-label="United Sands — home"
        >
          <Image
            src="/assets/logo-lockup.svg"
            alt="United Sands"
            fill
            className="object-contain object-left opacity-90"
          />
        </Link>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <button
            type="button"
            onClick={openForm}
            className="rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-5 py-2 font-inter text-[11px] tracking-[0.2em] text-[var(--gold-light)] transition hover:bg-[var(--gold)]/20"
          >
            {t.navRequest}
          </button>
        </div>
      </header>

      <div className="relative z-10">{children}</div>

      {/* Footer */}
      <footer className="relative z-10 mt-24 border-t border-white/10 px-6 py-10 md:px-10">
        <p className="font-inter text-xs text-white/40">
          © United Sands. {t.contactRights}
        </p>
      </footer>
    </main>
  );
}
