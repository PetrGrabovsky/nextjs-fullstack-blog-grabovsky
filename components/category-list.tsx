'use client';

import { Blog } from '@/utils/types';
import { FC } from 'react';
import clsx from 'clsx';
import Button from './button';
import { useRouter } from 'next/navigation';
import { headingH2Classes, headingH3Classes, paragraphClasses } from '@/utils/styles';
import Image from 'next/image';
import { categories } from '@/utils/data-mappings';
import Link from 'next/link';

/**
 * Typový interface pro props komponenty CategoryList.
 * Tato komponenta příjmá seznam blogových příspěvků (list) k zobrazení.
 */
interface CategoryListProps {
  list: Blog[];
}

/**
 * Komponenta CategoryList.
 * Tato komponenta zobrazuje blogové příspěvky podle zadané kategorie.
 * Pokud existuje alespoň jeden příspěvek v kategorii, zobrazí se nejnovější příspěvek spolu
 * s jeho obrázkem, titulkem a popisem (obsahem).
 * V případě, že v kategorii nejsou žádné příspěvky, je uživatel vyzván k vytvoření nového.
 * Komponenta také umožňuje filtrování podle kategorií a zobrazení souvisejících příspěvků.
 *
 */
const CategoryList: FC<CategoryListProps> = ({ list }) => {
  // Použití hooku useRouter pro možnost navigace mezi stránkami
  const router = useRouter();

  // Získání nejvyššího ID z blogových příspěvků pro zjištění, který je nejnovější
  const getMaxId = Math.max(...list.map((listItem) => listItem.id));

  // Vyhledání nejnovějšího blogového příspěvku podle získaného ID
  const getLatestBlogForCurrentCategory =
    list && list.length ? list.find((item) => item.id === getMaxId) : null;

  // Filtrování příspěvků, aby se vyloučil nejnovější z výběru souvisejích příspěvků
  const relatedBlogs = list && list.length ? list.filter((item) => item.id !== getMaxId) : [];

  // Obsluha kliknutí na tlačítko pro vytvoření nového příspěvku - přesměrování na Create stránku.
  const handleCreateButtonClick = () => router.push('/create');

  return (
    // Hlavní sekce komponenty
    <section className="overflow-hidden pb-[120px] pt-[180px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          {/* Sekce pro zobrazení nejnovějšího příspěvku, nebo výzva k vytvoření nového */}
          <div className="w-full px-4 lg:w-8/12">
            {/* Pokud v kategorii nejsou žádné příspěvky */}
            {getLatestBlogForCurrentCategory === null ? (
              <div className="flex flex-col gap-4">
                {/* Zobrazení informace o neexistujícím příspěvku */}
                <h2 className={headingH2Classes}>
                  No blog available for this category! Please create one.
                </h2>
                {/* Tlačítko pro vytvoření nového příspěvku */}
                <Button text="Create New Blog" onClick={handleCreateButtonClick} />
              </div>
            ) : (
              // Pokud existuje alespoň jeden příspěvek, zobrazí se nejnovější
              <div>
                {/* Nadpis nejnovějšího příspěvku */}
                <h2 className={headingH2Classes}>{getLatestBlogForCurrentCategory?.title}</h2>
                <div className="mb-10 w-full overflow-hidden rounded">
                  <div className="sm:aspect[97/44] relative aspect-[97/60] w-full">
                    {/* Obrázek nejnovějšího příspěvku */}
                    <Image
                      src={getLatestBlogForCurrentCategory?.image || ''}
                      alt="Blog"
                      fill
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
                {/* Popis (obsah) nejnovějšího příspěvku */}
                <p className={paragraphClasses}>{getLatestBlogForCurrentCategory?.description}</p>
              </div>
            )}
          </div>
          {/* Sekce pro filtrování podle kategorií a zobrazení souvisejících příspěvků */}
          <div className="w-full px-4 lg:w-4/12">
            {/* Filtrování podle kategorií */}
            <div className="mb-10 rounded-md bg-primary bg-opacity-5 dark:bg-opacity-10">
              <h3 className={headingH3Classes}>Filter by Categoty</h3>
              <div className="flex flex-wrap px-8 py-6">
                {/* Dynamické generování tlačítek pro každou kategorii */}
                {categories.map((categoryItem) => (
                  <button
                    key={categoryItem.value} // Unikátní klíč pro každé tlačítko
                    onClick={() => router.push(`/category/${categoryItem.value}`)}
                    className={clsx(
                      'mb-3 mr-3 inline-flex items-center justify-center rounded-md bg-primary',
                      'px-4 py-2 text-white duration-300'
                    )}
                  >
                    {categoryItem.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Zobrazení souvisejících příspěvků */}
            <div className="mb-10 rounded-md bg-primary bg-opacity-5 dark:bg-opacity-10">
              <h3 className={headingH3Classes}>Related Blogs</h3>
              <ul className="p-8">
                {/* Generování seznamu souvisejících příspěvků, nebo info, žé žádné neexistují */}
                {relatedBlogs && relatedBlogs.length ? (
                  relatedBlogs.map((item) => (
                    <li
                      key={item.id} // Unikátní klíč pro každý <li> element
                      className={clsx(
                        'mb-6 border-b border-body-color border-opacity-10 pb-6',
                        'dark:border-white dark:border-opacity-10'
                      )}
                    >
                      <div className="flex items-center lg:block xl:flex">
                        <div className="mr-5 lg:mb-3 xl:mb-0">
                          <div
                            className={clsx(
                              'relative h-[60px] w-[70px] overflow-hidden rounded-md sm:h-[75px]',
                              'sm:w-[85px]'
                            )}
                          >
                            {/* Obrázek souvisejícího příspěvku */}
                            <Image src={item.image} alt="Blog" fill />
                          </div>
                        </div>
                        <div className="w-full">
                          {/* Nadpis souvisejícího příspěvku jako odkaz na detail */}
                          <h5>
                            {/* Odkaz na detail příspěvku */}
                            <Link
                              href={`/blogs/${item.id}`}
                              className={clsx(
                                'mb-[8px] block text-base font-medium text-black dark:text-white',
                                'hover:text-primary dark:hover:text-primary'
                              )}
                            >
                              {/* Zobrazení názvu souvisejícího příspěvku */}
                              {item.title}
                            </Link>
                          </h5>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  // Zobrazení informace, pokud neexistují žádné související příspěvky
                  <h1>No Related blogs available</h1>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
