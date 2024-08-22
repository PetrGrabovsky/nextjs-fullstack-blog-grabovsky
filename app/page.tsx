'use client';

import { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

/**
 * Komponenta Home.
 * Tato komponenta představuje hlavní stránku aplikace, je to první stránka, kterou
 * uživatel uvidí. Zobrazuje nadpis, popis aplikace a tlačítko pro přesměrování
 * na stránku s blogy.
 */
const Home: FC = () => {
  return (
    // Hlavní sekce stránky
    <section
      className={clsx(
        'relative z-10 overflow-hidden pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pt-[180px]',
        'xl:pb-[160px] 2xl:pb-[200px] 2xl:pt-[210px]'
      )}
    >
      {/* Kontejner pro obsah stránky */}
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[800px] text-center">
              {/* Nadpis stránky */}
              <h1
                className={clsx(
                  'mb-5 text-3xl font-bold leading-tight text-black dark:text-white',
                  'sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight'
                )}
              >
                Free Next.js Full-Stack Website Using Prisma
              </h1>
              {/* Popis webové aplikace */}
              <p
                className={clsx(
                  'mb-12 text-base font-medium !leading-relaxed text-body-color',
                  'dark:text-white dark:opacity-90 sm:text-lg md:text-xl'
                )}
              >
                This is a Free Next.js full stack template that you can use to create Blogs based on
                diffrent category and also you can chat with others. This website is full of
                functionalities.
              </p>
            </div>
            <div
              className={clsx(
                'flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4',
                'sm:space-y-0'
              )}
            >
              {/* Tlačítko pro přesměrování na stránku s blogy */}
              <Link
                href={'/blogs'}
                className={clsx(
                  'rounded-md bg-primary px-8 py-4 text-base font-semibold text-white',
                  'hover:bg-primary/80'
                )}
              >
                Explore All Blogs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
