"use client";
// Single place GSAP is configured. One easing language for the whole site.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
gsap.defaults({ ease: "expo.out", duration: 1 });

// The preloader fires this once; anything that waits for the intro listens for it.
export const INTRO_EVENT = "intro:done";
export function onIntro(cb: () => void) {
  if ((window as unknown as { __intro?: boolean }).__intro) { cb(); return () => {}; }
  window.addEventListener(INTRO_EVENT, cb, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, cb);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
