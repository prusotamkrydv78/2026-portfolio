"use client";
import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { site } from "@/content/site";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const split = SplitText.create("[data-big]", { type: "chars", mask: "chars" });
      gsap.from(split.chars, {
        yPercent: 110, stagger: 0.03, duration: 1.3, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
      return () => split.revert();
    });
  }, { scope: root });

  const copy = async () => {
    try { await navigator.clipboard.writeText(site.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  };

  return (
    <footer id="contact" ref={root} className="flex min-h-svh flex-col justify-between bg-signal px-4 pb-8 pt-32 sm:px-8">
      <div>
        <p className="font-mono text-xs">(04) Contact</p>
        <a href={`mailto:${site.email}`} className="mt-6 block font-display font-extrabold uppercase leading-[0.82] tracking-[-0.055em] text-[clamp(4rem,17vw,19rem)]">
          <span data-big className="block">Let&apos;s</span>
          <span data-big className="block">talk<i aria-hidden className="ml-[0.04em] inline-block h-[0.16em] w-[0.16em] rounded-full bg-paper" /></span>
        </a>
      </div>

      <div className="mt-16 grid gap-6 border-t border-ink pt-4 sm:grid-cols-12 sm:items-center">
        <div className="flex flex-wrap items-center gap-3 sm:col-span-7">
          <a href={`mailto:${site.email}`} className="break-all text-lg font-medium underline decoration-1 underline-offset-4 hover:no-underline sm:text-2xl">
            {site.email}
          </a>
          <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 font-mono text-xs text-paper">
            {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
          </button>
        </div>
        <a href={site.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-sm hover:underline sm:col-span-3">
          <GithubIcon size={15} /> prusotamkrydv78
        </a>
        <p className="font-mono text-xs sm:col-span-2 sm:text-right">© 2026 {site.fullName}</p>
      </div>
    </footer>
  );
}
