"use client";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { projects } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { Cover } from "@/components/work/Cover";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((el) => {
        const frame = el.querySelector("[data-frame]");
        const inner = el.querySelector("[data-inner]");
        // cover opens from a narrow slit to full frame as it enters
        gsap.fromTo(frame, { clipPath: "inset(18% 12% 18% 12% round 24px)" }, {
          clipPath: "inset(0% 0% 0% 0% round 24px)", ease: "none",
          scrollTrigger: { trigger: el, start: "top 90%", end: "top 30%", scrub: 0.6 },
        });
        gsap.fromTo(inner, { scale: 1.18 }, {
          scale: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.from(el.querySelectorAll("[data-meta-item]"), {
          y: 24, opacity: 0, stagger: 0.07, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 70%" },
        });
      });
    });
  }, { scope: root });

  return (
    <section id="work" ref={root} className="px-4 py-32 sm:px-8">
      <SectionLabel index="01" title="Selected work" aside={`${projects.length} projects · 2024 — 2026`} />

      <div className="flex flex-col gap-28 sm:gap-40">
        {projects.map((p, i) => (
          <article key={p.slug} data-project className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="flex flex-col lg:col-span-4 lg:pt-2">
              <div data-meta-item className="flex items-baseline justify-between border-t border-ink pt-3">
                <span className="font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                <span className="label">{p.type} · {p.year}</span>
              </div>
              <h3 data-meta-item className="mt-6 font-display text-5xl font-extrabold tracking-[-0.045em] sm:text-7xl">{p.title}</h3>
              <p data-meta-item className="mt-5 max-w-sm text-lg leading-snug text-ink-2">{p.summary}</p>
              <ul data-meta-item className="mt-6 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <li key={s} className="rounded-full border border-rule px-2.5 py-1 font-mono text-[11px]">{s}</li>
                ))}
              </ul>
              <div data-meta-item className="mt-8 flex gap-3 lg:mt-auto">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm text-paper transition-colors hover:bg-signal hover:text-ink">
                    Visit live <ArrowUpRight size={15} className="transition-transform group-hover:rotate-45" />
                  </a>
                )}
                <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-ink px-4 py-2 text-sm transition-colors hover:bg-ink hover:text-paper">
                  <GithubIcon size={15} /> Source
                </a>
              </div>
            </div>

            <div data-frame className="aspect-[16/11] overflow-hidden rounded-3xl lg:col-span-8">
              <div data-inner className="h-full w-full">
                <Cover cover={p.cover} title={p.title} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
