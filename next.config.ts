import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // This tells Vercel to ignore strict type errors and build anyway
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;