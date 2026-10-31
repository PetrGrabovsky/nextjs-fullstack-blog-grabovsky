import 'server-only';
import { cache } from 'react';
import { cacheLife, cacheTag } from 'next/cache';
import { auth } from '@/auth';
import prisma from '@/database/prisma';

/**
 * Serverové dotazy do databáze a načtení session.
 * Veřejná data (příspěvky, komentáře) jsou cachovaná přes 'use cache' a označená tagy.
 * Stránky se díky tomu předrenderují a čtení nečeká na databázi. Po změně dat server
 * actions cache cíleně obnoví přes updateTag (viz utils/actions.ts).
 */

// Tag pro všechny seznamy příspěvků
export const POSTS_TAG = 'posts';

// Tag pro detail jednoho příspěvku včetně komentářů
export const postTag = (id: number) => `post:${id}`;

// Session přihlášeného uživatele (čte cookies, proto se volá pouze uvnitř <Suspense>)
export const getSession = cache(() => auth());

// Řazení seznamů od nejnovějšího příspěvku
const newestFirst = { createdAt: 'desc' } as const;

// Všechny příspěvky
export const getAllPosts = async () => {
  'use cache';
  cacheLife('max');
  cacheTag(POSTS_TAG);

  return prisma.post.findMany({ orderBy: newestFirst });
};

// Nejnovější příspěvky pro úvodní stránku
export const getLatestPosts = async (take: number) => {
  'use cache';
  cacheLife('max');
  cacheTag(POSTS_TAG);

  return prisma.post.findMany({ orderBy: newestFirst, take });
};

// Příspěvky v dané kategorii
export const getPostsByCategory = async (category: string) => {
  'use cache';
  cacheLife('max');
  cacheTag(POSTS_TAG);

  return prisma.post.findMany({ where: { category }, orderBy: newestFirst });
};

// Detail příspěvku včetně komentářů
export const getPostById = async (id: number) => {
  'use cache';
  cacheLife('max');
  cacheTag(POSTS_TAG, postTag(id));

  return prisma.post.findUnique({
    where: { id },
    include: { comments: { orderBy: { createdAt: 'asc' } } },
  });
};

// Vyhledání příspěvků podle titulku nebo obsahu bez ohledu na velikost písmen
export const searchPosts = async (query: string) => {
  'use cache';
  cacheLife('hours');
  cacheTag(POSTS_TAG);

  return prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: newestFirst,
  });
};
