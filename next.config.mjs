import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactCompiler: true,
    images: {
        qualities: [75, 100],
    },
    turbopack: {
        root: fileURLToPath(new URL('.', import.meta.url)),
    },
};

export default nextConfig;
