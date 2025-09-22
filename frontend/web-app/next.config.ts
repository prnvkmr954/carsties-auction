import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 logging: {
  fetches: {
    fullUrl: true
  }
 },
 images:{
  remotePatterns: [
    {protocol: 'https', hostname: 'cdn.pixabay.com', pathname: '/**'}
  ]
 }
};

export default nextConfig;
