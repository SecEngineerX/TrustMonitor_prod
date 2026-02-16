/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // SEO & Performance
  poweredByHeader: false,
  
  // Image optimization disabled (no images used)
  images: {
    unoptimized: true,
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/privacy',
        destination: '/#waitlist',
        permanent: false,
      },
      {
        source: '/security',
        destination: '/#waitlist',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
