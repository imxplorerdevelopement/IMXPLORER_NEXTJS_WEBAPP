import type { NextConfig } from "next";

import path from "node:path";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.36"],
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
