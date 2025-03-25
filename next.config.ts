import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd1srg693km73d7.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;
