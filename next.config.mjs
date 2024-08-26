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
      {
        // Povolení obrázků z Google (např. Google Photos nebo Google Profile Images)
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
