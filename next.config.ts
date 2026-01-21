import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep as a server/edge app (no static export) so API routes keep working
  trailingSlash: true,

  images: {
    // Disable Next.js image optimization because we use static assets
    unoptimized: true,
  },
};

export default nextConfig;
