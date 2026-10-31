import { FC, Suspense } from 'react';
import Link from 'next/link';
import { getSession } from '@/database/queries';
import { buttonClasses } from '@/utils/styles';
import CommentForm from './comment-form';

// Rozhraní pro props komponenty CommentComposer
interface CommentComposerProps {
  postId: number; // ID příspěvku, ke kterému se komentář přidává
}

// Vnitřní část čtoucí session: formulář pro přihlášeného, jinak výzva k přihlášení
const CommentComposerContent: FC<CommentComposerProps> = async ({ postId }) => {
  if ((await getSession())?.user) return <CommentForm postId={postId} />;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-zinc-50 p-6 dark:bg-zinc-900">
      <p className="text-zinc-600 dark:text-zinc-400">Log in to join the discussion.</p>
      <Link href={`/login?callbackUrl=/blogs/${postId}`} className={buttonClasses}>
        Login
      </Link>
    </div>
  );
};

/**
 * Formulář pro přidání komentáře, nebo výzva k přihlášení.
 * Session se čte v <Suspense>, takže zbytek detailu příspěvku zůstává předrenderovaný.
 */
const CommentComposer: FC<CommentComposerProps> = ({ postId }) => (
  <Suspense
    fallback={<div className="h-[88px] animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />}
  >
    <CommentComposerContent postId={postId} />
  </Suspense>
);

export default CommentComposer;
