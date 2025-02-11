/** @type {import('next').NextConfig} */
// next.config.js
const { withContentlayer } = require("next-contentlayer");

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  distDir: ".next",
  poweredByHeader: false,
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.worker\.(js|ts)$/,
      use: { loader: "worker-loader" },
    });
    if (!dev) {
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "static/fonts/[name].[hash].[ext]",
            publicPath: "/_next",
          },
        },
      });
    }
    return config;
  },
  generateBuildId: () => "build",
  experimental: {
    // optimizeFonts: true,
    // fontLoaders: [{ loader: "@next/font/google", options: { subsets: ["latin"] } }],
    outputFileTracingRoot: path.join(__dirname),
  },
  compress: true,
  optimizeFonts: true,
  images: {
    domains: ["localhost"],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "" : undefined,
};

module.exports = withContentlayer(nextConfig);
