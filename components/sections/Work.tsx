import { projects } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCover } from "./ProjectCover";

export function Work() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36">
      <SectionHeading index="01" label="Selected work" title="Systems and products I've designed, built and run in production." />

      <Reveal>
        <article className="group grid gap-8 rounded-2xl border border-line bg-raised p-4 md:p-6 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          <div className="transition-transform duration-500 group-hover:scale-[1.01]">
            <ProjectCover hue={featured.hue} title={featured.title} />
          </div>
          <div className="flex flex-col justify-between gap-8 py-2 lg:pr-4">
            <div>
              <p className="label mb-4">Featured · {featured.year} · {featured.kind}</p>
              <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">{featured.title}</h3>
              <p className="mt-4 leading-relaxed text-muted">{featured.summary}</p>
            </div>
            <div className="space-y-5">
              <p className="font-mono text-sm text-accent">→ {featured.impact}</p>
              <Tags items={featured.stack} />
              <Links href={featured.href} repo={featured.repo} />
            </div>
          </div>
        </article>
      </Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08}>
            <article className="group flex h-full flex-col gap-6 rounded-2xl border border-line p-4 transition-colors hover:bg-raised md:p-5">
              <div className="overflow-hidden rounded-lg">
                <div className="transition-transform duration-500 group-hover:scale-[1.02]">
                  <ProjectCover hue={p.hue} title={p.title} />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 px-1">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl font-semibold tracking-tight">{p.title}</h3>
                  <span className="label">{p.year}</span>
                </div>
                <p className="label -mt-2">{p.kind}</p>
                <p className="leading-relaxed text-muted">{p.summary}</p>
                <p className="mt-auto font-mono text-sm text-accent">→ {p.impact}</p>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Tags items={p.stack} />
                  <Links href={p.href} repo={p.repo} />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Links({ href, repo }: { href?: string; repo?: string }) {
  return (
    <div className="flex gap-4 text-sm">
      {href && (
        <a href={href} className="underline decoration-line underline-offset-4 transition-colors hover:decoration-accent">
          Case study ↗
        </a>
      )}
      {repo && (
        <a href={repo} className="underline decoration-line underline-offset-4 transition-colors hover:decoration-accent">
          Source ↗
        </a>
      )}
    </div>
  );
}
