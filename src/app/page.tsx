"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import LenisProvider from "@/components/home/lenis-provider";
import Splash from "@/components/home/splash";
import Nav from "@/components/home/nav";
import MenuOverlay from "@/components/home/menu-overlay";
import Hero from "@/components/home/hero";
import ScrollText from "@/components/home/scroll-text";
import WhyChoose from "@/components/home/why-choose";
import ValueChain from "@/components/home/value-chain";
import Sectors from "@/components/home/sectors";
import Services from "@/components/home/services";
import CtaMorph from "@/components/home/cta-morph";
import Portfolio from "@/components/home/portfolio";
import SaudiBorn from "@/components/home/saudi-born";
import Team from "@/components/home/team";
import Strategy from "@/components/home/strategy";
import ContactFinale from "@/components/home/contact-finale";
import GradientCircle from "@/components/home/gradient-circle";
import { GradientCircleProvider } from "@/components/home/gradient-circle-context";

const SPLASH_SEEN_KEY = "us-splash-seen";

// Whether the splash has already played this browser session. Read via
// useSyncExternalStore so SSR and hydration agree (the server assumes "not
// seen"); after hydration the client value takes over and a returning
// visitor's splash is dropped before it can play. A no-op subscribe is enough
// — we only need the value at mount; handleSplashComplete drives the in-session
// flip once the splash finishes.
function useSplashSeen() {
  return useSyncExternalStore(
    () => () => {},
    () => sessionStorage.getItem(SPLASH_SEEN_KEY) !== null,
    () => false,
  );
}

export default function Home() {
  const splashSeen = useSplashSeen();
  const [splashPlayed, setSplashPlayed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Reloads, back/forward, and internal navigation within the same tab session
  // skip the splash; a genuinely new session shows it again.
  const introDone = splashSeen || splashPlayed;

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem(SPLASH_SEEN_KEY, "1");
    setSplashPlayed(true);
  }, []);

  // Hold the page still while the splash plays; release on completion.
  useEffect(() => {
    const lenis = (
      window as unknown as { lenis?: { stop: () => void; start: () => void } }
    ).lenis;
    if (introDone) lenis?.start();
    else lenis?.stop();
  }, [introDone]);

  return (
    <LenisProvider>
      <GradientCircleProvider>
        {!introDone && <Splash onComplete={handleSplashComplete} />}
        <Nav show={introDone} onMenuOpen={() => setMenuOpen(true)} />
        <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
        <GradientCircle />
        <main>
          <Hero />
          <ScrollText />
          <WhyChoose />
          <ValueChain />
          <Sectors />
          <Services />
          <CtaMorph />
          <Portfolio />
          <SaudiBorn />
          <Team />
          <Strategy />
          {/* Partners (Part 13a) is hidden until the client delivers real
              partner logos — src/components/home/partners.tsx still renders
              placeholder slots. Restore it here, plus its menu link, when the
              artwork lands. */}
          <ContactFinale />
        </main>
      </GradientCircleProvider>
    </LenisProvider>
  );
}
