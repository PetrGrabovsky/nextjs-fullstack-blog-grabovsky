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
 * Funkční komponenta Create umožňující uživatelům vytvořit nový blogový příspěvek
 * Zajišťuje formulářové rozhraní, kde uživatelé mohou nahrávat obrázky a vyplňovat informace
 * o blogovém příspěvku, které budou následně odeslány na server
 */
const Create: FC = () => {
  // Přístup ke globálnímu stavu pomocí Context API
  const { formData, setFormData } = useContext(GlobalContext);
  // Lokální stav pro sledování, zda se obrázek nahrává do Firebase Storage
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  // Použití hooku useSession pro získání dat o uživateli z aktuální session
  const { data: session } = useSession();
  const router = useRouter();

  /**
   * Funkce pro zpracování změny obrázku blogu
   * Tato funkce je spuštěna při výběru obrázku uživatelem a následně tento obrázek nahraje
   * na Firebase
   */
  const handleBlogImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return; // Pokud nejsou vybrány žádné soubory, funkce se ukončí

    setImageLoading(true); // Nastaví stav nahrávání na true, což zobrazí spinner

    try {
      // Uloží obrázek do Firebase a získá jeho URL
      const imageUrl = await handleImageSaveToFirebase(event.target.files[0]);
      setFormData((prevData) => ({
        ...prevData,
        image: imageUrl, // Aktualizuje URL obrázku v globálním stavu
      }));
    } catch (error) {
      console.error('Error uploading image: ', error); // Logování případných chyb
    } finally {
      setImageLoading(false); // Nastaví stav nahrávání na false, což skryje spinner
    }
  };

  /**
   * Funkce pro zpracování změn ve formulářových polích
   * Tato funkce je universální pro všechna vstupní pole formuláře a aktualizuje globální stav
   * při každé změně vstupu
   */
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    // Destrukturalizace eventu pro získání názvu a hodnoty vstupu
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamická aktualizace příslušného pole ve formData podle jeho názvu
    }));
  };

  /**
   * Funkce pro uložení nového blogového příspěvku.
   * Tato funkce odešle data z formuláře (včetně URL obrázku) na server pomocí HTTP POST
   * požadavku, kde jsou data uložena do databáze. Úspěšnost operace je zatím logována.
   * Po úspěšném uložení příspěvku se formulář restartuje na výchozí hodnoty, aby byl
   * připravený k vytvoření nového příspěvku.
   */
  const handleSaveBlogPost = async () => {
    // Odeslání dat na server pro uložení do databáze
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

    console.log(data, 'data'); // Debugging: loguje odpověď serveru

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
            {/* Formulářová část pro vytvoření nového blogu */}
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
                  <div className="flex gap-3">
                    <div className={clsx(imageLoading ? 'w-1/2' : 'w-full')}>
                      {/* Popis pro pole výběru obrázku */}
                      <label htmlFor="fileInput" className={labelClasses}>
                        Upload Blog Image
                      </label>
                      {/* Input pro výběr obrázku */}
                      <input
                        id="fileInput"
                        accept="image/*"
                        max={1000000}
                        onChange={handleBlogImageChange}
                        type="file"
                        className={clsx(inputClasses, 'mb-8')}
                      />
                    </div>
                    {/* Spinner pro indikaci nahrávání obrázku */}
                    {imageLoading && (
                      <div className="w-1/2">
                        <Spinner />
                      </div>
                    )}
                  </div>
                  <div className="-mx-4 flex flex-wrap">
                    {/* Generování formulářových polí na základě definice v data-mappings.ts */}
                    {formControls.map((control) => (
                      <div key={control.id} className="w-full px-4">
                        {/* Popis pro vstupní pole */}
                        <label htmlFor={control.id} className={labelClasses}>
                          {control.label}
                        </label>
                        {/* Vstupní pole podle definice v data-mappings.ts */}
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
