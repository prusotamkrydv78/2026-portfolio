"use client";
import { useRef } from "react";
import { journey } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // the timeline's spine draws itself as you scroll
      gsap.fromTo("[data-spine] path", { drawSVG: "0%" }, {
        drawSVG: "100%", ease: "none",
        scrollTrigger: { trigger: "[data-list]", start: "top 70%", end: "bottom 60%", scrub: 0.5 },
      });
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el) => {
        gsap.from(el.children, {
          y: 30, opacity: 0, stagger: 0.08, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 75%" },
        });
      });
    });
  }, { scope: root });

  return (
    <section id="journey" ref={root} className="px-4 py-32 sm:px-8">
      <SectionLabel index="03" title="Journey" aside="Self-taught. Each year, one layer deeper." />

      <div data-list className="relative">
        <svg data-spine className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-1 sm:block" preserveAspectRatio="none" viewBox="0 0 2 100" aria-hidden>
          <path d="M1 0 V100" stroke="var(--ink)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <ol className="flex flex-col gap-20">
          {journey.map((j) => (
            <li key={j.year} data-step className="grid gap-4 sm:grid-cols-12 sm:pl-0">
              <span className="relative hidden sm:col-span-1 sm:block">
                <span className="absolute left-0 top-3 h-4 w-4 rounded-full border-2 border-ink bg-paper" />
              </span>
              <span className="font-display text-6xl font-extrabold tracking-[-0.05em] text-signal sm:col-span-4 sm:text-8xl">{j.year}</span>
              <div className="sm:col-span-6 sm:col-start-7 sm:pt-4">
                <h3 className="font-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{j.title}</h3>
                <p className="mt-2 max-w-md text-lg leading-snug text-ink-2">{j.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
