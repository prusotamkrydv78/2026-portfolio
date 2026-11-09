import { Header } from "@/components/layout/Header";
import { CommandMenu } from "@/components/layout/CommandMenu";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Stack } from "@/components/sections/Stack";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-fg focus:px-3 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <Header />
      <CommandMenu />
      <main>
        <Hero />
        <Work />
        <About />
        <Experience />
        <Stack />
        <Writing />
        <Contact />
      </main>
    </>
  );
}
