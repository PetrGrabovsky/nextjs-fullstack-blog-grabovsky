'use client';

import { Blog } from '@/utils/types';
import { FC, useEffect } from 'react';
import SingleBlog from './single-blog';
import { useRouter } from 'next/navigation';

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
   * Funkce pro odstranění blogového příspěvku.
   * Odesílá požadavek na server pro smazání příspěvku s daným ID.
   * Po úspěšném odstranění příspěvku obnoví stránku, aby se aktualizoval seznam příspěvků.
   *
   */
  const handleDeleteBlog = async (id: number) => {
    const res = await fetch(`/api/blog-post/delete-post?id=${id}`, {
      method: 'DELETE',
      cache: 'no-store',
    });

    const data = await res.json();

    // Pokud je smazání úspěšné, obnoví stránku
    if (data && data.success) router.refresh();
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
                <SingleBlog handleDeleteBlog={handleDeleteBlog} blogItem={listItem} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
