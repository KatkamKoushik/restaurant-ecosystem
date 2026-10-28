import type { NextConfig } from "next";
import { productionSecurityHeaders } from "@restaurant-ecosystem/config";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@restaurant-ecosystem/ui",
    "@restaurant-ecosystem/utils",
    "@restaurant-ecosystem/config",
  ],
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
