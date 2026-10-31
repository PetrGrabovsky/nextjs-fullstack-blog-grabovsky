import { FC } from 'react';
import { auth } from '@/auth';
import { Blog } from '@/utils/types';
import SingleBlog from './single-blog';

// Interface definující props komponenty BlogList
interface BlogListProps {
  lists: Blog[]; // Seznam blogových příspěvků, které budou zobrazeny
  emptyMessage?: string; // Text zobrazený, pokud seznam neobsahuje žádné příspěvky
}

/**
 * Komponenta BlogList zobrazuje mřížku blogových příspěvků.
 * Pro každý příspěvek v seznamu používá komponentu SingleBlog.
 */
const BlogList: FC<BlogListProps> = async ({ lists, emptyMessage = 'No blog posts yet.' }) => {
  // Načtení session pro zjištění, u kterých příspěvků zobrazit tlačítko pro smazání
  const session = await auth();
  const currentUserId = session?.user?.id;

  if (!lists.length) {
    return <p className="text-lg text-body-color">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
      {lists.map((listItem) => (
        <SingleBlog
          key={listItem.id}
          blogItem={listItem}
          canDelete={listItem.authorId === currentUserId}
        />
      ))}
    </div>
  );
};

export default BlogList;
