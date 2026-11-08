// Single source of truth for all portfolio content.

export type Cover =
  | { kind: "shot"; src: string; url: string }
  | { kind: "notch" | "assistant" | "linkme" | "store" };

export type Project = {
  slug: string;
  title: string;
  year: string;
  type: string;
  summary: string;
  stack: string[];
  github: string;
  live?: string;
  cover: Cover;
};

export const site = {
  firstName: "Prusotam",
  lastName: "Yadav",
  fullName: "Prusotam Kumar Yadav",
  initials: "PY",
  role: "Full-stack developer",
  location: "India",
  timezone: "Asia/Kolkata",
  email: "prusotamkumaryadav78@gmail.com",
  github: "https://github.com/prusotamkrydv78",
  available: true,
  statement:
    "I build products end to end — web apps, mobile apps, and lately native desktop tools in Rust. Self-taught, shipping since 2023.",
  now: { label: "Now building", title: "Notchy", detail: "A living notch for Windows, written in Rust." },
  facts: [
    { value: "77", label: "Public repositories" },
    { value: "2023", label: "Wrote first line of JS" },
    { value: "4", label: "Platforms: web, mobile, desktop, server" },
  ],
};

export const projects: Project[] = [
  {
    slug: "notchy",
    title: "Notchy",
    year: "2026",
    type: "Desktop app",
    summary:
      "A living notch for Windows: a small robot at the top of the screen with a full panel of tools behind it, an optional taskbar of its own, and “unlock with phone” via a custom credential provider.",
    stack: ["Rust", "Win32", "Credential Provider"],
    github: "https://github.com/prusotamkrydv78/windoc",
    cover: { kind: "notch" },
  },
  {
    slug: "sathi",
    title: "Sathi",
    year: "2026",
    type: "Web app",
    summary: "A women's health companion designed bilingual from day one — English and Nepali side by side.",
    stack: ["JavaScript", "React", "Vercel"],
    github: "https://github.com/prusotamkrydv78/SathiCare",
    live: "https://saathicare.vercel.app",
    cover: { kind: "shot", src: "/work/sathi.png", url: "saathicare.vercel.app" },
  },
  {
    slug: "assistant",
    title: "Desk Assistant",
    year: "2026",
    type: "Desktop AI",
    summary:
      "A desktop AI assistant with file tools sandboxed to folders you explicitly allow, a managed browser, and opt-in control of Windows app windows. No shell, no delete — by design.",
    stack: ["Tauri 2", "Rust", "React 19", "OpenAI"],
    github: "https://github.com/prusotamkrydv78/Helper",
    cover: { kind: "assistant" },
  },
  {
    slug: "linkme",
    title: "LinkMe",
    year: "2026",
    type: "Full-stack platform",
    summary: "Link-in-bio platform with a live preview while you edit. TypeScript frontend on an ASP.NET Core Web API.",
    stack: ["TypeScript", "ASP.NET Core", "C#"],
    github: "https://github.com/prusotamkrydv78/LinkMe",
    cover: { kind: "linkme" },
  },
  {
    slug: "store",
    title: "Native Ecommerce",
    year: "2025",
    type: "Mobile app",
    summary: "Full mobile commerce stack — customer app, admin panel, and a .NET API with JWT auth.",
    stack: ["React Native", "Expo", ".NET", "JWT"],
    github: "https://github.com/prusotamkrydv78/Native_Eccomerce",
    cover: { kind: "store" },
  },
  {
    slug: "chatx",
    title: "ChatX",
    year: "2024",
    type: "Real-time app",
    summary: "Messaging with WebSocket rooms and live presence. My first real-time system in production.",
    stack: ["Next.js", "Socket.IO", "Node.js"],
    github: "https://github.com/prusotamkrydv78/message_app",
    live: "https://chatx-ten.vercel.app",
    cover: { kind: "shot", src: "/work/chatx.png", url: "chatx-ten.vercel.app" },
  },
];

export const stack = [
  { group: "Frontend", items: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"] },
  { group: "Backend", items: ["Node.js", "Express", "ASP.NET Core", "C#", "Socket.IO", "JWT"] },
  { group: "Data", items: ["PostgreSQL", "MongoDB"] },
  { group: "Mobile", items: ["React Native", "Expo Router"] },
  { group: "Desktop", items: ["Rust", "Tauri 2", "Win32"] },
];

export const journey = [
  { year: "2026", title: "Native & AI", body: "Went down to the metal with Rust: Notchy for Windows and a Tauri-based AI assistant. Shipped Sathi." },
  { year: "2025", title: ".NET & mobile", body: "Picked up C# and ASP.NET Core; built a full React Native commerce app against a .NET API." },
  { year: "2024", title: "Real-time & full-stack", body: "Socket.IO messaging, a MERN Twitter clone, serverless APIs on Vercel." },
  { year: "2023", title: "First line of JavaScript", body: "Self-taught. React within three months, full stack within a year." },
];
