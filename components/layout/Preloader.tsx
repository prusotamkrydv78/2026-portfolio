"use client";
import { useRef, useState } from "react";
import { site } from "@/content/site";
import { gsap, INTRO_EVENT, useGSAP } from "@/lib/gsap";

// Counter to 100, then the curtain lifts and the intro event fires.
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(() => {
    const done = () => {
      (window as unknown as { __intro?: boolean }).__intro = true;
      window.dispatchEvent(new Event(INTRO_EVENT));
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { done(); setGone(true); return; }

    const counter = { v: 0 };
    gsap.timeline({ onComplete: () => setGone(true) })
      .from("[data-pl-line]", { yPercent: 110, duration: 0.9, stagger: 0.08 })
      .to(counter, {
        v: 100, duration: 1.5, ease: "power2.inOut",
        onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(3, "0"); },
      }, 0)
      .to("[data-pl-bar]", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0)
      .to("[data-pl-line], [data-pl-num]", { yPercent: -110, duration: 0.6, ease: "expo.in", stagger: 0.04 }, ">-0.05")
      .add(done, ">-0.1")
      .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.inOut" }, "<");
  }, { scope: root });

  if (gone) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[100] flex flex-col justify-between bg-fg p-4 text-bg sm:p-8" style={{ clipPath: "inset(0 0 0% 0)" }}>
      <div className="overflow-hidden text-[14px]"><p data-pl-line>{site.fullName} — Portfolio 2026</p></div>
      <div>
        <div className="flex items-end justify-between gap-4">
          <div className="overflow-hidden text-[14px] text-bg/60"><p data-pl-line>{site.tagline}</p></div>
          <div className="overflow-hidden">
            <span ref={num} data-pl-num className="block font-mono text-[clamp(64px,14vw,200px)] leading-[0.85] tabular-nums">000</span>
          </div>
        </div>
        <div className="mt-4 h-px bg-bg/20"><div data-pl-bar className="h-full origin-left scale-x-0 bg-accent" /></div>
      </div>
    </div>
  );
}
