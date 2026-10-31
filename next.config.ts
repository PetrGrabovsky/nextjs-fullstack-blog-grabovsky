import type { NextConfig } from 'next';

// Konfigurace pro Next.js aplikaci
const nextConfig: NextConfig = {
  images: {
    // Definice povolených vzdálených zdrojů obrázků
    remotePatterns: [
      // Obrázky příspěvků z Vercel Blob
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      // Avatary uživatelů z GitHubu
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      // Avatary uživatelů z Google účtu
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  experimental: {
    serverActions: {
      // Navýšení limitu těla server action kvůli nahrávání obrázků (max. 4 MB + data formuláře)
      bodySizeLimit: '4.5mb',
    },
  },
};

export default nextConfig;
