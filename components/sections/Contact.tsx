"use client";
import { useRef, useState } from "react";
import { site } from "@/content/site";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { GithubIcon } from "@/components/ui/GithubIcon";

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const magnet = useRef<HTMLAnchorElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(() => {
    const split = SplitText.create("[data-big]", { type: "chars", mask: "chars" });
    gsap.from(split.chars, {
      yPercent: 110, stagger: 0.025, duration: 1.2,
      scrollTrigger: { trigger: "[data-big]", start: "top 80%" },
    });

    // magnetic button
    const el = magnet.current!;
    const x = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const y = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.35);
      y((e.clientY - r.top - r.height / 2) * 0.35);
    };
    const leave = () => { x(0); y(0); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { split.revert(); el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, { scope: root });

  const copy = async () => {
    try { await navigator.clipboard.writeText(site.email); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch {}
  };

  return (
    <footer id="contact" ref={root} className="flex min-h-svh flex-col justify-between bg-fg px-4 pb-6 pt-32 text-bg sm:px-8">
      <div>
        <p className="font-mono text-[12px] opacity-60">Contact</p>
        <h2 data-big className="mt-6 text-[clamp(56px,12vw,200px)] font-medium leading-[0.88] tracking-[-0.055em]">
          Let’s build<br />something
        </h2>
      </div>

      <div className="mt-16 flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <button onClick={copy} className="text-left text-[clamp(18px,2.2vw,28px)] tracking-[-0.02em] underline decoration-1 underline-offset-[6px] hover:no-underline">
            {site.email}
          </button>
          <span className="font-mono text-[12px] opacity-60">{copied ? "Copied to clipboard" : "Click to copy"}</span>
        </div>
        <a ref={magnet} href={`mailto:${site.email}`} data-cursor="Write"
          className="grid h-36 w-36 place-items-center rounded-full bg-accent text-[15px] font-medium text-[#0c0c0b] sm:h-44 sm:w-44">
          Get in touch
        </a>
      </div>

      <div className="mt-16 flex flex-col gap-3 border-t border-current/15 pt-5 text-[13px] opacity-70 sm:flex-row sm:justify-between">
        <span>© 2026 {site.fullName}</span>
        <a href={site.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:opacity-100">
          <GithubIcon size={14} /> {site.githubHandle}
        </a>
        <span>{site.location}</span>
      </div>
    </footer>
  );
}
