import { FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Blog } from '@/utils/types';
import { categoryBadgeClasses } from '@/utils/styles';
import { formatDate, getCategoryLabel } from '@/utils/helpers';
import Avatar from './avatar';
import DeletePostButton from './delete-post-button';

// Interface definující props komponenty SingleBlog
interface SingleBlogProps {
  blogItem: Blog; // Objekt reprezentující jednotlivý blogový příspěvek
  canDelete: boolean; // Příznak, zda je přihlášený uživatel autorem příspěvku
}

/**
 * Komponenta SingleBlog.
 * Tato komponenta zobrazuje jeden blogový příspěvek včetně jeho obrázku, titulku, popisu
 * a dalších relevantních informací. Pokud je přihlášený uživatel autorem příspěvku,
 * zobrazí se také ikona pro odstranění příspěvku.
 */
const SingleBlog: FC<SingleBlogProps> = ({ blogItem, canDelete }) => {
  const { id, image, category, title, description, authorName, authorImage, createdAt } = blogItem;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md bg-white shadow-one dark:bg-dark">
      {/* Odkaz na detail příspěvku s obrázkem a štítkem kategorie */}
      <Link href={`/blogs/${id}`} className="relative block aspect-[37/22] w-full">
        <span className={clsx(categoryBadgeClasses, 'absolute top-6 right-6 z-20')}>
          {getCategoryLabel(category)}
        </span>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 768px) 33vw, (min-width: 575px) 50vw, 100vw"
          className="object-cover"
        />
      </Link>
      {/* Kontejner pro textové informace blogového příspěvku */}
      <div className="flex flex-1 flex-col p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
        <h3>
          <Link
            href={`/blogs/${id}`}
            className={clsx(
              'mb-4 block truncate text-xl font-bold text-black hover:text-primary sm:text-2xl',
              'dark:text-white dark:hover:text-primary'
            )}
          >
            {title}
          </Link>
        </h3>
        {/* Zkrácený popis příspěvku na maximálně 2 řádky */}
        <p className="mb-6 line-clamp-2 text-base font-medium text-body-color">{description}</p>
        {/* Informace o autorovi a tlačítko pro smazání */}
        <div className="mt-auto flex items-center justify-between border-t border-body-color/10 pt-6 dark:border-white/10">
          <div className="flex items-center gap-4">
            <Avatar name={authorName} image={authorImage} />
            <div>
              <p className="text-sm font-medium text-dark dark:text-white">By {authorName}</p>
              <time dateTime={createdAt.toISOString()} className="text-xs text-body-color">
                {formatDate(createdAt)}
              </time>
            </div>
          </div>
          {canDelete && <DeletePostButton postId={id} />}
        </div>
      </div>
    </article>
  );
};

export default SingleBlog;
