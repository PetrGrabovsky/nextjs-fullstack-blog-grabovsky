import 'server-only';
import { cache } from 'react';
import prisma from '@/database/prisma';

/**
 * Serverové dotazy do databáze.
 * Server komponenty volají Prismu přímo, takže není potřeba HTTP požadavek na vlastní API.
 */

// Všechny příspěvky seřazené od nejnovějšího
export const getAllPosts = () => prisma.post.findMany({ orderBy: { createdAt: 'desc' } });

// Nejnovější příspěvky pro úvodní stránku
export const getLatestPosts = (take: number) =>
  prisma.post.findMany({ orderBy: { createdAt: 'desc' }, take });

// Příspěvky v dané kategorii seřazené od nejnovějšího
export const getPostsByCategory = (category: string) =>
  prisma.post.findMany({ where: { category }, orderBy: { createdAt: 'desc' } });

/**
 * Detail příspěvku včetně komentářů.
 * Funkce je obalená v cache, aby se příspěvek nenačítal dvakrát (generateMetadata + stránka).
 */
export const getPostById = cache((id: number) =>
  prisma.post.findUnique({
    where: { id },
    include: { comments: { orderBy: { createdAt: 'asc' } } },
  })
);

// Vyhledání příspěvků podle titulku nebo obsahu bez ohledu na velikost písmen
export const searchPosts = (query: string) =>
  prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });
