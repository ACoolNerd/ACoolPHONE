import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable React Server Components (default in Next.js 15)
  },
  // Support multi-tenant routing via hostname
  async rewrites() {
    return [];
  },
};

export default nextConfig;
