/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'covers.openlibrary.org',
            port: '3000',
            pathname: '',
          },
        ],
        domains: ['covers.openlibrary.org'],
      },
};

module.exports = nextConfig;
