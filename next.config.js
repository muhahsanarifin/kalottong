/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_CLOUDINARY_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_CLOUDINARY_HOSTNAME,
        port: process.env.NEXT_PUBLIC_CLOUDINARY_PORT,
        pathname: process.env.NEXT_PUBLIC_CLOUDINARY_PATHNAME,
      },
    ],
  },
};

module.exports = nextConfig;
