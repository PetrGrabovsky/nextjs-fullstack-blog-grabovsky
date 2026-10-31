import { FC } from 'react';
import Link from 'next/link';
import { buttonClasses } from '@/utils/styles';

// Stránka zobrazená pro neexistující cestu, příspěvek nebo kategorii
const NotFound: FC = () => (
  <section className="container flex flex-col items-center py-24 text-center sm:py-32">
    <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">404</p>
    <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
      Page not found
    </h1>
    <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
      Sorry, we couldn&apos;t find the page you&apos;re looking for.
    </p>
    <Link href="/blogs" className={`${buttonClasses} mt-10`}>
      Back to all posts
    </Link>
  </section>
);

export default NotFound;
