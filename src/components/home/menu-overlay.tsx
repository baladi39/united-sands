"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useLang } from "@/lib/i18n/language-context";
import { useRequestProject } from "@/lib/request-project-context";
import LanguageToggle from "@/components/language-toggle";

// Social set matches the website.psb design: X, LinkedIn, Meta, Instagram.
const SOCIALS = [
  { label: "X", src: "/images/twitter.png", href: "#" },
  { label: "LinkedIn", src: "/images/linkedin.png", href: "#" },
  { label: "Meta", src: "/images/facebook.png", href: "#" },
  { label: "Instagram", src: "/images/instagram.png", href: "#" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLang();
  const { openForm } = useRequestProject();

  // Lock smooth scroll while the menu is open + close on Escape.
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (open) {
      lenis?.stop();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        lenis?.start();
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#0b0817]/95 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(133,86,195,0.25),transparent_55%)]" />

          {/* 3D fluid blob on the right */}
          <motion.div
            className="pointer-events-none absolute right-[-6%] top-1/2 hidden h-[70vmin] w-[70vmin] -translate-y-1/2 md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative h-full w-full"
              animate={{ y: [0, -18, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/assets/menu-blob.webp"
                alt=""
                fill
                className="object-contain drop-shadow-[0_0_80px_rgba(133,86,195,0.45)]"
              />
            </motion.div>
          </motion.div>

          {/* Top bar */}
          <div className="relative flex items-center justify-between px-6 py-5 md:px-10">
            <div className="relative h-11 w-10">
              <Image
                src="/assets/logo-lockup.svg"
                alt="United Sands"
                fill
                className="object-contain object-left opacity-90"
              />
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:border-white/40 hover:text-white"
              aria-label={t.closeMenu}
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="relative flex h-[calc(100vh-80px)] flex-col justify-between px-6 pb-10 md:px-10">
            <motion.nav
              className="mt-[8vh] flex flex-col gap-1"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {t.menuLinks.map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  onClick={onClose}
                  variants={item}
                  className="font-oswald text-4xl font-light tracking-tight text-white/85 transition-colors hover:text-[var(--gold-light)] md:text-6xl"
                >
                  {link}
                </motion.a>
              ))}
            </motion.nav>

            {/* Footer row */}
            <motion.div
              className="flex flex-col gap-6 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="flex items-center gap-5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="opacity-70 transition-opacity hover:opacity-100"
                  >
                    <Image src={s.src} alt={s.label} width={22} height={22} />
                  </a>
                ))}
                <a
                  href="mailto:info@unitedsands.co"
                  className="font-roboto text-sm text-white/70 transition-colors hover:text-white"
                >
                  info@unitedsands.co
                </a>
              </div>

              <div className="flex items-center gap-5">
                <LanguageToggle />
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openForm();
                  }}
                  className="rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-6 py-2.5 text-xs tracking-[0.2em] text-[var(--gold-light)] transition hover:bg-[var(--gold)]/20 font-oswald"
                >
                  {t.navRequest}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
