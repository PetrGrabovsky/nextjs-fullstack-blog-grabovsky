/** @type {import('next').NextConfig} */

// Konfigurace pro Next.js aplikaci
const nextConfig = {
  images: {
    // Definice povolených vzdálených zdrojů obrázků
    remotePatterns: [
      {
        // Povolení obrázků z Firebase Storage
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        // Povolení obrázků z GitHub Avatars
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
