/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com', 'i.scdn.co'],
        formats: ['image/avif', 'image/webp'],
    },
    experimental: {
        optimizeCss: false,
    },
}

module.exports = nextConfig
