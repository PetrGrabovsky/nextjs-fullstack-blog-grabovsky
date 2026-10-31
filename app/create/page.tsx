import type { Metadata } from 'next';
import { FC } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import CreatePostForm from '@/components/create-post-form';
import { panelClasses } from '@/utils/styles';

export const metadata: Metadata = { title: 'Create Post' };

/**
 * Stránka Create s formulářem pro vytvoření nového blogového příspěvku.
 * Nepřihlášený uživatel je přesměrován na přihlášení a po něm se vrátí zpět.
 */
const Create: FC = async () => {
  const session = await auth();
  if (!session?.user) redirect('/login?callbackUrl=/create');

  return (
    <section className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container pt-[60px]">
        <div className={panelClasses}>
          {/* Nadpis formuláře */}
          <h1 className="mb-8 text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl dark:text-white">
            Create Your Own Blog Post
          </h1>
          <CreatePostForm />
        </div>
      </div>
    </section>
  );
};

export default Create;
