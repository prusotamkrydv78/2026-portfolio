"use client";
import { useRef } from "react";
import { site } from "@/content/site";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

// Words light up one by one as the paragraph scrolls through the viewport.
export function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const split = SplitText.create("[data-statement]", { type: "words" });
    gsap.fromTo(split.words, { opacity: 0.12 }, {
      opacity: 1, ease: "none", stagger: 0.05,
      scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 50%", scrub: true },
    });
    return () => split.revert();
  }, { scope: root });

  return (
    <section id="about" ref={root} className="px-4 py-32 sm:px-8 sm:py-48">
      <p className="mb-8 font-mono text-[12px] text-fg-2">About</p>
      <p data-statement className="max-w-[22ch] text-[clamp(32px,5.4vw,84px)] font-medium leading-[1.04] tracking-[-0.035em] sm:max-w-[24ch]">
        {site.statement}
      </p>
    </section>
  );
}
