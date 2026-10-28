import type { NextConfig } from "next";
import { productionSecurityHeaders } from "@restaurant-ecosystem/config";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@restaurant-ecosystem/ui",
    "@restaurant-ecosystem/utils",
    "@restaurant-ecosystem/config",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: productionSecurityHeaders,
      },
    ];
  },
};

export default nextConfig;
