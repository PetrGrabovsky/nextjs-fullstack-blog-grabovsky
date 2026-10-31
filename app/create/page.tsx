import type { Metadata } from 'next';
import { FC, Suspense } from 'react';
import { redirect } from 'next/navigation';
import CreatePostForm from '@/components/create-post-form';
import PageSection from '@/components/page-section';
import { getSession } from '@/database/queries';
import { cardClasses } from '@/utils/styles';

export const metadata: Metadata = { title: 'Write a Post' };

// Formulář pro přihlášeného uživatele, nepřihlášený je přesměrován na přihlášení a zpět
const CreatePostGate: FC = async () => {
  const session = await getSession();
  if (!session?.user) redirect('/login?callbackUrl=/create');

  return <CreatePostForm />;
};

/**
 * Stránka Create s formulářem pro vytvoření nového blogového příspěvku.
 * Rozvržení je předrenderované, formulář se zobrazí po ověření session.
 */
const Create: FC = () => (
  <PageSection
    title="Write a post"
    description="Share your ideas with the community."
    className="max-w-3xl"
  >
    <div className={cardClasses}>
      <Suspense
        fallback={
          <div className="h-[640px] animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
        }
      >
        <CreatePostGate />
      </Suspense>
    </div>
  </PageSection>
);

export default Create;
