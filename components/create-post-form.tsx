'use client';

import { ChangeEvent, FC, FormEvent, startTransition, useActionState, useState } from 'react';
import clsx from 'clsx';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { formControls } from '@/utils/data-mappings';
import { createPost } from '@/utils/actions';
import { errorClasses, inputClasses, labelClasses } from '@/utils/styles';
import { IMAGE_TYPES, postSchema } from '@/utils/validation';
import { PostFormState } from '@/utils/types';
import Button from './button';

// Hodnota atributu accept pro výběr obrázku (pouze povolené formáty)
const acceptedImageTypes = Object.keys(IMAGE_TYPES).join(',');

/**
 * Formulář pro vytvoření nového blogového příspěvku.
 * Data se odesílají přes server action createPost, která je validuje, nahraje obrázek
 * do Vercel Blob a uloží příspěvek. Formulář se odesílá přes onSubmit, aby React po chybě
 * validace automaticky nevymazal vyplněná pole ani vybraný obrázek.
 */
const CreatePostForm: FC = () => {
  const [state, formAction, isPending] = useActionState<PostFormState, FormData>(createPost, {});
  // Náhled vybraného obrázku a chyba při výběru souboru na straně klienta
  const [preview, setPreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  // Kontrola obrázku stejným schématem jako na serveru ještě před odesláním a vytvoření náhledu
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setImageError(null);
    if (!file) return;

    const result = postSchema.shape.image.safeParse(file);
    if (!result.success) {
      setImageError(result.error.issues[0]?.message ?? 'Invalid image.');
      event.target.value = '';
      return;
    }
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  // Chyba obrázku z klientské kontroly má přednost před chybou ze serveru
  const imageMessage = imageError ?? (preview ? undefined : state.errors?.image);

  return (
    // action zajistí odeslání i před načtením JavaScriptu, poté formulář obsluhuje onSubmit
    <form action={formAction} onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Výběr obrázku s náhledem */}
      <div>
        <span className={labelClasses}>Cover image</span>
        <label
          htmlFor="image"
          className={clsx(
            'relative flex aspect-video cursor-pointer flex-col items-center justify-center overflow-hidden',
            'rounded-2xl border-2 border-dashed transition hover:border-primary-500',
            'focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-500/15',
            imageMessage
              ? 'border-red-500'
              : 'border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900'
          )}
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element -- náhled lokálního souboru (blob: URL)
            <img src={preview} alt="Selected cover" className="h-full w-full object-cover" />
          ) : (
            <span className="flex flex-col items-center gap-2 px-6 text-center">
              <HiOutlinePhotograph size={40} aria-hidden className="text-zinc-400" />
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                Click to upload an image
              </span>
              <span className="text-xs text-zinc-500">JPG, PNG, WebP, GIF or AVIF, up to 4 MB</span>
            </span>
          )}
          <input
            id="image"
            name="image"
            type="file"
            accept={acceptedImageTypes}
            onChange={handleImageChange}
            aria-invalid={Boolean(imageMessage)}
            aria-describedby="image-error"
            className="sr-only"
          />
        </label>
        <p id="image-error" role="alert" className={errorClasses}>
          {imageMessage}
        </p>
        {preview && (
          <p className="mt-2 text-xs text-zinc-500">Click the image to choose a different one.</p>
        )}
      </div>
      {/* Dynamické generování vstupních polí na základě formControls */}
      {formControls.map((control) => {
        const error = state.errors?.[control.id];
        const commonProps = {
          id: control.id,
          name: control.id,
          defaultValue: state.values?.[control.id] ?? '',
          'aria-invalid': Boolean(error),
          'aria-describedby': `${control.id}-error`,
          className: inputClasses,
        };

        return (
          <div key={control.id}>
            <label htmlFor={control.id} className={labelClasses}>
              {control.label}
            </label>
            {control.component === 'input' && (
              <input {...commonProps} type="text" placeholder={control.placeholder} />
            )}
            {control.component === 'textarea' && (
              <textarea
                {...commonProps}
                placeholder={control.placeholder}
                rows={10}
                className={clsx(inputClasses, 'resize-y')}
              />
            )}
            {control.component === 'select' && (
              <select {...commonProps}>
                <option value="">{control.placeholder}</option>
                {control.options.map((optionItem) => (
                  <option key={optionItem.value} value={optionItem.value}>
                    {optionItem.label}
                  </option>
                ))}
              </select>
            )}
            <p id={`${control.id}-error`} role="alert" className={errorClasses}>
              {error}
            </p>
          </div>
        );
      })}
      {state.message && (
        <p role="alert" className={errorClasses}>
          {state.message}
        </p>
      )}
      {/* Tlačítko pro odeslání formuláře, během ukládání je zablokované */}
      <div className="flex justify-end border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <Button
          type="submit"
          text={isPending ? 'Publishing...' : 'Publish post'}
          disabled={isPending}
          className="px-6"
        />
      </div>
    </form>
  );
};

export default CreatePostForm;
