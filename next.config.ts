import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export to ./out, served by Cloudflare Pages.
  output: "export",
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
