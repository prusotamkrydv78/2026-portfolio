"use client";

import { motion } from "motion/react";
import { profile, stats } from "@/content/site";
import { LocalTime } from "@/components/ui/LocalTime";
import { DotField } from "./DotField";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [first, last] = profile.name.split(" ");

  return (
    <section id="top" className="relative overflow-hidden border-b border-line pt-16">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,#000_20%,transparent_100%)]">
        <DotField />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-20 md:px-8 md:pt-28 lg:grid-cols-[1fr_340px] lg:items-end">
        <div>
          <motion.p
            className="label mb-8 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </motion.p>

          <h1 className="text-[clamp(3.2rem,11vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.055em]">
            {[first, last].map((word, i) => (
              <span key={word} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${i === 1 ? "text-muted" : ""}`}
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.1, ease }}
                >
                  {word}
                  {i === 1 && <span className="text-accent">.</span>}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="mt-10 flex max-w-2xl flex-col gap-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
          >
            <p className="text-lg leading-relaxed text-muted md:text-xl">
              <span className="text-fg">{profile.role}</span> — {profile.intro}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-transform active:scale-[0.98]"
              >
                View selected work
                <span className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm transition-colors hover:border-fg"
              >
                {profile.email}
              </a>
            </div>
          </motion.div>
        </div>

        <motion.aside
          className="rounded-xl border border-line bg-bg/70 font-mono text-xs backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          aria-label="Quick facts"
        >
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="text-muted">~/status</span>
            <span className="flex gap-1.5">
              <span className="size-2 rounded-full bg-line" />
              <span className="size-2 rounded-full bg-line" />
              <span className="size-2 rounded-full bg-accent" />
            </span>
          </div>
          <dl className="space-y-2.5 p-4">
            {[
              ["role", profile.role],
              ["focus", profile.focus],
              ["based", profile.location],
              ["local", <LocalTime key="t" timeZone={profile.timezone} />],
              ["status", profile.available ? "available" : "busy"],
            ].map(([k, v]) => (
              <div key={k as string} className="grid grid-cols-[64px_1fr] gap-2">
                <dt className="text-muted">{k}</dt>
                <dd className={k === "status" ? "text-accent" : ""}>{v}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-2 border-t border-line md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className={`border-line px-5 py-6 md:px-8 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 + i * 0.08 }}
          >
            <div className="text-3xl font-semibold tracking-tight md:text-4xl">{s.value}</div>
            <div className="label mt-2">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
