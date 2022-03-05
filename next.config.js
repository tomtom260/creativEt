/** @type {import('next').NextConfig} */
const withImages = require('next-images')

module.exports = withImages({
  webpack(config, options) {
    return config
  }
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["tailwindui.com", "images.unsplash.com", "lh3.googleusercontent.com"]
  }
}

module.exports = nextConfig
