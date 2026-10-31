'use client';

import { FC, useState, useTransition } from 'react';
import clsx from 'clsx';
import { HiOutlineTrash } from 'react-icons/hi';
import { deleteComment } from '@/utils/actions';
import { iconButtonClasses } from '@/utils/styles';

// Tlačítko pro smazání komentáře (zobrazuje se autorovi komentáře a autorovi příspěvku)
const DeleteCommentButton: FC<{ commentId: number }> = ({ commentId }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () =>
    startTransition(async () => {
      const result = await deleteComment(commentId);
      setError(result.success ? null : (result.message ?? 'Failed to delete the comment.'));
    });

  return (
    <div className="flex items-center gap-2">
      {error && (
        <span role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </span>
      )}
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        aria-label="Delete comment"
        title="Delete comment"
        className={clsx(iconButtonClasses, 'h-8 w-8 hover:text-red-600 dark:hover:text-red-400')}
      >
        <HiOutlineTrash size={16} />
      </button>
    </div>
  );
};

export default DeleteCommentButton;
