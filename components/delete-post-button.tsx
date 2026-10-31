'use client';

import { FC, useState, useTransition } from 'react';
import clsx from 'clsx';
import { HiOutlineTrash } from 'react-icons/hi';
import { deletePost } from '@/utils/actions';
import { iconButtonClasses } from '@/utils/styles';

// Rozhraní pro props komponenty DeletePostButton
interface DeletePostButtonProps {
  postId: number; // ID příspěvku, který se má smazat
  redirectToList?: boolean; // Přesměrování na seznam příspěvků po smazání (z detailu příspěvku)
  className?: string; // Volitelné TailwindCSS třídy
}

/**
 * Tlačítko pro smazání příspěvku s potvrzením přímo v rozhraní (bez blokujícího dialogu).
 * Oprávnění se ověřuje v server action, tlačítko se zobrazuje pouze autorovi příspěvku.
 * Přesměrování po smazání provádí server action, takže se nezobrazí mezistav se stránkou 404.
 */
const DeletePostButton: FC<DeletePostButtonProps> = ({
  postId,
  redirectToList = false,
  className,
}) => {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () =>
    startTransition(async () => {
      const result = await deletePost(postId, redirectToList);

      // Při přesměrování ze serveru akce nevrací výsledek
      if (result && !result.success) {
        setError(result.message ?? 'Failed to delete the post.');
        setConfirming(false);
      }
    });

  // Potvrzovací stav: tlačítka Delete a Cancel
  if (confirming) {
    return (
      <div className={clsx('flex items-center gap-1 text-sm', className)}>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-lg bg-red-600 px-3 py-1.5 font-semibold text-white transition hover:bg-red-500 disabled:opacity-60"
        >
          {isPending ? 'Deleting...' : 'Delete'}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={isPending}
          className="rounded-lg px-3 py-1.5 font-medium text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      {error && (
        <span role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </span>
      )}
      <button
        type="button"
        onClick={() => setConfirming(true)}
        aria-label="Delete post"
        title="Delete post"
        className={clsx(iconButtonClasses, 'hover:text-red-600 dark:hover:text-red-400')}
      >
        <HiOutlineTrash size={18} />
      </button>
    </div>
  );
};

export default DeletePostButton;
