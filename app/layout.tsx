import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode, FC } from 'react';
import clsx from 'clsx';
import NextThemeProvider from '@/providers/next-theme-provider';
import Header from '@/components/header';

// Inicializace fontu Inter
const inter = Inter({ subsets: ['latin', 'latin-ext'] });

// Metadata pro aplikaci, titulky podstránek se doplňují podle šablony
export const metadata: Metadata = {
  title: {
    default: 'NextBlog – Full-Stack Next.js Blog',
    template: '%s | NextBlog',
  },
  description:
    'Full-stack blog built with Next.js, React, Prisma, Auth.js and Vercel Blob. Create posts, ' +
    'browse categories, search and discuss.',
};

// Rozhraní pro props komponenty RootLayout
interface RootLayoutProps {
  children: ReactNode; // Potomci, kteří budou obaleni layoutem
}

// Komponenta nastavuje strukturu HTML stránky a poskytuje kontextové providery
const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    // suppressHydrationWarning je nutný, protože next-themes nastavuje třídu na <html> před hydratací
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, 'bg-white antialiased dark:bg-black')}>
        {/* Poskytovatel témat */}
        <NextThemeProvider>
          {/* Komponenta Header */}
          <Header />
          {/* Obsah stránky */}
          <main>{children}</main>
        </NextThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
