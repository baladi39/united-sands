"use client";

import { useEffect, useState } from "react";
import LenisProvider from "@/components/home/lenis-provider";
import Splash from "@/components/home/splash";
import Nav from "@/components/home/nav";
import MenuOverlay from "@/components/home/menu-overlay";
import Hero from "@/components/home/hero";
import ScrollText from "@/components/home/scroll-text";
import WhyChoose from "@/components/home/why-choose";
import ValueChain from "@/components/home/value-chain";
import Sectors from "@/components/home/sectors";
import GradientCircle from "@/components/home/gradient-circle";
import { GradientCircleProvider } from "@/components/home/gradient-circle-context";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Hold the page still while the splash plays; release on completion.
  useEffect(() => {
    const lenis = (
      window as unknown as { lenis?: { stop: () => void; start: () => void } }
    ).lenis;
    if (splashDone) lenis?.start();
    else lenis?.stop();
  }, [splashDone]);

  return (
    <LenisProvider>
      <GradientCircleProvider>
        <Splash onComplete={() => setSplashDone(true)} />
        <Nav show={splashDone} onMenuOpen={() => setMenuOpen(true)} />
        <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
        <GradientCircle />
        <main>
          <Hero />
          <ScrollText />
          <WhyChoose />
          <ValueChain />
          <Sectors />
        </main>
      </GradientCircleProvider>
    </LenisProvider>
  );
}
