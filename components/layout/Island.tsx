"use client";
import { useRef, useState } from "react";
import { site } from "@/content/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const SECTIONS = [
  { id: "top", label: "Index" },
  { id: "work", label: "Selected work" },
  { id: "stack", label: "Stack" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

// Dynamic-island navigation: a black pill that names the current section,
// shows scroll progress, and expands into the full menu.
export function Island() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    gsap.from(root.current, { y: -80, duration: 1.4, delay: 0.9, ease: "elastic.out(1, 0.7)" });

    SECTIONS.forEach(({ id, label: text }) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive)
            gsap.to(label.current, { duration: 0.7, scrambleText: { text, chars: "lowerCase", speed: 0.8 }, ease: "none" });
        },
      }),
    );

    gsap.to(ring.current, {
      strokeDashoffset: 0, ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
  });

  useGSAP(() => {
    gsap.to(root.current, { width: open ? 340 : 248, duration: 0.7, ease: "elastic.out(1, 0.8)" });
    gsap.to("[data-panel]", { height: open ? "auto" : 0, duration: 0.6, ease: "expo.out" });
    if (open) gsap.from("[data-item]", { y: 14, opacity: 0, stagger: 0.04, duration: 0.5, delay: 0.1, ease: "expo.out" });
  }, { dependencies: [open], scope: root });

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div ref={root} className="w-[248px] overflow-hidden rounded-[22px] bg-ink text-paper ring-1 ring-white/10 shadow-[0_10px_40px_-12px_rgb(0_0_0/0.5)]">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="flex h-11 w-full items-center gap-3 px-1.5 pr-3"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-paper font-display text-[11px] font-bold text-ink">
            {site.initials}
          </span>
          <span ref={label} className="flex-1 truncate text-left font-mono text-xs">Index</span>
          <svg viewBox="0 0 20 20" className="h-5 w-5 -rotate-90" aria-hidden>
            <circle cx="10" cy="10" r="8" fill="none" stroke="rgb(241 239 233 / 0.18)" strokeWidth="2" />
            <circle ref={ring} cx="10" cy="10" r="8" fill="none" stroke="var(--signal)" strokeWidth="2"
              strokeLinecap="round" strokeDasharray="50.27" strokeDashoffset="50.27" />
          </svg>
        </button>

        <div data-panel className="h-0 overflow-hidden">
          <nav className="px-2 pb-2 pt-1">
            {SECTIONS.map((s, i) => (
              <a key={s.id} data-item href={`#${s.id}`} onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-white/10">
                {s.label}
                <span className="font-mono text-[11px] text-paper/40">0{i}</span>
              </a>
            ))}
            <a data-item href={`mailto:${site.email}`}
              className="mt-1 flex items-center justify-between rounded-xl bg-signal px-3 py-2.5 text-sm font-medium text-ink">
              Start a project <span aria-hidden>→</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
