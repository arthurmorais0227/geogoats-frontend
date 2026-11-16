import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactCompiler: true,
    images: {
        qualities: [75, 100],
        // fotos dos participantes vêm do GitHub
        remotePatterns: [
            new URL('https://avatars.githubusercontent.com/**'),
        ],
    },
    turbopack: {
        root: fileURLToPath(new URL('.', import.meta.url)),
    },
};

export default nextConfig;
