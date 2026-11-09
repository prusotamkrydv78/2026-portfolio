"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "@/content/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled ? "border-b border-line bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center gap-2.5 font-mono text-sm" aria-label="Back to top">
          <span className="grid size-8 place-items-center rounded-md bg-fg text-xs font-semibold text-bg">
            {profile.shortName}
          </span>
          <span className="hidden sm:inline">{profile.name.toLowerCase().replace(" ", ".")}</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                active === n.id ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {active === n.id && <span className="absolute left-1 top-1/2 size-1 -translate-y-1/2 rounded-full bg-accent" />}
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-command-menu"))}
            className="hidden h-9 items-center gap-3 rounded-full border border-line pl-3.5 pr-2 text-sm text-muted transition-colors hover:border-fg hover:text-fg md:flex"
          >
            Search
            <kbd className="label rounded border border-line px-1.5 py-0.5">⌘K</kbd>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
