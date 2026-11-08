"use client";
import { useEffect, useState } from "react";

export function LocalTime({ timezone, short = false }: { timezone: string; short?: boolean }) {
  const [t, setT] = useState(short ? "--:--" : "--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone, hour: "2-digit", minute: "2-digit", ...(short ? {} : { second: "2-digit" }),
    });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timezone, short]);
  return <span className="tabular-nums">{t}</span>;
}
