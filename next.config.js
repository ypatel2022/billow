/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@tremor/react'],
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/steven-tey/precedent',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
