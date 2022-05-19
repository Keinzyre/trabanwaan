/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@mui/material"]);
/* const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.pexels.com"],
  },
}; */

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["images.pexels.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{loader:"@svgr/webpack", options: { icon: true }}],
    });

    return config;
  },
});
