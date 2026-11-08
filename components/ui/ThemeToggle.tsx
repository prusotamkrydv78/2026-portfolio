"use client";
import { Moon, Sun } from "lucide-react";

// The inline script in layout.tsx restores the saved choice before first paint.
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const current = root.dataset.theme ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };

  return (
    <button onClick={toggle} aria-label="Toggle light and dark mode" className="grid h-9 w-9 place-items-center rounded-full border border-current/30 transition-transform duration-300 hover:rotate-45">
      <Sun size={16} strokeWidth={1.5} className="when-dark" />
      <Moon size={16} strokeWidth={1.5} className="when-light" />
    </button>
  );
}
