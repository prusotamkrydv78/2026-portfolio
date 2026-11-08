"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap, onIntro, ScrollTrigger } from "@/lib/gsap";

const vertex = /* glsl */ `
  uniform float uTime, uProgress, uScatter, uSize, uDpr, uRadius;
  uniform vec2 uMouse;
  attribute vec3 aTarget, aStart;
  attribute float aRand, aAccent;
  varying float vAccent, vAlpha;

  void main() {
    // each particle arrives on its own schedule
    float p = clamp(uProgress * 1.6 - aRand * 0.6, 0.0, 1.0);
    p = 1.0 - pow(1.0 - p, 4.0);
    vec3 pos = mix(aStart, aTarget, p);
    pos = mix(pos, aStart, uScatter * (0.35 + aRand * 0.5));

    // idle drift
    pos.x += sin(uTime * 0.9 + aRand * 40.0) * 1.1;
    pos.y += cos(uTime * 0.8 + aRand * 30.0) * 1.1;

    // cursor pushes particles away
    vec2 d = pos.xy - uMouse;
    float dist = length(d);
    float f = 1.0 - smoothstep(0.0, uRadius, dist);
    pos.xy += normalize(d + 0.0001) * f * f * uRadius * 0.55;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * uDpr * (0.7 + aRand * 0.6) * (1.0 + f * 1.3);
    vAccent = max(aAccent, f * step(0.55, aRand));
    vAlpha = (0.25 + 0.75 * p) * (1.0 - uScatter * 0.6);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColor, uAccent;
  varying float vAccent, vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(mix(uColor, uAccent, vAccent), vAlpha * (1.0 - smoothstep(0.3, 0.5, d)));
  }
`;

// The name, drawn by a few thousand particles that assemble on intro,
// flee the cursor, and scatter as the hero scrolls away.
export function ParticleName({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    const dpr = Math.min(devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);
    const uniforms = {
      uTime: { value: 0 }, uProgress: { value: 0 }, uScatter: { value: 0 },
      uMouse: { value: new THREE.Vector2(-1e5, -1e5) },
      uColor: { value: new THREE.Color() }, uAccent: { value: new THREE.Color() },
      uSize: { value: 2 }, uDpr: { value: dpr }, uRadius: { value: 140 },
    };
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader: vertex, fragmentShader: fragment, transparent: true, depthWrite: false });
    let points: THREE.Points | null = null;
    let w = 0, h = 0;

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      uniforms.uColor.value.set(cs.getPropertyValue("--fg").trim() || "#141413");
      uniforms.uAccent.value.set(cs.getPropertyValue("--accent").trim() || "#ff4d00");
    };

    const build = () => {
      w = el.clientWidth; h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      Object.assign(camera, { left: -w / 2, right: w / 2, top: h / 2, bottom: -h / 2 });
      camera.updateProjectionMatrix();

      // rasterise the word, then sample it on a grid
      const c = document.createElement("canvas");
      c.width = w; c.height = h;
      const ctx = c.getContext("2d", { willReadFrequently: true })!;
      const family = getComputedStyle(document.body).fontFamily;
      let size = 100;
      ctx.font = `600 ${size}px ${family}`;
      size = Math.min((size * w * 0.94) / ctx.measureText(text).width, h * 0.5);
      ctx.font = `600 ${size}px ${family}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, w / 2, h * 0.46);
      const data = ctx.getImageData(0, 0, w, h).data;
      const gap = w < 700 ? 3 : 5;

      const target: number[] = [], start: number[] = [], rand: number[] = [], accent: number[] = [];
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          if (data[(y * w + x) * 4 + 3] < 128) continue;
          target.push(x - w / 2, h / 2 - y, 0);
          const a = Math.random() * Math.PI * 2, r = Math.max(w, h) * (0.4 + Math.random() * 0.8);
          start.push(Math.cos(a) * r, Math.sin(a) * r, 0);
          rand.push(Math.random());
          accent.push(Math.random() < 0.035 ? 1 : 0);
        }
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(target, 3));
      g.setAttribute("aTarget", new THREE.Float32BufferAttribute(target, 3));
      g.setAttribute("aStart", new THREE.Float32BufferAttribute(start, 3));
      g.setAttribute("aRand", new THREE.Float32BufferAttribute(rand, 1));
      g.setAttribute("aAccent", new THREE.Float32BufferAttribute(accent, 1));
      if (points) { scene.remove(points); points.geometry.dispose(); }
      points = new THREE.Points(g, material);
      scene.add(points);
      uniforms.uSize.value = w < 700 ? 1.8 : 2.6;
      uniforms.uRadius.value = w < 700 ? 70 : 140;
    };

    // pointer, smoothed
    const target = new THREE.Vector2(-1e5, -1e5);
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.set(e.clientX - r.left - w / 2, h / 2 - (e.clientY - r.top));
    };
    const onLeave = () => target.set(-1e5, -1e5);

    let visible = true, raf = 0;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      uniforms.uTime.value = t / 1000;
      const m = uniforms.uMouse.value;
      if (target.x < -1e4) m.copy(target); else m.lerp(target, 0.12);
      renderer.render(scene, camera);
    };

    const themeObs = new MutationObserver(readColors);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", readColors);

    let ro: ResizeObserver | null = null;
    let st: ScrollTrigger | null = null;
    let offIntro = () => {};
    document.fonts.ready.then(() => {
      readColors();
      build();
      ro = new ResizeObserver(() => build());
      ro.observe(el);
      raf = requestAnimationFrame(loop);
      offIntro = onIntro(() => gsap.to(uniforms.uProgress, { value: 1, duration: 2.6, ease: "expo.out" }));
      st = ScrollTrigger.create({
        trigger: el, start: "top top", end: "bottom top", scrub: true,
        onUpdate: (s) => { uniforms.uScatter.value = s.progress; },
      });
    });
    addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      offIntro(); st?.kill(); ro?.disconnect(); io.disconnect(); themeObs.disconnect();
      mq.removeEventListener("change", readColors);
      removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      points?.geometry.dispose(); material.dispose(); renderer.dispose();
      renderer.domElement.remove();
    };
  }, [text]);

  return <div ref={ref} aria-hidden className="absolute inset-0" />;
}
