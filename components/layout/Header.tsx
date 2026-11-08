import { site } from "@/content/site";
import { LocalTime } from "@/components/ui/LocalTime";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const links = [["Work", "#work"], ["About", "#about"], ["Contact", "#contact"]];

// Blend-difference header: stays legible over light, dark and imagery without a background.
export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
      <div className="grid h-16 grid-cols-2 items-center px-4 text-[14px] sm:grid-cols-3 sm:px-8">
        <a href="#top" className="pointer-events-auto font-medium">{site.shortName}</a>
        <nav className="pointer-events-auto hidden justify-center gap-8 sm:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="group relative">
              {l}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="pointer-events-auto flex items-center justify-end gap-4">
          <span className="hidden font-mono text-[12px] sm:inline">{site.location} <LocalTime timezone={site.timezone} short /></span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
