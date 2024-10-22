/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "archivos-cms.cinecolombia.com" },
      { protocol: "https", hostname: "image.tmdb.org" },
      { protocol: "https", hostname: "media.airedesantafe.com.ar" },
      { protocol: "https", hostname: "decoratel.com" },
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "assets.cinemark-core.com" },

    ],
  },
};

export default nextConfig;
