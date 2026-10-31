'use client';

import { ChangeEvent, FC, useActionState, useEffect, useState } from 'react';
import clsx from 'clsx';
import { formControls } from '@/utils/data-mappings';
import { createPost } from '@/utils/actions';
import { errorClasses, inputClasses, labelClasses } from '@/utils/styles';
import { MAX_IMAGE_SIZE } from '@/utils/validation';
import { PostFormState } from '@/utils/types';
import SubmitButton from './submit-button';

/**
 * Formulář pro vytvoření nového blogového příspěvku.
 * Data se odesílají přes server action createPost, která je validuje, nahraje obrázek
 * do Vercel Blob a uloží příspěvek. Chyby validace se zobrazí u jednotlivých polí.
 */
const CreatePostForm: FC = () => {
  const [state, formAction] = useActionState<PostFormState, FormData>(createPost, {});
  // Náhled vybraného obrázku a chyba při výběru souboru na straně klienta
  const [preview, setPreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  // Uvolnění URL náhledu při změně obrázku nebo odmontování komponenty
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Kontrola velikosti obrázku ještě před odesláním a vytvoření náhledu
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageError(null);
    setPreview(null);
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      setImageError('Image can be at most 4 MB.');
      event.target.value = '';
      return;
    }
    setPreview(URL.createObjectURL(file));
  };

  const imageMessage = imageError ?? state.errors?.image;

  return (
    <form action={formAction} className="flex flex-col gap-8" noValidate>
      {/* Výběr obrázku s náhledem */}
      <div>
        <label htmlFor="image" className={labelClasses}>
          Upload Blog Image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          aria-invalid={Boolean(imageMessage)}
          className={clsx(
            inputClasses,
            'file:mr-4 file:rounded file:border-0 file:bg-primary file:px-4 file:py-1 file:text-white'
          )}
        />
        {imageMessage && <p className={errorClasses}>{imageMessage}</p>}
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element -- náhled lokálního souboru (blob: URL)
          <img
            src={preview}
            alt="Selected image preview"
            className="mt-4 max-h-64 rounded-md object-cover"
          />
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
        };

        return (
          <div key={control.id}>
            <label htmlFor={control.id} className={labelClasses}>
              {control.label}
            </label>
            {control.component === 'input' && (
              <input
                {...commonProps}
                type={control.type}
                placeholder={control.placeholder}
                className={inputClasses}
              />
            )}
            {control.component === 'textarea' && (
              <textarea
                {...commonProps}
                placeholder={control.placeholder}
                rows={8}
                className={clsx(inputClasses, 'resize-y')}
              />
            )}
            {control.component === 'select' && (
              // key zajistí obnovení výchozí hodnoty po vrácení formuláře se chybou
              <select key={commonProps.defaultValue} {...commonProps} className={inputClasses}>
                <option value="">Select</option>
                {control.options.map((optionItem) => (
                  <option key={optionItem.value} value={optionItem.value}>
                    {optionItem.label}
                  </option>
                ))}
              </select>
            )}
            {error && <p className={errorClasses}>{error}</p>}
          </div>
        );
      })}
      {state.message && <p className={errorClasses}>{state.message}</p>}
      <div>
        {/* Tlačítko pro odeslání formuláře, během ukládání je zablokované */}
        <SubmitButton text="Create New Blog" pendingText="Publishing..." />
      </div>
    </form>
  );
};

export default CreatePostForm;
