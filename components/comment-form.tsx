'use client';

import { FC, useActionState, useEffect, useRef } from 'react';
import { addComment } from '@/utils/actions';
import { errorClasses, inputClasses } from '@/utils/styles';
import { CommentFormState } from '@/utils/types';
import SubmitButton from './submit-button';

// Rozhraní pro props komponenty CommentForm
interface CommentFormProps {
  postId: number; // ID příspěvku, ke kterému se komentář přidává
}

// Formulář pro přidání komentáře, odesílá se přes server action
const CommentForm: FC<CommentFormProps> = ({ postId }) => {
  const [state, formAction] = useActionState<CommentFormState, FormData>(
    addComment.bind(null, postId),
    {}
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Po úspěšném uložení se formulář vyprázdní
  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="w-full">
      <div className="flex gap-4">
        <label htmlFor="comment" className="sr-only">
          Comment
        </label>
        <input
          id="comment"
          name="text"
          autoComplete="off"
          placeholder="Add comment here"
          required
          minLength={3}
          maxLength={1000}
          className={inputClasses}
        />
        <SubmitButton text="Add" pendingText="Adding..." />
      </div>
      {state.error && <p className={errorClasses}>{state.error}</p>}
    </form>
  );
};

export default CommentForm;
