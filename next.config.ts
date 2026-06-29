import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gutenberg.org',
      },
      {
        protocol: 'http',
        hostname: 'www.gutenberg.org',
      },
      {
        protocol: 'https',
        hostname: 'gutenberg.org',
      },
      {
        protocol: 'http',
        hostname: 'gutenberg.org',
      },
    ],
  },
allowedDevOrigins:  ["http://localhost:3000"],
 
};

export default nextConfig;
