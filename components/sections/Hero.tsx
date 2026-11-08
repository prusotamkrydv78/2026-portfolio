"use client";
import { useRef } from "react";
import { site } from "@/content/site";
import { gsap, onIntro, useGSAP } from "@/lib/gsap";
import { ParticleName } from "@/components/webgl/ParticleName";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.set("[data-hero-in]", { yPercent: 110 });
    return onIntro(() => gsap.to("[data-hero-in]", { yPercent: 0, duration: 1.2, stagger: 0.08, delay: 0.5 }));
  }, { scope: root });

  return (
    <section id="top" ref={root} className="relative h-svh min-h-[560px] overflow-hidden">
      <h1 className="sr-only">{site.fullName}, {site.role}</h1>
      <ParticleName text={site.firstName.toUpperCase()} />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 grid gap-4 px-4 pb-6 text-[14px] sm:grid-cols-3 sm:items-end sm:px-8 sm:pb-8">
        <div className="overflow-hidden"><p data-hero-in className="max-w-[22rem] text-fg">{site.tagline}</p></div>
        <div className="hidden overflow-hidden text-center sm:block"><p data-hero-in className="text-fg-2">Move your cursor through the name</p></div>
        <div className="overflow-hidden sm:text-right"><p data-hero-in className="text-fg-2">Scroll to explore ↓</p></div>
      </div>
    </section>
  );
}
