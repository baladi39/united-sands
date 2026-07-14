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

// Scroll target for each menu link, index-matched to `dictionary.ts` menuLinks
// (EN + AR share this order). The order mirrors the on-page scroll order so the
// menu reads top-to-bottom like the homepage. Keep in sync if menuLinks order
// changes.
// "#…" entries smooth-scroll to a homepage section; "/…" entries navigate to a
// route. Portfolio points at the case-studies grid (its own inner page).
const MENU_TARGETS = [
  "#top", // Home
  "#sectors", // Sectors
  "#services", // Services
  "/case-studies", // Portfolio
  "#who-we-are", // Who We Are
  "#contact", // Contact
];

// Sectors scatters its cards at the section top and gathers them into the grid
// as you scroll, reaching the assembled layout at scroll progress 0.6 (see
// END_POSITIONS / useTransform ranges in sectors.tsx). Jumping to the section
// top lands on the scattered start; we instead land just past the gather point
// so the cards read as already assembled. Mobile renders a plain static grid, so
// this only applies at the md+ parallax breakpoint (Tailwind md = 768px).
const SECTORS_GATHER_PROGRESS = 0.62;

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

  // Smooth-scroll to a section, then close the menu. The open menu calls
  // lenis.stop(), so re-enable scrolling before scrolling. Mirrors the Lenis
  // pattern in strategy.tsx (goToTeam), with a native scrollIntoView fallback.
  const goTo = (target: string) => {
    onClose();
    const lenis = (
      window as unknown as {
        lenis?: {
          start: () => void;
          scrollTo: (t: string | number, opts?: { offset?: number }) => void;
        };
      }
    ).lenis;

    // Sectors: land at the gathered state rather than the scattered top. Convert
    // the section anchor to an absolute scroll position partway through the tall
    // stage (top + gatherProgress × scrollable height).
    let dest: string | number = target;
    if (target === "#sectors") {
      const el = document.getElementById("sectors");
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (el && isDesktop) {
        const elTop = el.getBoundingClientRect().top + window.scrollY;
        dest = elTop + SECTORS_GATHER_PROGRESS * (el.offsetHeight - window.innerHeight);
      }
    }
    const isOffset = typeof dest === "string";

    if (lenis) {
      lenis.start();
      lenis.scrollTo(dest, isOffset ? { offset: -20 } : undefined);
    } else if (typeof dest === "number") {
      window.scrollTo({ top: dest, behavior: "smooth" });
    } else {
      document
        .querySelector(dest)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
          className="fixed inset-0 z-[80] flex flex-col overflow-hidden"
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
          <div className="relative flex shrink-0 items-center justify-between px-6 py-5 md:px-10">
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

          {/* Content — fills the space below the top bar and scrolls if a short
              viewport can't fit all links plus the footer (min-h-0 lets the flex
              child shrink so overflow-y-auto engages instead of clipping). */}
          <div className="relative flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-10 md:px-10">
            <motion.nav
              className="mt-[6vh] flex flex-col gap-1"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {t.menuLinks.map((link, i) => {
                const target = MENU_TARGETS[i] ?? "#top";
                const isRoute = target.startsWith("/");
                return (
                  <motion.a
                    key={link}
                    href={target}
                    onClick={(e) => {
                      // In-page anchors smooth-scroll; routes navigate normally.
                      if (isRoute) {
                        onClose();
                      } else {
                        e.preventDefault();
                        goTo(target);
                      }
                    }}
                    variants={item}
                    className="font-inter text-4xl font-light tracking-tight text-white/85 transition-colors hover:text-[var(--gold-light)] md:text-6xl [@media(max-height:760px)]:text-3xl [@media(min-width:768px)_and_(max-height:760px)]:text-4xl"
                  >
                    {link}
                  </motion.a>
                );
              })}
            </motion.nav>

            {/* Footer row — mt-auto anchors it to the bottom on tall screens
                (the old justify-between look); when content overflows a short
                screen the margin collapses and it flows into the scroll. */}
            <motion.div
              className="mt-auto flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between"
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
                  className="font-inter text-sm text-white/70 transition-colors hover:text-white"
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
                  className="rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-6 py-2.5 text-xs tracking-[0.2em] text-[var(--gold-light)] transition hover:bg-[var(--gold)]/20 font-inter"
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
