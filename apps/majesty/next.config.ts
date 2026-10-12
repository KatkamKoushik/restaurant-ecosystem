import type { NextConfig } from "next";

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
};

export default nextConfig;
