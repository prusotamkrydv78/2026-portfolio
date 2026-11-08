export function SectionLabel({ index, title, aside }: { index: string; title: string; aside?: string }) {
  return (
    <header className="mb-16 grid grid-cols-2 items-end gap-4 sm:mb-24 sm:grid-cols-12">
      <span className="font-mono text-xs sm:col-span-1">({index})</span>
      <h2 className="col-span-2 font-display text-[clamp(2.8rem,8vw,7.5rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.05em] sm:col-span-8">
        {title}
      </h2>
      {aside && <p className="label col-span-2 sm:col-span-3 sm:text-right">{aside}</p>}
    </header>
  );
}
