/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression for text assets
  compress: true,

  // Image optimization settings
  images: {
    formats: ['image/avif', 'image/webp'],
    // Optimize for editorial images: reasonable device widths and sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Security and performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig

if (process.env.NODE_ENV === 'development' && !process.env.JEST_WORKER_ID) {
  import('@opennextjs/cloudflare').then((m) => m.initOpenNextCloudflareForDev())
}
