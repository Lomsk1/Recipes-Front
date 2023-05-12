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
  i18n: {
    locales: ["ka-GE"],
    defaultLocale: "ka-GE",
  },
};

module.exports = nextConfig;
