'use client';

import { ChangeEvent, FC, useContext, useState } from 'react';
import clsx from 'clsx';
import { formControls } from '@/utils/data-mappings';
import Button from '@/components/button';
import Spinner from '@/components/spinner';
import { GlobalContext } from '@/contexts/global-context';
import { BlogFormData } from '@/utils/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { inputClasses, labelClasses } from '@/utils/styles';
import { initialBlogFormData } from '@/utils/initial-data';
import { handleImageSaveToFirebase } from '@/utils/helpers';

/**
 * Funkční komponenta Create představuje formulář pro vytvoření nového blogového příspěvku.
 * Obsahuje jak vstupní pole pro text, tak i možnost nahrát obrázek.
 * Komponenta provádí validaci vstupních dat a následně je odesílá na server.
 */
const Create: FC = () => {
  // Použití kontextu pro globální stav formulářových dat
  const { formData, setFormData } = useContext(GlobalContext);
  // Lokální stav pro sledování nahrávání obrázku do Firebase Storage
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  // Použití hooku useSession pro získání dat o aktuálním uživateli
  const { data: session } = useSession();
  // Hook pro navigaci uživatele po úspěšném odeslání formuláře
  const router = useRouter();
  // Stav pro uložení chybových zpráv jednotlivých vstupů formuláře
  const [errors, setErrors] = useState<Partial<BlogFormData>>({});

  /**
   * Funkce validateForm provádí validaci formulářových dat před jejich odesláním na server.
   * Kontroluje, zda jsou všechna formulářová pole vyplněná a splňují požadované podmínky.
   * Pokud je formulář validní vrací true jinak false.
   */
  const validateForm = (): boolean => {
    // Inicializace objektu pro uložení chybových zpráv.
    const newErrors: Partial<BlogFormData> = {};

    // Validace povinného pole pro obrázek
    if (!formData.image) {
      newErrors.image = 'Image is required.';
    }

    // Validace povinného pole pro titulek
    if (!formData.title || formData.title.trim().length < 3) {
      newErrors.title = 'Title is required and must be at least 3 characters long.';
    }

    // Validace povinného pole pro popis (obsah)
    if (!formData.description || formData.description.trim().length < 50) {
      newErrors.description = 'Description is required and must be at least 50 characters long.';
    }

    // Validace povinného pole pro výběř kategorie
    if (!formData.category) {
      newErrors.category = 'Category is required.';
    }

    // Aktualizace stavu s chybami
    setErrors(newErrors);

    // Vrací true pokud neexistují žádné chyby jinak false
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Funkce handleBlogImageChange zpracovává změnu souboru obrázku v poli formuláře.
   * Nahraje vybraný obrázek do Firebase Storage a uloží URL do stavu.
   */
  const handleBlogImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return; // Pokud není vybrán obrázek, funkce se ukončí
    setImageLoading(true); // Nastaví stav nahrávání na true, což zobrazí spinner

    try {
      // Uloží obrázek do Firebase a získá jeho URL
      const imageUrl = await handleImageSaveToFirebase(event.target.files[0]);
      // Aktualizace globálního stavu s URL obrázku
      setFormData((prevData) => ({
        ...prevData,
        image: imageUrl,
      }));
      // Odstranění případné chybové zprávy pro pole obrázku
      setErrors((prevErrors) => ({ ...prevErrors, image: undefined }));
    } catch (error) {
      // Logování chyby při nahrávání obrázku do konzole
      console.error('Error uploading image: ', error);
    } finally {
      setImageLoading(false); // Nastaví stav nahrávání na false, což skryje spinner
    }
  };

  /**
   * Funkce handleInputChange zpracovává změny ve vstupních polích formuláře.
   * Dynamicky aktualizuje stav na základě názvu pole a hodnoty.
   */
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    // Aktualizace stavu formulářových dat
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Odstraní případné chybové zprávy pro danné pole
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  /**
   * Funkce handleSaveBlogPost odesílá formulářová data na server pro uložení nového příspěvku.
   * Nejprve validuje data a poté provádí HTTP POST požadavek na server.
   */
  const handleSaveBlogPost = async () => {
    // Validace formuláře před odesláním
    if (!validateForm()) {
      return; // Pokud je validace neúspěšná, funkce se ukončí
    }

    // Odeslání dat na server pomocí HTTP POST požadavku
    const res = await fetch('/api/blog-post/add-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        userid: session?.user?.name, // Přidání ID uživatele do dat formuláře
        userimage: session?.user?.image, // Přidání URL obrázku uživatele do dat formuláře
        comments: [], // Inicializace pole pro komentáře
      }),
    });

    const data = await res.json(); // Parsování odpovědi ze serveru

    // Pokud je odeslání úspěšné, resetuje formulář a přesměruje uživatele na stránku s blogy
    if (data && data.success) {
      setFormData(initialBlogFormData); // Reset formuláře na výchozí hodnoty
      router.push('/blogs'); // Přesměrování na stránku s blogy
    }
  };

  return (
    <section className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className={clsx(
                'mb-12 rounded-md bg-primary/[3%] px-8 py-10 dark:bg-dark sm:p-[55px] lg:mb-5',
                'lg:px-8 xl:p-[55px]'
              )}
            >
              {/* Nadpis formuláře */}
              <h2
                className={clsx(
                  'mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl',
                  'xl:text-3xl'
                )}
              >
                Create Your Own Blog Post
              </h2>
              <div>
                <div className="flex flex-col gap-3">
                  {/* Sekce pro výběr a zobrazení obrázku */}
                  <div className="flex gap-3">
                    <div className={clsx(imageLoading ? 'w-1/2' : 'w-full')}>
                      <label htmlFor="fileInput" className={labelClasses}>
                        Upload Blog Image
                      </label>
                      <input
                        id="fileInput"
                        accept="image/*"
                        max={1000000}
                        onChange={handleBlogImageChange}
                        type="file"
                        className={clsx(inputClasses, 'mb-8')}
                      />
                      {/* Zobrazení chybové zprávy pro obrázek, pokud existuje */}
                      {errors.image && <p className="text-red-500">{errors.image}</p>}
                    </div>
                    {/* Zobrazení spinneru při nahrávání obrázku */}
                    {imageLoading && (
                      <div className="w-1/2">
                        <Spinner />
                      </div>
                    )}
                  </div>
                  <div className="-mx-4 flex flex-wrap">
                    {/* Dynamické generování vstupních polí na základě formControls */}
                    {formControls.map((control) => (
                      <div key={control.id} className="w-full px-4">
                        <label htmlFor={control.id} className={labelClasses}>
                          {control.label}
                        </label>
                        {control.component === 'input' && (
                          <input
                            id={control.id}
                            name={control.id}
                            type={control.type}
                            placeholder={control.placeholder}
                            onChange={handleInputChange}
                            value={formData[control.id as keyof BlogFormData]}
                            className={clsx(inputClasses, 'mb-8')}
                          />
                        )}
                        {control.component === 'textarea' && (
                          <textarea
                            id={control.id}
                            name={control.id}
                            placeholder={control.placeholder}
                            rows={5}
                            onChange={handleInputChange}
                            value={formData[control.id as keyof BlogFormData]}
                            className={clsx(inputClasses, 'mb-8 resize-none')}
                          />
                        )}
                        {control.component === 'select' && (
                          <select
                            id={control.id}
                            name={control.id}
                            onChange={handleInputChange}
                            value={formData[control.id as keyof BlogFormData]}
                            className={clsx(inputClasses, 'mb-8')}
                          >
                            <option value={''} id="">
                              Select
                            </option>
                            {control.options.map((optionItem) => (
                              <option
                                key={optionItem.value}
                                id={optionItem.value}
                                value={optionItem.value}
                              >
                                {optionItem.label}
                              </option>
                            ))}
                          </select>
                        )}
                        {/* Zobrazení chybové zprávy pro pole, pokud existuje */}
                        {errors[control.id as keyof BlogFormData] && (
                          <p className="text-red-500">{errors[control.id as keyof BlogFormData]}</p>
                        )}
                      </div>
                    ))}
                    <div className="w-full px-4">
                      {/* Tlačítko pro odeslání formuláře */}
                      <Button text="Create New Blog" onClick={handleSaveBlogPost} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Create;
