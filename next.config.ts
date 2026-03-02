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
};

export default nextConfig;
