'use client';

import { FC } from 'react';
import clsx from 'clsx';
import { formControls } from '@/utils/data-mappings';
import Button from '@/components/button';

// Definice opakujících se TailwindCSS tříd pro inputy a labely
const inputClasses = clsx(
  'mb-8 w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color',
  'placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none',
  'dark:bg-[#242B51] dark:shadow-signUp'
);
const labelClasses = 'text-dark mb-3 block text-sm font-medium dark:text-white';

// Funkční komponenta Create umožňující uživatelům vytvořit nový blogový příspěvek
const Create: FC = () => {
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
                  <div>
                    {/* Popis pro pole výběru obrázku */}
                    <label htmlFor="fileInput" className={labelClasses}>
                      Upload Blog Image
                    </label>
                    {/* Input pro výběr obrázku */}
                    <input
                      id="fileInput"
                      accept="image/*"
                      max={1000000}
                      type="file"
                      className={inputClasses}
                    />
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
                            className={inputClasses}
                          />
                        )}
                        {control.component === 'textarea' && (
                          <textarea
                            id={control.id}
                            name={control.id}
                            placeholder={control.placeholder}
                            rows={5}
                            className={clsx(inputClasses, 'resize-none')}
                          />
                        )}
                        {control.component === 'select' && (
                          <select id={control.id} name={control.id} className={inputClasses}>
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
                      <Button text="Create New Blog" onClick={() => {}} />
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
