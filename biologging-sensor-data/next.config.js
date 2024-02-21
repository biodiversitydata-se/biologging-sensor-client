/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'PROD'

const nextConfig = {
    reactStrictMode: false,
    assetPrefix: isProd ? 'http://canmove-dev.ekol.lu.se/biologging-client-dev/' : undefined,
}

module.exports = nextConfig
