// ─────────────────────────────────────────────────────────────
// All portfolio content lives here. Replace the placeholder data
// with your own — no component needs to change.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Alex Mercer",
  shortName: "AM",
  role: "Software Engineer",
  focus: "Full-stack · Platform · Developer tooling",
  location: "Bengaluru, IN",
  timezone: "Asia/Kolkata",
  email: "hello@alexmercer.dev",
  available: true,
  availability: "Open to senior roles from Jan 2027",
  intro:
    "I build fast, dependable web products and the infrastructure behind them. Four years shipping TypeScript across startups and scale-ups, from the first commit to millions of requests a day.",
  resumeUrl: "#",
  socials: [
    { label: "GitHub", handle: "@alexmercer", href: "https://github.com/" },
    { label: "LinkedIn", handle: "in/alexmercer", href: "https://linkedin.com/" },
    { label: "X", handle: "@alexmercer_dev", href: "https://x.com/" },
    { label: "Read.cv", handle: "alexmercer", href: "https://read.cv/" },
  ],
};

export const stats = [
  { value: "4+", label: "Years shipping production code" },
  { value: "38", label: "Releases led end to end" },
  { value: "2.1M", label: "Monthly users on systems I own" },
  { value: "−62%", label: "Best p95 latency cut" },
];

export const about = {
  heading: "Engineer first, product-minded always.",
  paragraphs: [
    "I started out writing internal tools for a logistics company and got hooked on the moment software removes a whole category of busywork. Since then I've moved between product and platform teams, and I'm happiest where the two meet.",
    "Day to day that means designing APIs people enjoy using, making slow things fast, and leaving codebases easier to change than I found them. I care about observability, boring deploys, and docs that answer the next question.",
  ],
  principles: [
    { title: "Ship small, ship often", body: "Feature flags and tight PRs beat big-bang releases." },
    { title: "Measure before tuning", body: "Every performance fix starts with a trace, not a hunch." },
    { title: "Own the outcome", body: "From the RFC to the on-call page, it's my code." },
  ],
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  kind: string;
  summary: string;
  impact: string;
  stack: string[];
  href?: string;
  repo?: string;
  hue: number; // drives the generated cover art
};

export const projects: Project[] = [
  {
    slug: "relay",
    title: "Relay",
    year: "2026",
    kind: "Platform · Lead",
    summary:
      "Event-driven notification service replacing four legacy senders. Fan-out over Kafka with per-tenant rate limits and a replayable audit log.",
    impact: "40M events/day · 99.98% delivery",
    stack: ["Go", "Kafka", "PostgreSQL", "Kubernetes"],
    href: "#",
    hue: 24,
  },
  {
    slug: "ledgerline",
    title: "Ledgerline",
    year: "2025",
    kind: "Product · Full-stack",
    summary:
      "Real-time spend dashboard for finance teams. Streaming aggregates, a virtualised 100k-row table, and CSV exports that don't freeze the tab.",
    impact: "p95 load 3.4s → 1.3s",
    stack: ["Next.js", "TypeScript", "tRPC", "ClickHouse"],
    href: "#",
    hue: 160,
  },
  {
    slug: "shipyard",
    title: "Shipyard CLI",
    year: "2024",
    kind: "Open source · Author",
    summary:
      "Zero-config preview environments for monorepos. Detects changed packages, builds only what moved, and posts the URL to the PR.",
    impact: "2.3k GitHub stars",
    stack: ["Node.js", "Docker", "GitHub Actions"],
    repo: "#",
    hue: 210,
  },
  {
    slug: "atlas",
    title: "Atlas Design System",
    year: "2023",
    kind: "Frontend · Core team",
    summary:
      "Token-driven component library used by six product squads. Accessible primitives, visual regression tests, and a codemod for every breaking change.",
    impact: "60+ components · WCAG 2.2 AA",
    stack: ["React", "Radix", "Storybook", "Playwright"],
    href: "#",
    hue: 280,
  },
  {
    slug: "pulse",
    title: "Pulse",
    year: "2022",
    kind: "Side project",
    summary:
      "Self-hosted uptime monitor with a status page and incident timeline. Built to learn edge runtimes; now monitors 300+ endpoints for friends.",
    impact: "300+ endpoints monitored",
    stack: ["SvelteKit", "Cloudflare Workers", "D1"],
    repo: "#",
    hue: 340,
  },
];

export const experience = [
  {
    company: "Northwind Labs",
    role: "Senior Software Engineer",
    period: "2025 — Now",
    location: "Remote",
    points: [
      "Lead a team of 4 on the messaging platform; designed Relay and migrated 100% of traffic with zero downtime.",
      "Introduced OpenTelemetry tracing across 22 services, cutting mean time to resolution by half.",
    ],
    stack: ["Go", "TypeScript", "Kafka", "AWS"],
  },
  {
    company: "Finch",
    role: "Software Engineer II",
    period: "2023 — 2025",
    location: "Bengaluru",
    points: [
      "Owned the analytics dashboard used by 1,200 business customers; rebuilt data layer on ClickHouse.",
      "Mentored 3 junior engineers and ran the frontend guild's monthly review.",
    ],
    stack: ["Next.js", "tRPC", "ClickHouse"],
  },
  {
    company: "Cartwheel",
    role: "Software Engineer",
    period: "2022 — 2023",
    location: "Pune",
    points: [
      "Shipped the merchant onboarding flow, lifting completion from 41% to 68%.",
      "Built the shared component library that later became the Atlas design system.",
    ],
    stack: ["React", "Node.js", "PostgreSQL"],
  },
  {
    company: "Freightly",
    role: "Junior Developer",
    period: "2021 — 2022",
    location: "Pune",
    points: ["Automated dispatch scheduling for 80 warehouses, saving ~30 ops hours a week."],
    stack: ["Python", "Django", "Vue"],
  },
];

export const stack = [
  { group: "Languages", items: ["TypeScript", "Go", "Python", "SQL", "Rust (learning)"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Motion", "Storybook"] },
  { group: "Backend", items: ["Node.js", "tRPC", "gRPC", "PostgreSQL", "Redis", "Kafka"] },
  { group: "Infra", items: ["AWS", "Kubernetes", "Terraform", "Docker", "GitHub Actions"] },
  { group: "Quality", items: ["Vitest", "Playwright", "OpenTelemetry", "Grafana"] },
];

export const writing = [
  { title: "Migrating 40M events a day without a maintenance window", date: "Sep 2026", read: "9 min", href: "#" },
  { title: "Your p95 is lying: practical latency budgets", date: "Mar 2026", read: "6 min", href: "#" },
  { title: "Codemods are the best documentation you'll ever write", date: "Nov 2025", read: "5 min", href: "#" },
];

export const nav = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];
