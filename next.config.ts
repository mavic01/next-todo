import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* other config options here */
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
