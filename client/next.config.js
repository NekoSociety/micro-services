/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.resolve.fallback = { fs: false }
    // config.watchOptions = { poll: 300 }
    // config.experiments = {
    //   buildHttp: {
    //     allowedUris: ['https://cdn.skypack.dev'],
    //   },
    //   layers: true,
    // }
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: ['@svgr/webpack'],
    })
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/join',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
