import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Island } from "@/components/layout/Island";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Stack } from "@/components/sections/Stack";
import { Journey } from "@/components/sections/Journey";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <Island />
      <main>
        <Hero />
        <Work />
        <Stack />
        <Journey />
      </main>
      <Contact />
    </SmoothScroll>
  );
}
