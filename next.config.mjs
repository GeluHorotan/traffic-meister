/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "upload.wikimedia.org",
        protocol: "https",
      },
      {
        hostname: "static.vecteezy.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
