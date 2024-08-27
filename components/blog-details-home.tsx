'use client';

import { headingH2Classes, paragraphClasses } from '@/utils/styles';
import { Blog } from '@/utils/types';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import Button from './button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
 * Umožňuje také přidání komentáře k příspěvku a zobrazení diskuze pod příspěvkem.
 */
const BlogDetailsHome: FC<BlogDetailsHomeProps> = ({ blogData }) => {
  // Použití useState pro uložení a nastavení textu komentáře, který uživatel píše do inputu
  const [comment, setComment] = useState<string>('');
  // Použití useSession pro získání informací o aktualní session kvůli identifikaci uživatele
  const { data: session } = useSession();
  // Použití useRef k získání přístupu k inputu pro komentáře (kvůli nastavení focusu)
  const commentInputRef = useRef<HTMLInputElement>(null);
  // Hook useRouter pro možnost navigace a obnovení stránky (refresh)
  const router = useRouter();

  /**
   * Funkce handleCommentSave.
   * Tato funkce obsluhuje událost kliknutí na tlačítko pro přidání komentáře.
   * Uloží nový komentář ke konkrétnímu příspěvku prostřednictvím API požadavku.
   */
  const handleCommentSave = async () => {
    if (comment.trim().length < 3) {
      return; // Zastaví odeslání, pokud validace neprojde
    }

    // Přidání nového komentáře do seznamu stávajících komentářů
    const extractComments = [...blogData.comments];
    extractComments.push(`${comment}|${session?.user?.name}`);

    // Odeslání požadavku na aktualizaci příspěvku s novým komentářem
    const response = await fetch(`/api/blog-post/update-post`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: blogData?.id,
        comments: extractComments,
      }),
    });

    const data = await response.json();

    if (data && data.success) {
      // Po úspěšném uložení se input pro komentáře vyprázdní a stránka se obnoví (refresh)
      setComment('');
      router.refresh();
    }
  };

  /**
   * Funkce handleCommentChange.
   * Tato funkce se spouští při změně hodnoty inputu pro komentáře.
   * Aktualizuje stav comment pomocí setteru setComment na aktuální hodnotu v inputu.
   */
  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    // Nastavení focusu na input po vykreslení komponenty
    if (commentInputRef.current) commentInputRef.current.focus();
  }, []);

  /**
   * Použití useEffect pro automatickou aktualizaci stránky každé 2 sekundy.
   * Interval je nastaven pro pravidelné obnovení obsahu diskuze.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 2000);

    // Funkce pro vyčištění intervalu při odpojení komponenty.
    return () => {
      clearInterval(interval);
    };
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
            {/* Input a tlačítko pro přidání komentáře se zobrazí pokud je uživatel přihlášen. */}
            {session !== null ? (
              <>
                <input
                  name="comment"
                  id="comment"
                  ref={commentInputRef} // Použití ref umožňuje přímý přístup k DOM elementu
                  autoComplete="off"
                  placeholder="Add comment here"
                  value={comment}
                  onChange={handleCommentChange} // Při změně se aktualizuje stav comment
                  className={clsx(
                    'w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color',
                    'placeholder-body-color shadow-one outline-none focus:border-primary',
                    'focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp'
                  )}
                />
                {/* Tlačítko pro uložení komentáře */}
                <Button text="Add" onClick={handleCommentSave} />
              </>
            ) : null}
          </div>
          {/* Sekce pro zobrazení diskuze pod příspěvkem */}
          <section className="w-full py-8 dark:bg-gray-900 lg:w-8/12 lg:py-16">
            <div className="mb-6 flex items-center justify-between">
              {/* Zobrazení celkového počtu komentářů u příspěvku */}
              <h2 className="text-lg font-bold text-black dark:text-white lg:text-2xl">
                Discussion ({blogData?.comments.length})
              </h2>
            </div>
            {/* Zobrazení komentářů příspěvku, pokud nějaké existují */}
            {blogData && blogData.comments && blogData.comments.length > 0
              ? blogData.comments.map((comment, index) => (
                  <div key={index} className="rounded-lg p-6 text-base dark:bg-gray-900">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <p
                          className={clsx(
                            'mr-3 inline-flex items-center text-sm text-black dark:text-white',
                            'font-semibold'
                          )}
                        >
                          {/* Zobrazení jména autora komentáře. Pokud je komentář od autora
                              příspěvku, zobrazí se za jeho jménem text (Author).
                              Kód rozděluje komentář na dvě části oddělené znakem |.
                              Druhá část obsahuje ID autora komentáře.
                              Pokud se ID autora komentáře shoduje s ID autora příspěvku,
                              přidá se za jméno označení (Author) */}
                          {comment.split('|')[1] === blogData?.userid
                            ? `${comment.split('|')[1].split('_')[0]} (Author)`
                            : comment.split('|')[1].split('_')[0]}
                        </p>
                      </div>
                    </div>
                    {/* Zobrazení samotného komentáře */}
                    <p className="text-gray-500 dark:text-gray-400">{comment.split('|')[0]}</p>
                  </div>
                ))
              : null}
          </section>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsHome;
