"use client";
import { useRef } from "react";
import { journey, stack } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";

export function Capabilities() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>("[data-list]").forEach((list) => {
      gsap.from(list.querySelectorAll("[data-row]"), {
        yPercent: 60, opacity: 0, stagger: 0.06, duration: 1.1,
        scrollTrigger: { trigger: list, start: "top 80%" },
      });
      gsap.from(list.querySelectorAll("[data-rule]"), {
        scaleX: 0, transformOrigin: "left", stagger: 0.06, duration: 1.4,
        scrollTrigger: { trigger: list, start: "top 80%" },
      });
    });
  }, { scope: root });

  return (
    <section ref={root} className="grid gap-24 px-4 py-32 sm:px-8 lg:grid-cols-2 lg:gap-16">
      <div data-list>
        <p className="mb-8 font-mono text-[12px] text-fg-2">Stack</p>
        {stack.map((s) => (
          <div key={s.group} className="relative overflow-hidden">
            <div data-rule className="h-px bg-line" />
            <div data-row className="grid grid-cols-[7rem_1fr] gap-4 py-5">
              <span className="text-[14px] text-fg-2">{s.group}</span>
              <span className="text-[clamp(18px,1.6vw,22px)] tracking-[-0.01em]">{s.items}</span>
            </div>
          </div>
        ))}
      </div>

      <div data-list>
        <p className="mb-8 font-mono text-[12px] text-fg-2">Journey</p>
        {journey.map((j, i) => (
          <div key={j.year} className="group relative overflow-hidden">
            <div data-rule className="h-px bg-line" />
            <div data-row className="grid grid-cols-[7rem_1fr] gap-4 py-5">
              <span className={`font-mono text-[14px] ${i === 0 ? "text-accent" : "text-fg-2"}`}>{j.year}</span>
              <div>
                <p className="text-[clamp(18px,1.6vw,22px)] tracking-[-0.01em]">{j.title}</p>
                <p className="mt-1 text-[15px] text-fg-2">{j.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
