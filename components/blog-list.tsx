import { FC, ReactNode } from 'react';
import { getSession } from '@/database/queries';
import { Blog } from '@/utils/types';
import EmptyState from './empty-state';
import SingleBlog from './single-blog';

// Interface definující props komponenty BlogList
interface BlogListProps {
  lists: Blog[]; // Seznam blogových příspěvků, které budou zobrazeny
  emptyMessage?: string; // Text zobrazený, pokud seznam neobsahuje žádné příspěvky
  emptyAction?: ReactNode; // Volitelná akce v prázdném stavu
}

/**
 * Komponenta BlogList zobrazuje mřížku blogových příspěvků.
 * Pro každý příspěvek v seznamu používá komponentu SingleBlog.
 */
const BlogList: FC<BlogListProps> = async ({
  lists,
  emptyMessage = 'No blog posts yet.',
  emptyAction,
}) => {
  if (!lists.length) return <EmptyState title={emptyMessage} action={emptyAction} />;

  // Načtení session pro zjištění, u kterých příspěvků zobrazit tlačítko pro smazání
  const session = await getSession();
  const currentUserId = session?.user?.id;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {lists.map((listItem, index) => (
        <SingleBlog
          key={listItem.id}
          blogItem={listItem}
          canDelete={listItem.authorId === currentUserId}
          priority={index < 3}
        />
      ))}
    </div>
  );
};

export default BlogList;
