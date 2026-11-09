import { experience } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36">
      <SectionHeading index="03" label="Experience" title="Four years, four teams, one habit: leave it better." />

      <ol className="border-t border-line">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.05}>
            <li className="group grid gap-4 border-b border-line py-8 transition-colors md:grid-cols-[200px_1fr_auto] md:gap-8">
              <div className="label pt-1.5">
                <span className={i === 0 ? "text-accent" : ""}>{job.period}</span>
                <div className="mt-1">{job.location}</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {job.role} <span className="text-muted">· {job.company}</span>
                </h3>
                <ul className="mt-4 max-w-2xl space-y-2 text-muted">
                  {job.points.map((pt) => (
                    <li key={pt} className="relative pl-5 leading-relaxed before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-muted">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="flex flex-wrap content-start gap-1.5 md:max-w-[220px] md:justify-end">
                {job.stack.map((s) => (
                  <li key={s} className="font-mono text-[11px] text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
