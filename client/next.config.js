/** @type {import('next').NextConfig} */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = {
 async rewrites() {
   return [
     {
       source: '/api/:path*',
       destination: 'http://localhost:3001/:path*', // Proxy to Backend
     },
   ];
 },
};
const nextConfig = {}

module.exports = nextConfig
