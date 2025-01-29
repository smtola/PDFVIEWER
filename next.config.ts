import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        turbo: {
            resolveAlias: {
                canvas: './empty-module.ts', // Map 'canvas' to an empty module
            },
        },
    },
};

export default nextConfig;
