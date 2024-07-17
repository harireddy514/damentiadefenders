/** @type {import('next').NextConfig} */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = {
 async rewrites() {
   return [
     {
       source: '/api/:path*',
       destination: 'https://damentiadefenders-api-3aisuckcia-uc.a.run.app/:path*', // Proxy to Backend
     },
   ];
 },
};
const nextConfig = {}

module.exports = nextConfig
