import { FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Blog } from '@/utils/types';
import {
  buttonClasses,
  headingH2Classes,
  headingH3Classes,
  paragraphClasses,
} from '@/utils/styles';
import { categories } from '@/utils/data-mappings';
import { truncateDescription } from '@/utils/helpers';

/**
 * Typový interface pro props komponenty CategoryList.
 * Tato komponenta přijímá seznam blogových příspěvků seřazený od nejnovějšího
 * a aktuálně zvolenou kategorii.
 */
interface CategoryListProps {
  list: Blog[];
  currentCategory: string;
}

/**
 * Komponenta CategoryList.
 * Tato komponenta zobrazuje blogové příspěvky podle zadané kategorie.
 * Pokud existuje alespoň jeden příspěvek v kategorii, zobrazí se nejnovější příspěvek spolu
 * s jeho obrázkem, titulkem a popisem (obsahem).
 * V případě, že v kategorii nejsou žádné příspěvky, je uživatel vyzván k vytvoření nového.
 * Komponenta také umožňuje filtrování podle kategorií a zobrazení souvisejících příspěvků.
 */
const CategoryList: FC<CategoryListProps> = ({ list, currentCategory }) => {
  // Seznam je seřazený od nejnovějšího, první příspěvek je tedy nejnovější
  const [latestBlog, ...relatedBlogs] = list;

  return (
    <section className="overflow-hidden pt-[180px] pb-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          {/* Sekce pro zobrazení nejnovějšího příspěvku, nebo výzva k vytvoření nového */}
          <div className="w-full px-4 lg:w-8/12">
            {latestBlog ? (
              <article>
                {/* Nadpis nejnovějšího příspěvku jako odkaz na detailní stránku */}
                <h1 className={headingH2Classes}>
                  <Link href={`/blogs/${latestBlog.id}`} className="hover:text-primary">
                    {latestBlog.title}
                  </Link>
                </h1>
                <Link
                  href={`/blogs/${latestBlog.id}`}
                  className="relative mb-10 block aspect-[97/60] w-full overflow-hidden rounded sm:aspect-[97/44]"
                >
                  {/* Obrázek nejnovějšího příspěvku */}
                  <Image
                    src={latestBlog.image}
                    alt={latestBlog.title}
                    fill
                    priority
                    sizes="(min-width: 992px) 66vw, 100vw"
                    className="object-cover object-center"
                  />
                </Link>
                {/* Zkrácený popis (obsah) nejnovějšího příspěvku */}
                <p className={paragraphClasses}>
                  {truncateDescription(latestBlog.description, 200)}
                </p>
              </article>
            ) : (
              <div className="mb-10 flex flex-col items-start gap-4">
                {/* Zobrazení informace o neexistujícím příspěvku */}
                <h1 className={headingH2Classes}>
                  No blog available for this category! Please create one.
                </h1>
                {/* Odkaz pro vytvoření nového příspěvku */}
                <Link href="/create" className={buttonClasses}>
                  Create New Blog
                </Link>
              </div>
            )}
          </div>
          {/* Sekce pro filtrování podle kategorií a zobrazení souvisejících příspěvků */}
          <aside className="w-full px-4 lg:w-4/12">
            {/* Filtrování podle kategorií */}
            <div className="mb-10 rounded-md bg-primary/5 dark:bg-primary/10">
              <h2 className={headingH3Classes}>Filter by Category</h2>
              <div className="flex flex-wrap gap-3 px-8 py-6">
                {categories.map((categoryItem) => (
                  <Link
                    key={categoryItem.value}
                    href={`/category/${categoryItem.value}`}
                    aria-current={categoryItem.value === currentCategory ? 'page' : undefined}
                    className={clsx(
                      'inline-flex items-center justify-center rounded-md px-4 py-2 duration-300',
                      categoryItem.value === currentCategory
                        ? 'bg-primary text-white'
                        : 'bg-primary/10 text-black hover:bg-primary hover:text-white dark:text-white'
                    )}
                  >
                    {categoryItem.label}
                  </Link>
                ))}
              </div>
            </div>
            {/* Zobrazení souvisejících příspěvků */}
            <div className="mb-10 rounded-md bg-primary/5 dark:bg-primary/10">
              <h2 className={headingH3Classes}>Related Blogs</h2>
              {relatedBlogs.length ? (
                <ul className="p-8">
                  {relatedBlogs.map((item) => (
                    <li
                      key={item.id}
                      className="mb-6 border-b border-body-color/10 pb-6 last:mb-0 last:border-none last:pb-0 dark:border-white/10"
                    >
                      <Link href={`/blogs/${item.id}`} className="group flex items-center gap-5">
                        {/* Obrázek souvisejícího příspěvku */}
                        <div className="relative h-[60px] w-[70px] shrink-0 overflow-hidden rounded-md sm:h-[75px] sm:w-[85px]">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="85px"
                            className="object-cover"
                          />
                        </div>
                        {/* Nadpis souvisejícího příspěvku */}
                        <span className="text-base font-medium text-black group-hover:text-primary dark:text-white">
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                // Zobrazení informace, pokud neexistují žádné související příspěvky
                <p className="p-8 text-body-color">No related blogs available.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
