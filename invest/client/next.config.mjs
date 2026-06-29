/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only apply turbopack root override if we are in development
  ...(process.env.NODE_ENV === 'development' && {
    turbopack: {
      root: 'D:\\Desktop\\invest\\invest',
    },
  }),
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
