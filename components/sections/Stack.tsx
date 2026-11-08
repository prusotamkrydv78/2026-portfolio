"use client";
import { useRef } from "react";
import { site, stack } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Stack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-row]", {
        y: 40, opacity: 0, stagger: 0.08, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: "[data-table]", start: "top 75%" },
      });
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const obj = { v: end > 1000 ? end - 40 : 0 };
        gsap.to(obj, {
          v: end, duration: 1.8, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
        });
      });
    });
  }, { scope: root });

  return (
    <section id="stack" ref={root} className="bg-ink px-4 py-32 text-paper sm:px-8 [--rule:rgb(241_239_233/0.16)] [--ink-2:rgb(241_239_233/0.55)]">
      <SectionLabel index="02" title="The stack" aside="What I reach for, by layer" />

      <div data-table className="border-t border-rule">
        {stack.map((g) => (
          <div key={g.group} data-row className="group grid gap-3 border-b border-rule py-6 sm:grid-cols-12 sm:items-baseline">
            <span className="label sm:col-span-3">{g.group}</span>
            <p className="font-display text-3xl font-bold tracking-[-0.03em] sm:col-span-9 sm:text-5xl">
              {g.items.map((it, i) => (
                <span key={it}>
                  <span className="transition-colors duration-300 hover:text-signal">{it}</span>
                  {i < g.items.length - 1 && <span className="text-paper/25"> / </span>}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-24 grid gap-10 sm:grid-cols-3">
        {site.facts.map((f) => (
          <div key={f.label} className="border-t border-paper pt-4">
            <span data-count={f.value} className="font-display text-7xl font-extrabold tracking-[-0.05em] tabular-nums sm:text-8xl">{f.value}</span>
            <p className="label mt-2">{f.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
