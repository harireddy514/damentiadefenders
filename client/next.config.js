/** @type {import('next').NextConfig} */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = {
 async rewrites() {
   return [
     {
       source: '/api/:path*',
       destination: 'https://localhost:8080/:path*/', // Proxy to Backend
     },
   ];
 },
};
const nextConfig = {}

module.exports = nextConfig
