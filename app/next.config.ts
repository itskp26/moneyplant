import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://google.com https://*.google.com https://*.googlesyndication.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
