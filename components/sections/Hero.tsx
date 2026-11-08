"use client";
import { useRef } from "react";
import { site } from "@/content/site";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { LocalTime } from "@/components/ui/LocalTime";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const split = SplitText.create("[data-name]", { type: "chars", mask: "chars" });
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl
        .from("[data-rule]", { scaleX: 0, transformOrigin: "left", duration: 1.4, stagger: 0.08 })
        .from(split.chars, { yPercent: 115, duration: 1.4, stagger: 0.035 }, 0.1)
        .from("[data-meta]", { duration: 1.2, scrambleText: { text: "{original}", chars: "01", speed: 0.5 }, stagger: 0.08 }, 0.3)
        .from("[data-up]", { y: 30, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.7)
        .from("[data-dot]", { scale: 0, duration: 0.9, ease: "back.out(3)" }, 1.1);

      // name drifts apart slightly as you scroll away
      gsap.to("[data-first]", { xPercent: -6, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to("[data-last]", { xPercent: 6, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      return () => split.revert();
    });
  }, { scope: root });

  return (
    <section id="top" ref={root} className="flex min-h-svh flex-col justify-between px-4 pb-8 pt-24 sm:px-8">
      <div className="grid grid-cols-2 gap-y-3 sm:grid-cols-4">
        <div data-rule className="col-span-full mb-1 h-px bg-rule" />
        <p className="label"><span data-meta>{site.role}</span></p>
        <p className="label"><span data-meta>Based in {site.location}</span></p>
        <p className="label">Local time <LocalTime timezone={site.timezone} /></p>
        <p className="label flex items-center gap-2 sm:justify-end">
          {site.available && <><span data-dot className="h-2 w-2 rounded-full bg-signal" /><span data-meta>Available for work</span></>}
        </p>
      </div>

      <h1 className="font-display font-extrabold uppercase leading-[0.8] tracking-[-0.055em] whitespace-nowrap text-[clamp(3rem,16.8vw,20rem)]">
        <span data-name data-first className="block">{site.firstName}</span>
        <span data-name data-last className="block text-right">{site.lastName}<i aria-hidden className="ml-[0.04em] inline-block h-[0.16em] w-[0.16em] rounded-full bg-signal" /></span>
      </h1>

      <div className="grid gap-8 sm:grid-cols-12">
        <div data-rule className="h-px bg-rule sm:col-span-12" />
        <p data-up className="text-xl leading-snug tracking-[-0.01em] sm:col-span-6 sm:text-2xl">{site.statement}</p>
        <a data-up href="#work" className="group flex items-start justify-between gap-6 rounded-2xl bg-ink p-4 text-paper sm:col-span-4 sm:col-start-9">
          <div>
            <p className="font-mono text-[11px] text-paper/50">{site.now.label}</p>
            <p className="mt-1 font-display text-2xl font-bold">{site.now.title}</p>
            <p className="mt-1 text-sm text-paper/70">{site.now.detail}</p>
          </div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center gap-1.5 rounded-full bg-paper/10 transition-colors group-hover:bg-signal" aria-hidden>
            <span className="blink h-3 w-1.5 rounded-full bg-paper" />
            <span className="blink h-3 w-1.5 rounded-full bg-paper" />
          </span>
        </a>
      </div>
    </section>
  );
}
