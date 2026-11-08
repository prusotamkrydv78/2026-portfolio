import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/layout/Preloader";
import { Header } from "@/components/layout/Header";
import { Cursor } from "@/components/layout/Cursor";
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Work } from "@/components/sections/Work";
import { Capabilities } from "@/components/sections/Capabilities";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Header />
      <Cursor />
      <main>
        <Hero />
        <Statement />
        <Work />
        <Capabilities />
      </main>
      <Contact />
    </SmoothScroll>
  );
}
