"use client";

import { useState } from "react";
import { profile } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { LocalTime } from "@/components/ui/LocalTime";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-28 md:px-8 md:pt-36">
        <Reveal>
          <p className="label mb-8 flex items-center gap-3">
            <span className="text-accent">06</span>
            <span className="h-px w-8 bg-line" />
            Contact
          </p>
          <h2 className="max-w-5xl text-[clamp(2.6rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
            Have a hard problem? <span className="text-muted">Let&apos;s talk about it.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-12 items-center rounded-full bg-accent px-6 font-medium text-accent-fg transition-transform active:scale-[0.98]"
          >
            Email me
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex h-12 items-center gap-3 rounded-full border border-line px-5 font-mono text-sm transition-colors hover:border-fg"
          >
            {profile.email}
            <span className="label" aria-live="polite">
              {copied ? "copied ✓" : "copy"}
            </span>
          </button>
          {profile.resumeUrl && (
            <a href={profile.resumeUrl} className="inline-flex h-12 items-center px-3 text-sm underline decoration-line underline-offset-4 hover:decoration-accent">
              Résumé (PDF) ↗
            </a>
          )}
        </Reveal>

        <div className="mt-28 grid gap-10 border-t border-line pt-10 md:grid-cols-[1fr_auto]">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-4">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="group block">
                  <span className="label block">{s.label}</span>
                  <span className="text-sm transition-colors group-hover:text-accent">{s.handle} ↗</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="label space-y-1 md:text-right">
            <p>
              {profile.location} · <LocalTime timeZone={profile.timezone} />
            </p>
            <p>Built with Next.js, Tailwind &amp; Motion.</p>
            <p>© {profile.name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
