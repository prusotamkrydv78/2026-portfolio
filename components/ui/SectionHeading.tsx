import { Reveal } from "./Reveal";

export function SectionHeading({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <Reveal className="mb-14 grid gap-6 md:grid-cols-[200px_1fr] md:gap-8">
      <p className="label flex items-center gap-3 pt-2">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line" />
        {label}
      </p>
      <h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-6xl">{title}</h2>
    </Reveal>
  );
}
