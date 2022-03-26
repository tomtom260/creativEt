/** @type {import('next').NextConfig} */
const withImages = require('next-images')

module.exports = withImages({
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
        stream: false,
        crypto: false,
        net: false,
        tls: false,
        http: false,
        https: false,
        querystring: false,
        path: false,
        zlib: false,
      };
    }
  }
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["tailwindui.com", "images.unsplash.com", "lh3.googleusercontent.com", "localhost", "res.cloudinary.com"]
  }
}

module.exports = nextConfig
