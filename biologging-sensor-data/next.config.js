/** @type {import('next').NextConfig} */
const isTest = process.env.NEXT_PUBLIC_NODE_ENV === 'test' // check if environment is test

const nextConfig = {
    reactStrictMode: true, // react setting stuff
    images: {
        domains: [
            'canmove-app.ekol.lu.se',
        ],
    },    
    assetPrefix: isTest ? 'http://canmove-dev.ekol.lu.se/biologging-client-dev/' : undefined, // ensures css assets are fetched with correct URL
}

module.exports = nextConfig
