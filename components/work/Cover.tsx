import Image from "next/image";
import type { Cover as CoverT } from "@/content/site";

// Every project gets a real visual: a live-site screenshot in a browser frame,
// or a code-drawn mock of the product when there is no public URL.
export function Cover({ cover, title }: { cover: CoverT; title: string }) {
  switch (cover.kind) {
    case "shot":
      return (
        <div className="flex h-full items-center justify-center bg-paper-2 p-[6%]">
          <div className="w-full overflow-hidden rounded-xl bg-white shadow-[0_30px_60px_-20px_rgb(0_0_0/0.35)]">
            <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#f6f6f4] px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-black/10" /><span className="h-2.5 w-2.5 rounded-full bg-black/10" /><span className="h-2.5 w-2.5 rounded-full bg-black/10" />
              <span className="ml-3 flex-1 truncate rounded-md bg-black/5 px-2 py-0.5 text-center font-mono text-[10px] text-black/50">{cover.url}</span>
            </div>
            <Image src={cover.src} alt={`${title} screenshot`} width={1440} height={900} className="h-auto w-full" sizes="(min-width: 1024px) 60vw, 100vw" />
          </div>
        </div>
      );

    case "notch":
      return (
        <div className="relative h-full bg-[#1d2b3a] bg-[radial-gradient(120%_80%_at_70%_120%,#3c6e8f_0%,transparent_60%)]">
          <div className="absolute left-1/2 top-0 flex h-[16%] w-[34%] -translate-x-1/2 items-center gap-3 rounded-b-[28px] bg-black px-[3%]">
            <span className="flex aspect-square h-[58%] items-center justify-center gap-[12%] rounded-full bg-signal">
              <span className="blink h-[38%] w-[14%] rounded-full bg-black" /><span className="blink h-[38%] w-[14%] rounded-full bg-black" />
            </span>
            <span className="h-1.5 flex-1 rounded-full bg-white/20"><span className="block h-full w-2/3 rounded-full bg-white/70" /></span>
          </div>
          <div className="absolute inset-x-[18%] top-[22%] grid grid-cols-3 gap-2 rounded-2xl bg-black/70 p-3 backdrop-blur">
            {["Music", "Clipboard", "Timer", "Phone", "Memory", "AI"].map((t) => (
              <span key={t} className="rounded-lg bg-white/10 px-2 py-3 font-mono text-[10px] text-white/80">{t}</span>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 flex h-[11%] items-center justify-center gap-2 bg-black/40">
            {[0, 1, 2, 3, 4].map((i) => <span key={i} className="h-[45%] aspect-square rounded-md bg-white/25" />)}
          </div>
        </div>
      );

    case "assistant":
      return (
        <div className="flex h-full items-center justify-center bg-[#d9dccf] p-[7%]">
          <div className="flex w-full max-w-md flex-col gap-2.5 rounded-2xl bg-[#111] p-4 text-[12px] text-white/85 shadow-2xl">
            <div className="flex items-center justify-between font-mono text-[10px] text-white/40"><span>assistant</span><span>sandbox: ~/Projects</span></div>
            <p className="self-end rounded-xl rounded-br-sm bg-signal px-3 py-2 text-black">Summarize the notes in /Projects/ideas</p>
            <p className="rounded-xl bg-white/10 px-3 py-2 font-mono text-[11px] text-white/60">↳ list_dir(&quot;ideas&quot;) · read_file × 3</p>
            <p className="max-w-[85%] rounded-xl rounded-bl-sm bg-white/10 px-3 py-2">Three ideas, one theme: tools that stay out of the way. Want me to write a summary.md?</p>
            <div className="mt-1 rounded-xl border border-white/10 px-3 py-2 text-white/30">Message…</div>
          </div>
        </div>
      );

    case "linkme":
      return (
        <div className="flex h-full items-center justify-center gap-[6%] bg-[#e4dccb] p-[6%]">
          <div className="hidden h-[80%] flex-1 flex-col gap-2 rounded-xl bg-white p-4 shadow-xl sm:flex">
            <span className="font-mono text-[10px] text-black/40">editor</span>
            {["Portfolio", "GitHub", "Newsletter"].map((l) => (
              <span key={l} className="flex items-center justify-between rounded-lg border border-black/10 px-3 py-2 text-[12px]">{l}<span className="text-black/30">⋮⋮</span></span>
            ))}
            <span className="rounded-lg border border-dashed border-black/20 px-3 py-2 text-center text-[12px] text-black/40">+ Add link</span>
          </div>
          <div className="flex aspect-[9/17] h-[88%] flex-col items-center gap-2 rounded-[28px] border-[6px] border-black bg-[#1a1a1a] px-4 pt-8">
            <span className="h-12 w-12 rounded-full bg-signal" />
            <span className="mb-2 text-[12px] font-semibold text-white">@prusotam</span>
            {["Portfolio", "GitHub", "Newsletter"].map((l) => (
              <span key={l} className="w-full rounded-full bg-white py-2 text-center text-[11px] font-medium text-black">{l}</span>
            ))}
            <span className="mt-auto mb-3 font-mono text-[9px] text-white/30">live preview</span>
          </div>
        </div>
      );

    case "store":
      return (
        <div className="flex h-full items-end justify-center gap-[5%] bg-[#cfd8d2] px-[6%] pt-[7%]">
          {[0, 1].map((p) => (
            <div key={p} className={`flex aspect-[9/18] h-[92%] flex-col gap-2 rounded-t-[30px] border-[6px] border-b-0 border-black bg-white p-3 ${p ? "hidden sm:flex" : ""}`}>
              <span className="mt-4 text-[13px] font-bold">{p ? "Admin · Orders" : "Discover"}</span>
              {p ? (
                ["#1042 · Paid", "#1041 · Shipped", "#1040 · Paid", "#1039 · Refund"].map((o) => (
                  <span key={o} className="flex justify-between rounded-lg bg-black/5 px-2 py-2 font-mono text-[10px]">{o}<span className="text-black/40">→</span></span>
                ))
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {["#f4c9a8", "#b8d4e3", "#d8e2b8", "#e8c2cf"].map((c) => (
                    <span key={c} className="flex aspect-square flex-col justify-end rounded-xl p-1.5" style={{ background: c }}>
                      <span className="h-1.5 w-2/3 rounded bg-black/25" />
                    </span>
                  ))}
                </div>
              )}
              {!p && <span className="mt-auto rounded-full bg-black py-2 text-center text-[10px] font-medium text-white">Cart · 2 items</span>}
            </div>
          ))}
        </div>
      );
  }
}
