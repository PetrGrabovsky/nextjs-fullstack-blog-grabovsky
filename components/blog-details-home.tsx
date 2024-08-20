'use client';

import { headingH2Classes, paragraphClasses } from '@/utils/styles';
import { Blog } from '@/utils/types';
import { FC, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import Button from './button';

/**
 * Typový interface pro props komponenty BlogDetailsHome.
 * Tato komponenta příjmá objekt blogData, který obsahuje všechny relevantní informace
 * o blogovém příspěvku.
 */
interface BlogDetailsHomeProps {
  blogData: Blog; // Objekt reprezentující blogový příspěvek
}

/**
 * Komponenta BlogDetailHome.
 * Tato komponenta zobrazuje detailní informace o konkrétním blogovém příspěvku,
 * včetně titulku, obrázku, popisu, autora a kategorie.
 * Umožňuje také přidání komentáře k příspěvku.
 */
const BlogDetailsHome: FC<BlogDetailsHomeProps> = ({ blogData }) => {
  // Použití useRef k získání přístupu k inputu pro komentáře (kvůli nastavení focusu)
  const commentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Nastavení focusu na input po vykreslení komponenty
    if (commentInputRef.current) commentInputRef.current.focus();
  }, []);

  // Pokud nejsou k dispozici žádná data pro blog, komponenta se nevykreslí
  if (!blogData) return;

  return (
    // Hlavní sekce komponenty
    <section className="pb-[120px] pt-[150px]">
      <div className="container">
        <div className="-mx-4 flex flex-col items-center justify-center gap-4">
          <div className="w-full px-4 lg:w-8/12">
            <div>
              {/* Zobrazení nadpisu příspěvku */}
              <h2 className={headingH2Classes}>{blogData?.title}</h2>
              <div
                className={clsx(
                  'mb-10 flex flex-wrap items-center justify-between border-b border-body-color',
                  'border-opacity-10 pb-4 dark:border-white dark:border-opacity-10'
                )}
              >
                <div className="flex flex-wrap items-center">
                  {/* Sekce s informacemi o autorovi příspěvku */}
                  <div className="mb-5 mr-10 flex items-center">
                    <div className="mr-4">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        {/* Zobrazení obrázku autora blogu */}
                        <Image src={blogData?.userimage} alt="User" fill />
                      </div>
                    </div>
                    <div className="w-full">
                      {/* Zobrazení jména autora příspěvku */}
                      <h4 className="mb-1 text-base font-medium text-body-color">
                        By
                        <span className="pl-2">{blogData?.userid.split('_')[0]}</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  {/* Odkaz na kategorii blogového příspěvku */}
                  <Link
                    href={`/category/${blogData?.category}`}
                    className={clsx(
                      'inline-flex items-center justify-center rounded-full bg-primary px-4 py-2',
                      'text-sm font-semibold text-white'
                    )}
                  >
                    {blogData?.category}
                  </Link>
                </div>
              </div>
              <div>
                {/* Sekce pro zobrazení obrázku příspěvku */}
                <div className="mb-10 w-full overflow-hidden rounded">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    {/* Obrázek příspěvku */}
                    <Image
                      src={blogData?.image || ''}
                      alt="Blog"
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                </div>
                {/* Zobrazení popisu (obsahu) příspěvku */}
                <p className={paragraphClasses}>{blogData?.description}</p>
              </div>
            </div>
          </div>
          {/* Sekce pro přidání komentáře */}
          <div className="flex w-full gap-4 lg:w-8/12">
            <input
              name="comment"
              id="comment"
              ref={commentInputRef} // Použití ref umožňuje přímý přístup k DOM elementu
              autoComplete="off"
              placeholder="Add comment here"
              className={clsx(
                'w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color',
                'placeholder-body-color shadow-one outline-none focus:border-primary',
                'focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp'
              )}
            />
            <Button text="Add" onClick={() => {}} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsHome;
