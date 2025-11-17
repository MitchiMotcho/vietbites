import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        localPatterns: [
            { pathname: '/api/notion-file', search: '*' },
        ],
        unoptimized: true,
    },
};

export default nextConfig;
