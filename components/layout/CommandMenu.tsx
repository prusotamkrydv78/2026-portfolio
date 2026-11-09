"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { nav, profile } from "@/content/site";
import { toggleTheme } from "@/components/ui/ThemeToggle";

type Item = { id: string; label: string; hint: string; run: () => void };

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const items = useMemo<Item[]>(() => {
    const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    return [
      ...nav.map((n) => ({ id: n.id, label: `Go to ${n.label}`, hint: "Navigate", run: go(n.id) })),
      { id: "theme", label: "Toggle theme", hint: "Action", run: toggleTheme },
      {
        id: "email",
        label: "Copy email address",
        hint: "Action",
        run: () => navigator.clipboard?.writeText(profile.email),
      },
      ...profile.socials.map((s) => ({
        id: s.label,
        label: `Open ${s.label}`,
        hint: "Link",
        run: () => window.open(s.href, "_blank", "noopener"),
      })),
    ];
  }, []);

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-menu", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-menu", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const select = (item?: Item) => {
    if (!item) return;
    close();
    item.run();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-bg/70 px-4 pt-[18vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-label="Command menu"
            className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-raised shadow-2xl"
            initial={{ y: -8, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span className="label">›</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") close();
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((a) => Math.min(a + 1, filtered.length - 1));
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((a) => Math.max(a - 1, 0));
                  }
                  if (e.key === "Enter") select(filtered[active]);
                }}
                placeholder="Type a command or search…"
                className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
              />
              <kbd className="label rounded border border-line px-1.5">esc</kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results.</li>}
              {filtered.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => select(item)}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm ${
                      i === active ? "bg-fg/[0.06] text-fg" : "text-muted"
                    }`}
                  >
                    {item.label}
                    <span className="label">{item.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
