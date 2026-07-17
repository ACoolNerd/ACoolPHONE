import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  // Support multi-tenant routing via hostname
  async rewrites() {
    return [];
  },
};

export default nextConfig;
