/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: 'https://anheu-code-generator.azurewebsites.net/:path*', // Reemplaza con la URL de tu API
            },
        ];
    }
};

export default nextConfig;
