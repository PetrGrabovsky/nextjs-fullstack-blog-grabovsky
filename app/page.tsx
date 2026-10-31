import { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import BlogList from '@/components/blog-list';
import { getLatestPosts } from '@/database/queries';
import { buttonClasses, headingH2Classes } from '@/utils/styles';

/**
 * Komponenta Home.
 * Tato komponenta představuje hlavní stránku aplikace, je to první stránka, kterou
 * uživatel uvidí. Zobrazuje nadpis, popis aplikace, tlačítka pro přesměrování
 * a tři nejnovější příspěvky.
 */
const Home: FC = async () => {
  const latestPosts = await getLatestPosts(3);

  return (
    <>
      {/* Hlavní sekce stránky */}
      <section
        className={clsx(
          'relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px]',
          'xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]'
        )}
      >
        <div className="container">
          <div className="mx-auto max-w-[800px] text-center">
            {/* Nadpis stránky */}
            <h1
              className={clsx(
                'mb-5 text-3xl leading-tight font-bold text-black sm:text-4xl sm:leading-tight',
                'md:text-5xl md:leading-tight dark:text-white'
              )}
            >
              Full-Stack Blog Built with Next.js
            </h1>
            {/* Popis webové aplikace */}
            <p
              className={clsx(
                'mb-12 text-base leading-relaxed! font-medium text-body-color sm:text-lg',
                'md:text-xl dark:text-white dark:opacity-90'
              )}
            >
              Sign in with GitHub or Google, write blog posts with images, browse them by category,
              search through them and discuss in the comments. Built with Next.js, React, Prisma,
              Auth.js, Vercel Blob and Tailwind CSS.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Tlačítka pro přesměrování na stránku s blogy a na vytvoření příspěvku */}
            <Link href="/blogs" className={buttonClasses}>
              Explore All Blogs
            </Link>
            <Link
              href="/create"
              className={clsx(
                buttonClasses,
                'bg-black/10! text-black! dark:bg-white/10! dark:text-white!'
              )}
            >
              Write a Post
            </Link>
          </div>
        </div>
      </section>
      {/* Sekce s nejnovějšími příspěvky */}
      {latestPosts.length > 0 && (
        <section className="pb-[120px]">
          <div className="container">
            <h2 className={headingH2Classes}>Latest Posts</h2>
            <BlogList lists={latestPosts} />
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
