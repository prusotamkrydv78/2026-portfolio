// Single source of truth for all portfolio content.

export const site = {
  firstName: "Prusotam",
  fullName: "Prusotam Kumar Yadav",
  shortName: "Prusotam Yadav",
  role: "Full-stack developer",
  location: "India",
  timezone: "Asia/Kolkata",
  email: "prusotamkumaryadav78@gmail.com",
  github: "https://github.com/prusotamkrydv78",
  githubHandle: "prusotamkrydv78",
  tagline: "Full-stack developer building for the web, phones and the Windows desktop",
  statement:
    "I’m Prusotam, a self-taught developer who ships across the whole stack — React and Next.js on the web, React Native on phones, Node and ASP.NET Core behind them, and lately Rust, right down on the Windows desktop.",
};

export type Project = {
  title: string;
  year: string;
  type: string;
  summary: string;
  stack: string;
  image: string;
  href: string;
  live?: boolean;
};

export const projects: Project[] = [
  {
    title: "Notchy",
    year: "2026",
    type: "Windows app",
    summary: "A living notch for Windows with a robot in it, a panel of tools, its own taskbar and phone unlock",
    stack: "Rust · Win32",
    image: "/work/notch.png",
    href: "https://github.com/prusotamkrydv78/windoc",
  },
  {
    title: "Sathi",
    year: "2026",
    type: "Web app",
    summary: "A women’s health companion, bilingual in English and Nepali",
    stack: "React · Vercel",
    image: "/work/sathi.png",
    href: "https://saathicare.vercel.app",
    live: true,
  },
  {
    title: "Desk Assistant",
    year: "2026",
    type: "Desktop AI",
    summary: "An AI assistant with file tools sandboxed to the folders you allow",
    stack: "Tauri 2 · Rust · React 19",
    image: "/work/assistant.png",
    href: "https://github.com/prusotamkrydv78/Helper",
  },
  {
    title: "LinkMe",
    year: "2026",
    type: "Full-stack platform",
    summary: "Link-in-bio builder with a live preview while you edit",
    stack: "TypeScript · ASP.NET Core",
    image: "/work/linkme.png",
    href: "https://github.com/prusotamkrydv78/LinkMe",
  },
  {
    title: "Native Ecommerce",
    year: "2025",
    type: "Mobile app",
    summary: "Customer app, admin panel and a .NET API with JWT auth",
    stack: "React Native · .NET",
    image: "/work/store.png",
    href: "https://github.com/prusotamkrydv78/Native_Eccomerce",
  },
  {
    title: "ChatX",
    year: "2024",
    type: "Real-time app",
    summary: "Messaging with WebSocket rooms and live presence",
    stack: "Next.js · Socket.IO",
    image: "/work/chatx.png",
    href: "https://chatx-ten.vercel.app",
    live: true,
  },
];

export const stack = [
  { group: "Frontend", items: "React 19, Next.js, TypeScript, Tailwind, GSAP" },
  { group: "Backend", items: "Node.js, Express, ASP.NET Core, C#, Socket.IO" },
  { group: "Data", items: "PostgreSQL, MongoDB" },
  { group: "Mobile", items: "React Native, Expo Router" },
  { group: "Desktop", items: "Rust, Tauri 2, Win32" },
];

export const journey = [
  { year: "2026", title: "Native and AI", body: "Rust for Notchy and a Tauri desk assistant. Shipped Sathi." },
  { year: "2025", title: ".NET and mobile", body: "C# and ASP.NET Core, then a React Native store on a .NET API." },
  { year: "2024", title: "Real-time", body: "Socket.IO messaging, a MERN Twitter clone, serverless APIs." },
  { year: "2023", title: "First line of JS", body: "Self-taught. React in three months, full-stack within a year." },
];
