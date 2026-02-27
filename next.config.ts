import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "app")],
    additionalData: `@use "styles/variables" as *;`,
  },
};

export default nextConfig;
