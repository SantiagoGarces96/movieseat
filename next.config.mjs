/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com", hostname: 'm.media-amazon.com' },
    ],
  },
};

export default nextConfig;
