import { stack } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Stack() {
  return (
    <section id="stack" className="border-y border-line bg-raised">
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36">
        <SectionHeading index="04" label="Toolbox" title="Tools I reach for, and know well enough to debug." />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {stack.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.05} className="bg-bg p-6">
              <p className="label mb-5 flex justify-between">
                {g.group}
                <span>{String(g.items.length).padStart(2, "0")}</span>
              </p>
              <ul className="space-y-2.5">
                {g.items.map((it) => (
                  <li key={it} className="text-[15px]">
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
