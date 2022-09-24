/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lens.infura-ipfs.io", "w3s.link"],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
