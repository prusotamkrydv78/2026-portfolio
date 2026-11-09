import { about } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="border-y border-line bg-raised">
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36">
        <SectionHeading index="02" label="About" title={about.heading} />
        <div className="grid gap-12 md:grid-cols-[200px_1fr] md:gap-8">
          <div />
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <Reveal className="space-y-6 text-lg leading-relaxed text-muted">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </Reveal>
            <Reveal delay={0.1}>
              <ol className="divide-y divide-line border-y border-line">
                {about.principles.map((pr, i) => (
                  <li key={pr.title} className="grid grid-cols-[40px_1fr] gap-2 py-5">
                    <span className="label pt-1">0{i + 1}</span>
                    <div>
                      <h3 className="font-medium">{pr.title}</h3>
                      <p className="mt-1 text-sm text-muted">{pr.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
