"use client";
import { useRef } from "react";
import Image from "next/image";
import { projects } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";

// Pinned horizontal gallery: cards skew with scroll velocity, images parallax
// inside their frames, and a turbulence ripple runs through an image on hover.
export function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      const distance = () => track.scrollWidth - innerWidth;
      const skew = gsap.quickTo(cards, "skewX", { duration: 0.6, ease: "power3" });

      const tween = gsap.to(track, {
        x: () => -distance(), ease: "none",
        scrollTrigger: {
          trigger: "[data-pin]", pin: true, scrub: 1, invalidateOnRefresh: true,
          end: () => `+=${distance()}`,
          onUpdate: (s) => {
            skew(gsap.utils.clamp(-6, 6, s.getVelocity() / -400));
            gsap.set("[data-progress]", { scaleX: s.progress });
          },
          onScrubComplete: () => skew(0),
        },
      });

      cards.forEach((card) => {
        gsap.fromTo(card.querySelector("[data-img]"), { xPercent: -7 }, {
          xPercent: 7, ease: "none",
          scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        });
      });
    });

    // hover ripple (all sizes)
    gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
      const map = card.querySelector("feDisplacementMap");
      const img = card.querySelector<HTMLElement>("[data-img]");
      if (!map || !img) return;
      card.addEventListener("pointerenter", () => {
        img.style.filter = `url(#${map.parentElement!.id})`;
        gsap.timeline({ onComplete: () => { img.style.filter = ""; } })
          .fromTo(map, { attr: { scale: 0 } }, { attr: { scale: 70 }, duration: 0.35, ease: "power2.out" })
          .to(map, { attr: { scale: 0 }, duration: 0.9, ease: "power3.out" });
      });
    });
  }, { scope: root });

  return (
    <section id="work" ref={root}>
      <div data-pin className="flex flex-col justify-center overflow-hidden py-24 md:h-svh md:py-0">
        <div className="mb-10 flex items-end justify-between px-4 sm:px-8">
          <h2 className="text-[clamp(40px,7vw,112px)] font-medium leading-[0.9] tracking-[-0.045em]">Selected work</h2>
          <span className="font-mono text-[12px] text-fg-2">({String(projects.length).padStart(2, "0")})</span>
        </div>

        <div data-track className="flex flex-col gap-16 px-4 sm:px-8 md:w-max md:flex-row md:gap-10">
          {projects.map((p, i) => (
            <a key={p.title} data-card data-cursor={p.live ? "Visit" : "Source"} href={p.href} target="_blank" rel="noreferrer"
              className="group block w-full will-change-transform md:w-[min(62vw,860px)]">
              <svg width="0" height="0" className="absolute" aria-hidden>
                <filter id={`ripple-${i}`}>
                  <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves="2" seed={i + 3} result="n" />
                  <feDisplacementMap in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </svg>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-bg-2">
                <div data-img className="absolute inset-y-0 -left-[8%] w-[116%]">
                  <Image src={p.image} alt={`${p.title} preview`} fill sizes="(min-width: 768px) 62vw, 100vw"
                    className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
                </div>
              </div>
              <div className="mt-5 grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 border-t border-line pt-4">
                <span className="font-mono text-[12px] text-fg-2">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[clamp(24px,2.6vw,36px)] font-medium tracking-[-0.03em]">{p.title}</h3>
                  <p className="mt-1 max-w-[42ch] text-[15px] text-fg-2">{p.summary}</p>
                </div>
                <div className="text-right font-mono text-[12px] text-fg-2">
                  <p>{p.type}</p>
                  <p className="mt-1">{p.stack} · {p.year}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mx-4 mt-10 hidden h-px bg-line sm:mx-8 md:block">
          <div data-progress className="h-full origin-left scale-x-0 bg-fg" />
        </div>
      </div>
    </section>
  );
}
