/** @type {import('next').NextConfig} */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = {
 async rewrites() {
   return [
     {
       source: '/api/:path*',
       destination: 'https://damentiadefenders-2s37kv2bua-uc.a.run.app/:path*/', // Proxy to Backend
     },
   ];
 },
};
const nextConfig = {}

module.exports = nextConfig
