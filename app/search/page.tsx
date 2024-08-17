'use client';

import { ChangeEvent, FC, useContext, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Button from '@/components/button';
import { GlobalContext } from '@/contexts/global-context';
import { Blog } from '@/utils/types';
import SingleBlog from '@/components/single-blog';
import { inputClasses } from '@/utils/styles';

/**
 * Komponenta Search poskytuje funkce pro vyhledávání blogových příspěvků.
 * Umožňuje uživateli zadat vyhledávací dotaz, který odešle na server, a zobrazuje
 * výsledky na základě odpovědi z API. Komponenta také umožňuje mazání příspěvků přímo
 * z výsledků vyhledávání s automatickou aktualizací zobrazení.
 */
const Search: FC = () => {
  /**
   * Získání globálního stavu aplikace prostřednictvím kontextu.
   * searchResults obsahuje výsledky vyhledávání, searchQuery je aktuální vyhledávací dotaz
   * setSearchResults a setSearchQuery jsou funkce pro aktualizaci těchto stavů
   */
  const { searchResults, setSearchResults, searchQuery, setSearchQuery } =
    useContext(GlobalContext);

  /**
   * Reference pro uložení odkazu na element vstupního pole pro vyhledávání.
   * Používá se pro automatické nastavení focusu na toto pole při načtení komponenty.
   */
  const searchInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handler pro změnu hodnoty v input poli pro vyhledávání.
   * Aktualizuje stav searchQuery podle toho, co uživatel zadává.
   */
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Pomocná funkce pro načtení výsledků vyhledávání na základě dotazu.
   * Odesílá GET požadavek na server a aktualizuje stav searchResults s novými daty.
   */
  const helperFunctionToFetchSearchResult = async (query: string) => {
    const res = await fetch(`/api/search?query=${query}`, {
      method: 'GET',
      cache: 'no-store', // Zajištění, že se výsledky načítají vždy aktualní
    });

    const data = await res.json();

    if (data.success) setSearchResults(data.data);
  };

  /**
   * Handler pro obsluhu kliknutí na tlačítko vyhledávání.
   * Spouští vyhledávací proces tím, že volá pomocnou funkci helperFunctionToFetchSearchResult
   */
  const handleSearchButtonClick = async () => {
    helperFunctionToFetchSearchResult(searchQuery); // Vyhledání příspěvků na základě dotazu.
  };

  /**
   * Handler pro mazání blogového příspěvku.
   * Odesílá požadavek na smazaní konkrétního příspěvku podle jeho ID.
   */
  const handleDeleteBlog = async (id: number) => {
    const res = await fetch(`/api/blog-post/delete-post?id=${id}`, {
      method: 'DELETE',
      cache: 'no-store', // Zajištění, že se načítají aktualní data
    });

    const data = await res.json();

    // Po úspěšném odstranění příspěvku aktualizujeme výsledky vyhledávání
    if (data && data.success) helperFunctionToFetchSearchResult(searchQuery);
  };

  /**
   * Použití hooku useEffect k zaměření na input při vykreslení komponenty.
   * Zajišťuje, že uživatel může ihned začít psát svůj vyhledávací dotaz.
   */
  useEffect(() => {
    if (searchInputRef.current) searchInputRef.current.focus();
  }, []);

  return (
    // Sekce komponenty obsahující celé rozvržení a styly stránky pro vyhledávání
    <section className="overflow-hidden py-16 md:py-20 lg:py-28">
      {/* Kontejner pro ohraničení obsahu a jeho centrování na stránce */}
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className={clsx(
                'mb-12 rounded-md bg-primary/[3%] px-8 py-11 dark:bg-dark sm:p-[50px] lg:mb-5',
                'lg:px-8 xl:p-[55px]'
              )}
            >
              {/* Nadpis vyhledávací sekce */}
              <h2
                className={clsx(
                  'mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl',
                  'xl:text-3xl'
                )}
              >
                Search any blog post
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  {/* Vyhledávací vstupní pole */}
                  <input
                    name="search"
                    id="search"
                    ref={searchInputRef} // Připojení useRef k inputu pro přímý přístup
                    type="text"
                    placeholder="Search Blogs"
                    autoComplete="off"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  {/* Tlačítko pro spuštění vyhledávání */}
                  <Button text="Search" onClick={handleSearchButtonClick} />
                </div>
              </div>
            </div>
          </div>
          {/* Sekce pro zobrazení výsledků vyhledávání */}
          <section className="w-full pb-[120px] pt-[80px]">
            <div className="container">
              <div className="-mx-4 flex flex-wrap">
                {/* Podmínka pro zobrazení příspěvků pokud jsou nalezeny */}
                {searchResults.length > 0 ? (
                  // Mapování výsledků vyhledávání, kde je každý výsledek zobrazen v SingleBlog
                  searchResults.map((searchBlogItem: Blog) => (
                    <div key={searchBlogItem.id} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                      <SingleBlog handleDeleteBlog={handleDeleteBlog} blogItem={searchBlogItem} />
                    </div>
                  ))
                ) : (
                  // Zobrazení hlášky pokud nejsou nalezeny žádné výsledky
                  <h1>No search results</h1>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Search;
