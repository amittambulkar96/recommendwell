import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/*",
      },
      {
        protocol: "https",
        hostname: "ofnlrak1w9.ufs.sh",
        port: "",
        pathname: "/f/*",
      },
      {
        protocol: "https",
        hostname: "polar-public-files.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "startupfa.me",
      },
      {
        protocol: "https",
        hostname: "submitaitools.org",
      },
    ],
  },
};

export default nextConfig;
