'use client';

import { FC, useTransition } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';
import { deletePost } from '@/utils/actions';

// Rozhraní pro props komponenty DeletePostButton
interface DeletePostButtonProps {
  postId: number; // ID příspěvku, který se má smazat
  redirectTo?: string; // Volitelná cesta, kam přesměrovat po smazání (např. z detailu)
  className?: string; // Volitelné TailwindCSS třídy
}

/**
 * Tlačítko pro smazání příspěvku.
 * Oprávnění se ověřuje v server action, tlačítko se zobrazuje pouze autorovi příspěvku.
 */
const DeletePostButton: FC<DeletePostButtonProps> = ({ postId, redirectTo, className }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () =>
    startTransition(async () => {
      const result = await deletePost(postId);
      if (result.success && redirectTo) router.push(redirectTo);
    });

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Delete post"
      title="Delete post"
      className={clsx(
        'text-body-color transition hover:text-red-500 disabled:opacity-50',
        isPending && 'animate-pulse',
        className
      )}
    >
      <FaTrash size={22} />
    </button>
  );
};

export default DeletePostButton;
