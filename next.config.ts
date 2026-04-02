import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns:[{
      protocol:"https",
      hostname:"pathshalaa.t3.tigrisfiles.io",
      port:'',
    }]
  },
};

export default nextConfig;
