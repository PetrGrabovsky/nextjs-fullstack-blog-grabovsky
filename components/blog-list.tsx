'use client';

import { Blog } from '@/utils/types';
import { FC, useEffect } from 'react';
import SingleBlog from './single-blog';
import { useRouter } from 'next/navigation';
import { handleDeleteBlogPost } from '@/utils/helpers';

// Interface definující props komponenty BlogList
interface BlogListProps {
  lists: Blog[]; // Seznam blogových příspěvků, které budou zobrazeny
}

/**
 * Komponenta BlogList zobrazuje seznam blogových příspěvků
 * Pro každý příspěvek v seznamu používá komponentu SingleBlog
 */
const BlogList: FC<BlogListProps> = ({ lists }) => {
  // Použití hooku useRouter pro možnost navigace a obnovení stránky
  const router = useRouter();

  /**
   * Asynchronní funkce pro odstranění blogového příspěvku a jeho obrázku.
   * Funkce nejprve volá pomocnou funkci handleDeleteBlogPost, která odstraní obrázek z Firebase
   * na základě jeho URL a poté odešle požadavek ke smazání příspěvku z databáze podle ID.
   */
  const handleDeleteBlog = async (id: number, imageUrl: string) => {
    // Volá pomocnou funkci ke smazání příspěvku a přidruženého obrázku
    const success = await handleDeleteBlogPost(id, imageUrl);

    // Pokud je operace úspěšná, stránka se obnoví, aby zobrazila aktuální data
    if (success) router.refresh();
  };

  // Obnovení stránky (refresh) při načtení komponenty pro zajištění aktuálnosti dat
  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <section className="pb-[120px] pt-[120px]">
      <div className="container">
        {/* Mřížka pro zobrazení seznamu blogových příspěvků */}
        <div className="-mx-4 grid grid-cols-3 gap-2">
          {lists?.length &&
            lists.map((listItem: Blog) => (
              <div key={listItem.id} className="px-4">
                {/* Každý příspěvek zobrazen pomocí komponenty SingleBlog */}
                <SingleBlog
                  handleDeleteBlog={() => handleDeleteBlog(listItem.id, listItem.image)}
                  blogItem={listItem}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
