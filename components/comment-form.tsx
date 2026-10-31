'use client';

import { FC, FormEvent, startTransition, useActionState } from 'react';
import { addComment } from '@/utils/actions';
import { errorClasses, inputClasses } from '@/utils/styles';
import { CommentFormState } from '@/utils/types';
import Button from './button';

// Rozhraní pro props komponenty CommentForm
interface CommentFormProps {
  postId: number; // ID příspěvku, ke kterému se komentář přidává
}

/**
 * Formulář pro přidání komentáře.
 * Odesílá se přes onSubmit, aby React formulář automaticky nevymazal i při chybě
 * a uživatel nepřišel o napsaný text. Po úspěšném uložení se pole vyprázdní tím,
 * že dostane nový klíč (submissionId) a vykreslí se znovu.
 */
const CommentForm: FC<CommentFormProps> = ({ postId }) => {
  const [state, formAction, isPending] = useActionState<CommentFormState, FormData>(
    addComment.bind(null, postId),
    {}
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment" className="sr-only">
        Comment
      </label>
      <textarea
        key={state.submissionId}
        id="comment"
        name="text"
        rows={3}
        placeholder="Share your thoughts..."
        required
        minLength={3}
        maxLength={1000}
        aria-invalid={Boolean(state.error)}
        aria-describedby="comment-error"
        className={`${inputClasses} resize-y`}
      />
      <div className="mt-3 flex items-center justify-between gap-4">
        <p id="comment-error" role="alert" className={errorClasses}>
          {state.error}
        </p>
        <Button
          type="submit"
          text={isPending ? 'Posting...' : 'Post comment'}
          disabled={isPending}
        />
      </div>
    </form>
  );
};

export default CommentForm;
