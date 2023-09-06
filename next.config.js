/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    API: 'http://59.152.61.146:6200',
    REDEPLOY:'https://api.netlify.com/build_hooks/64f85358b4095765f4a11608'
  }
}

module.exports = nextConfig
