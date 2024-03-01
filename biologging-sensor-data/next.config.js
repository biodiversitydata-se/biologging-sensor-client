/** @type {import('next').NextConfig} */
const isTest = process.env.NEXT_PUBLIC_NODE_ENV === 'test'

const nextConfig = {
    reactStrictMode: false,
    assetPrefix: isTest ? 'http://canmove-dev.ekol.lu.se/biologging-client-dev/' : undefined,
}

module.exports = nextConfig
