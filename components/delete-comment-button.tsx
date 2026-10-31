'use client';

import { FC, useTransition } from 'react';
import { FaTrash } from 'react-icons/fa';
import { deleteComment } from '@/utils/actions';

// Tlačítko pro smazání komentáře (zobrazuje se autorovi komentáře a autorovi příspěvku)
const DeleteCommentButton: FC<{ commentId: number }> = ({ commentId }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => deleteComment(commentId))}
      disabled={isPending}
      aria-label="Delete comment"
      title="Delete comment"
      className="text-body-color transition hover:text-red-500 disabled:opacity-50"
    >
      <FaTrash size={14} />
    </button>
  );
};

export default DeleteCommentButton;
