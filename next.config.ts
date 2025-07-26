import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  // The PWA is now disabled in development by checking the environment
  disable: !isProduction,
});

const nextConfig: NextConfig = {
  // Your existing Next.js config goes here
};

// Only wrap the config with the PWA plugin when in production
export default isProduction ? withPWA(nextConfig) : nextConfig;
