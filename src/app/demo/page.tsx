"use client";

import ContactFinale from "@/components/demo/contact-finale";
import CtaMorph from "@/components/demo/cta-morph";
import GradientCircle from "@/components/demo/gradient-circle";
import HeroArch from "@/components/demo/hero-arch";
import Nav from "@/components/demo/nav";
import Portfolio from "@/components/demo/portfolio";
import ScrollText from "@/components/demo/scroll-text";
import Sectors from "@/components/demo/sectors";
import Splash from "@/components/demo/splash";
import Stats from "@/components/demo/stats";
import { useState } from "react";

export default function DemoPage() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <main className="relative bg-[#0d0a1a] text-white">
      <Splash onComplete={() => setSplashDone(true)} />
      <Nav show={splashDone} />
      <GradientCircle />

      <HeroArch />
      <ScrollText />
      <Stats />
      <Sectors />
      <CtaMorph />
      <Portfolio />
      <ContactFinale />
    </main>
  );
}
