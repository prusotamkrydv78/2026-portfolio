import { writing } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Writing() {
  return (
    <section id="writing" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36">
      <SectionHeading index="05" label="Writing" title="Notes from the trenches." />
      <ul className="border-t border-line md:ml-[232px]">
        {writing.map((post, i) => (
          <Reveal key={post.title} delay={i * 0.05}>
            <li>
              <a
                href={post.href}
                className="group flex flex-col gap-2 border-b border-line py-6 md:flex-row md:items-center md:justify-between md:gap-8"
              >
                <span className="text-lg font-medium transition-colors group-hover:text-accent md:text-xl">{post.title}</span>
                <span className="label flex shrink-0 gap-4">
                  <span>{post.date}</span>
                  <span>{post.read}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </a>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
