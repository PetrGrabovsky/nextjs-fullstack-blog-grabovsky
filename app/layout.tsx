import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode, FC } from 'react';
import clsx from 'clsx';
import NextThemeProvider from '@/providers/next-theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';

// Inicializace fontu Inter, zpřístupněného jako CSS proměnná pro Tailwind (font-sans)
const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' });

const title = 'NextBlog – Full-Stack Next.js Blog';
const description =
  'Full-stack blog built with Next.js, React, Prisma, Auth.js and Vercel Blob. Create posts, ' +
  'browse categories, search and discuss.';

// Metadata pro aplikaci, titulky podstránek se doplňují podle šablony.
// Open Graph a Twitter karta dávají odkazu náhled na sociálních sítích (obrázek je app/opengraph-image.png).
export const metadata: Metadata = {
  metadataBase: new URL('https://nextjs-fullstack-blog-grabovsky.vercel.app'),
  title: {
    default: title,
    template: '%s | NextBlog',
  },
  description,
  openGraph: { type: 'website', siteName: 'NextBlog', url: '/', title, description },
  twitter: { card: 'summary_large_image', title, description },
};

// Rozhraní pro props komponenty RootLayout
interface RootLayoutProps {
  children: ReactNode; // Potomci, kteří budou obaleni layoutem
}

// Komponenta nastavuje strukturu HTML stránky a poskytuje kontextové providery
const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    // suppressHydrationWarning je nutný, protože next-themes nastavuje třídu na <html> před hydratací
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={clsx('flex min-h-screen flex-col font-sans antialiased')}>
        <NextThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
