import type { NextConfig } from "next";
import path from "path";

const sassVariablesPath = path
  .join(process.cwd(), "app/styles/_variables.scss")
  .replaceAll("\\", "/");

const nextConfig: NextConfig = {
  transpilePackages: ["next-sanity", "sanity", "@sanity/vision"],
  sassOptions: {
    additionalData: `@use "${sassVariablesPath}" as *;`,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
