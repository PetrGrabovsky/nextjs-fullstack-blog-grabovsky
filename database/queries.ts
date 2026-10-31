import 'server-only';
import { cache } from 'react';
import { auth } from '@/auth';
import prisma from '@/database/prisma';

/**
 * Serverové dotazy do databáze a načtení session.
 * Server komponenty volají Prismu přímo, takže není potřeba HTTP požadavek na vlastní API.
 * Funkce obalené v cache() se v rámci jednoho požadavku provedou pouze jednou.
 */

// Session přihlášeného uživatele, sdílená hlavičkou, seznamy i stránkami během jednoho požadavku
export const getSession = cache(() => auth());

// Řazení seznamů od nejnovějšího příspěvku
const newestFirst = { createdAt: 'desc' } as const;

// Všechny příspěvky
export const getAllPosts = () => prisma.post.findMany({ orderBy: newestFirst });

// Nejnovější příspěvky pro úvodní stránku
export const getLatestPosts = (take: number) =>
  prisma.post.findMany({ orderBy: newestFirst, take });

// Příspěvky v dané kategorii
export const getPostsByCategory = (category: string) =>
  prisma.post.findMany({ where: { category }, orderBy: newestFirst });

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
    orderBy: newestFirst,
  });
