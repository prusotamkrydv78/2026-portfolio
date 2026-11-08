"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// A follower that grows into a labelled disc over anything with data-cursor="Label".
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    const el = dot.current!;
    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    let active: string | null = null;

    const move = (e: PointerEvent) => {
      x(e.clientX); y(e.clientY);
      gsap.to(el, { autoAlpha: 1, duration: 0.3, overwrite: "auto" });
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const next = target?.dataset.cursor ?? null;
      if (next === active) return;
      active = next;
      if (next) {
        label.current!.textContent = next;
        gsap.to(el, { width: 96, height: 96, backgroundColor: "var(--accent)", duration: 0.5 });
        gsap.to(label.current, { autoAlpha: 1, scale: 1, duration: 0.4 });
      } else {
        gsap.to(el, { width: 12, height: 12, backgroundColor: "var(--fg)", duration: 0.5 });
        gsap.to(label.current, { autoAlpha: 0, scale: 0.6, duration: 0.2 });
      }
    };
    const leave = () => gsap.to(el, { autoAlpha: 0, duration: 0.3 });
    addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => { removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", leave); };
  });

  return (
    <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-3 w-3 items-center justify-center rounded-full bg-fg [@media(pointer:fine)]:flex">
      <span ref={label} className="invisible scale-60 text-[13px] font-medium text-[#0c0c0b]" />
    </div>
  );
}
