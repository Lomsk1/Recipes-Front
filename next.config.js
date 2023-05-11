/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "http",
  //       hostname: "http://localhost:3000",
  //       port: "",
  //       // pathname: "/user-profile/**",
  //     },
  //   ],
  // },
  images: {
    domains: ["localhost", "127.0.0.1"],
  },
};

module.exports = nextConfig;
