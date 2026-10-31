import { FC } from 'react';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import BlogList from '@/components/blog-list';
import { getLatestPosts } from '@/database/queries';
import { categories } from '@/utils/data-mappings';
import {
  buttonClasses,
  chipClasses,
  secondaryButtonClasses,
  sectionTitleClasses,
} from '@/utils/styles';

// Technologie zobrazené v úvodní sekci
const techStack = [
  'Next.js 16',
  'React 19',
  'Prisma 7',
  'Auth.js',
  'Vercel Blob',
  'Tailwind CSS 4',
];

/**
 * Úvodní stránka aplikace.
 * Zobrazuje představení aplikace, rychlé odkazy na kategorie a nejnovější příspěvky.
 */
const Home: FC = async () => {
  const latestPosts = await getLatestPosts(6);

  return (
    <>
      {/* Úvodní sekce s gradientovým pozadím */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 -top-40 -z-10 flex justify-center blur-3xl">
          <div className="aspect-[2/1] w-[60rem] bg-linear-to-tr from-primary-400 to-violet-400 opacity-25 dark:opacity-20" />
        </div>
        <div className="container py-20 text-center sm:py-28">
          <p className="mb-6 inline-flex items-center rounded-full border border-zinc-200 bg-white/60 px-4 py-1.5 text-sm font-medium text-zinc-600 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
            Full-stack demo built with Next.js 16
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-balance text-zinc-900 sm:text-6xl dark:text-white">
            Ideas worth{' '}
            <span className="bg-linear-to-r from-primary-600 to-violet-500 bg-clip-text text-transparent dark:from-primary-400 dark:to-violet-400">
              sharing
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-pretty text-zinc-600 dark:text-zinc-400">
            Sign in with GitHub or Google, write posts with images, browse them by category, search
            through them and join the discussion in the comments.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/blogs" className={`${buttonClasses} px-6 py-3 text-base`}>
              Explore all posts
              <HiArrowRight aria-hidden />
            </Link>
            <Link href="/create" className={`${secondaryButtonClasses} px-6 py-3 text-base`}>
              Write a post
            </Link>
          </div>
          {/* Použité technologie */}
          <ul className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-zinc-500 dark:text-zinc-500">
            {techStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Nejnovější příspěvky */}
      <section className="container pb-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className={sectionTitleClasses}>Latest posts</h2>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            View all
            <HiArrowRight aria-hidden />
          </Link>
        </div>
        <BlogList
          lists={latestPosts}
          emptyMessage="No posts yet. Be the first to write one!"
          emptyAction={
            <Link href="/create" className={buttonClasses}>
              Write the first post
            </Link>
          }
        />
        {/* Rychlé odkazy na kategorie */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          <span className="mr-1 text-sm font-medium text-zinc-500">Browse by category:</span>
          {categories.map(({ value, label }) => (
            <Link key={value} href={`/category/${value}`} className={chipClasses(false)}>
              {label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
