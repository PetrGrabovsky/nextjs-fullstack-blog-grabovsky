import type { Metadata } from 'next';
import { FC } from 'react';
import { redirect } from 'next/navigation';
import CreatePostForm from '@/components/create-post-form';
import PageSection from '@/components/page-section';
import { getSession } from '@/database/queries';
import { cardClasses } from '@/utils/styles';

export const metadata: Metadata = { title: 'Write a Post' };

/**
 * Stránka Create s formulářem pro vytvoření nového blogového příspěvku.
 * Nepřihlášený uživatel je přesměrován na přihlášení a po něm se vrátí zpět.
 */
const Create: FC = async () => {
  const session = await getSession();
  if (!session?.user) redirect('/login?callbackUrl=/create');

  return (
    <PageSection
      title="Write a post"
      description="Share your ideas with the community."
      className="max-w-3xl"
    >
      <div className={cardClasses}>
        <CreatePostForm />
      </div>
    </PageSection>
  );
};

export default Create;
