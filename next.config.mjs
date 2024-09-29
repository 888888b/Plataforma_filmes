/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'image.tmdb.org',
            pathname: '/**',
            port: ''
        }],
        unoptimized: true
    }
};

export default nextConfig;
