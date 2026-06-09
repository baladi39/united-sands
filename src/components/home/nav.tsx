"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/lib/i18n/language-context";
import { useRequestProject } from "@/lib/request-project-context";
import LanguageToggle from "@/components/language-toggle";

export default function Nav({
  show,
  onMenuOpen,
}: {
  show: boolean;
  onMenuOpen: () => void;
}) {
  const { t } = useLang();
  const { openForm } = useRequestProject();

  // Transparent over the hero, frosted once it scrolls past. The hero (#top) is
  // 220vh with a 100vh sticky inner, so it hands off to the content below at
  // heroHeight − viewport of scroll. The hero ends in a navy crossfade, so the
  // frost fades in over flat navy and the handoff is seamless.
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const hero = document.getElementById("top");
    const threshold = hero
      ? hero.offsetHeight - window.innerHeight
      : window.innerHeight;
    setScrolled(y > threshold);
  });

  return (
    <motion.nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-6 py-5 transition-[background-color,border-color,backdrop-filter] duration-500 ease-out md:px-10 ${
        scrolled
          ? "border-white/10 bg-[var(--background)]/40 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent backdrop-blur-none backdrop-saturate-100"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: show ? 0.3 : 0 }}
    >
      <a href="#top" className="relative h-11 w-10 shrink-0" aria-label="United Sands — home">
        <Image
          src="/assets/logo-lockup.svg"
          alt="United Sands"
          fill
          className="object-contain object-left opacity-90"
        />
      </a>

      <div className="flex items-center gap-3 md:gap-5">
        <button
          onClick={openForm}
          className="hidden rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-5 py-2 text-xs tracking-[0.2em] text-[var(--gold-light)] backdrop-blur transition hover:bg-[var(--gold)]/20 md:block font-inter"
          type="button"
        >
          {t.navRequest}
        </button>
        <LanguageToggle />
        <button
          onClick={onMenuOpen}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur transition hover:border-white/30"
          aria-label={t.openMenu}
          type="button"
        >
          <span className="h-px w-4 bg-white" />
          <span className="h-px w-4 bg-white" />
        </button>
      </div>
    </motion.nav>
  );
}
