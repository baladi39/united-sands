import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate static HTML/CSS/JS files for shared hosting
  output: "export",

  // Optionally set a trailing slash for cleaner URLs on static hosts
  trailingSlash: true,

  images: {
    // Required for static export - disable Next.js image optimization
    unoptimized: true,
  },
};

export default nextConfig;
