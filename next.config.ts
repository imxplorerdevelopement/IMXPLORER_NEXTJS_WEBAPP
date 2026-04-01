import type { NextConfig } from "next";

const path = require("node:path");

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
