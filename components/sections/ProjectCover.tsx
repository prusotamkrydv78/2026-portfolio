// Generated cover art so the site looks finished before real screenshots exist.
// Swap for <Image> once you have project shots.
export function ProjectCover({ hue, title }: { hue: number; title: string }) {
  const c1 = `oklch(0.62 0.15 ${hue})`;
  const c2 = `oklch(0.32 0.08 ${hue})`;
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line" style={{ background: c2 }}>
      <svg viewBox="0 0 320 200" className="absolute inset-0 size-full" aria-hidden>
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1={i * 28} y1="0" x2={i * 28 + 120} y2="200" stroke={c1} strokeOpacity={0.25} />
        ))}
        <rect x="36" y="42" width="248" height="130" rx="6" fill="#0c0d0f" fillOpacity="0.85" />
        <rect x="36" y="42" width="248" height="18" rx="6" fill={c1} fillOpacity="0.25" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={48 + i * 10} cy="51" r="2.5" fill={c1} />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="52" y={74 + i * 16} width={60 + ((i * 47 + hue) % 140)} height="5" rx="2.5" fill={c1} fillOpacity={0.9 - i * 0.14} />
        ))}
        <path d="M200 156 L220 130 L238 140 L262 100" fill="none" stroke={c1} strokeWidth="2.5" />
      </svg>
      <span className="absolute bottom-3 left-4 font-mono text-[11px] text-white/70">{title.toLowerCase().replace(/\s+/g, "-")}.app</span>
    </div>
  );
}
