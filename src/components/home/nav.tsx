"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Nav({
  show,
  onMenuOpen,
}: {
  show: boolean;
  onMenuOpen: () => void;
}) {
  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10"
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
          className="hidden rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-5 py-2 text-xs tracking-[0.2em] text-[var(--gold-light)] backdrop-blur transition hover:bg-[var(--gold)]/20 md:block font-oswald"
          type="button"
        >
          REQUEST PROJECT
        </button>
        <div className="flex items-center gap-1 text-xs tracking-[0.2em] text-white/70 font-oswald">
          <span className="text-white">EN</span>
          <span className="text-white/30">/</span>
          <span>AR</span>
        </div>
        <button
          onClick={onMenuOpen}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur transition hover:border-white/30"
          aria-label="Open menu"
          type="button"
        >
          <span className="h-px w-4 bg-white" />
          <span className="h-px w-4 bg-white" />
        </button>
      </div>
    </motion.nav>
  );
}
