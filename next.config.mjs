import { IMAGE_HOSTS } from "./constants/imageHosts.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: IMAGE_HOSTS.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

export default nextConfig;
