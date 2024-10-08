// Importy nezbytných závislostí
import { Blog } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { FaTrash } from 'react-icons/fa';

// Interface definující props komponenty SingleBlog
interface SingleBlogProps {
  blogItem: Blog; // Objekt reprezentující jednotlivý blogový příspěvek
  handleDeleteBlog: (id: number) => Promise<void>; // Funkce pro odstranění blogového příspěvku
}

/**
 * Komponenta SingleBlog.
 * Tato komponenta zobrazuje jeden blogový příspěvek včetně jeho obrázku, titulku, popisu
 * a dalších relevantních informací. Pokud je přihlášený uživatel autorem příspěvku,
 * zobrazí se také ikona pro odstranění příspěvku.
 */
const SingleBlog: FC<SingleBlogProps> = ({ blogItem, handleDeleteBlog }) => {
  // Destrukturalizace potřebných vlastností z objektu blogItem
  const { image, category, title, description, userimage, userid, id } = blogItem;
  // Získání informací o aktualní session pro zjištění, zda je uživatel autorem příspěvku
  const { data: session } = useSession();

  return (
    <div>
      {/* Kontejner pro obrázek a kategorii blogového příspěvku */}
      <div className="relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark">
        {/* Odkaz na detailní stránku blogového příspěvku */}
        <Link href={'/'} className="relative block h-[250px] w-full">
          {/* Zobrazení kategorie jako štítek */}
          <span
            className={clsx(
              'absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full',
              'bg-primary px-4 py-2 text-sm font-semibold capitalize text-white'
            )}
          >
            {category}
          </span>
          {/* Obrázek blogového příspěvku */}
          <Image src={image} alt="Blog Post" fill />
        </Link>
      </div>
      {/* Kontejner pro textové informace blogového příspěvku */}
      <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
        {/* Zobrazení nadpisu blogového příspěvku */}
        <h3>
          <Link
            href={`/blogs/${id}`} // Odkaz na detailní stránku konkrétního příspěvku
            className={clsx(
              'mb-4 block overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold',
              'text-black hover:text-primary dark:text-white dark:hover:text-primary',
              'sm:text-2xl'
            )}
          >
            {title}
          </Link>
        </h3>
        {/* Zobrazení popisu blogového příspěvku */}
        <p
          className={clsx(
            'mb-6 h-[20px] overflow-hidden text-ellipsis whitespace-nowrap pb-6 text-base',
            'font-medium text-body-color dark:border-white dark:border-opacity-10'
          )}
        >
          {description}
        </p>
        {/* Kontejner pro informace o autorovi blogového příspěvku */}
        <div className="flex items-center justify-between">
          <div className="flex items-center xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
            <div className="mr-4">
              {/* Zobrazení obrázku autora */}
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image src={userimage} alt="Author" fill />
              </div>
            </div>
            {/* Zobrazení jména autora blogového příspěvku */}
            <div className="flex flex-col">
              <p className="mb-1 text-sm font-medium text-dark dark:text-white">By</p>
              <p className="mb-1 text-sm font-medium text-dark dark:text-white">
                {userid.split('_')[0].toUpperCase()}
              </p>
            </div>
            <div>
              {/* Zobrazení ikony pro smazání příspěvku, pokud je uživatel autorem příspěvku */}
              {session?.user?.name === userid && (
                <FaTrash
                  // Volání funkce handleDeleteBlog s ID příspěvku
                  onClick={() => handleDeleteBlog(id)}
                  size={30}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
