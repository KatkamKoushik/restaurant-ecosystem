import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@restaurant-ecosystem/ui",
    "@restaurant-ecosystem/utils",
    "@restaurant-ecosystem/config",
  ],
};

export default nextConfig;
