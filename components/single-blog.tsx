import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Blog } from '@/utils/types';
import { categoryBadgeClasses } from '@/utils/styles';
import { getCategoryLabel, truncateDescription } from '@/utils/helpers';
import Avatar from './avatar';
import DeletePostButton from './delete-post-button';
import PostMeta from './post-meta';

// Interface definující props komponenty SingleBlog
interface SingleBlogProps {
  blogItem: Blog; // Objekt reprezentující jednotlivý blogový příspěvek
  canDelete: boolean; // Příznak, zda je přihlášený uživatel autorem příspěvku
  priority?: boolean; // Přednostní načtení obrázku (karty viditelné hned po načtení stránky)
}

/**
 * Komponenta SingleBlog.
 * Karta blogového příspěvku s obrázkem, kategorií, titulkem, úryvkem textu a autorem.
 * Celá karta je klikatelná (odkaz přes titulek roztažený na celou kartu), tlačítko pro
 * smazání se zobrazuje pouze autorovi příspěvku.
 */
const SingleBlog: FC<SingleBlogProps> = ({ blogItem, canDelete, priority = false }) => {
  const { id, image, category, title, description, authorName, authorImage, createdAt } = blogItem;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:shadow-black/30">
      {/* Obrázek příspěvku s jemným přiblížením při najetí myší */}
      <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={image}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className={categoryBadgeClasses}>{getCategoryLabel(category)}</span>
          <PostMeta createdAt={createdAt} text={description} />
        </div>
        <h2 className="text-lg leading-snug font-semibold text-zinc-900 dark:text-white">
          {/* Pseudo-element roztáhne odkaz přes celou kartu */}
          <Link
            href={`/blogs/${id}`}
            className="line-clamp-2 transition group-hover:text-primary-600 after:absolute after:inset-0 dark:group-hover:text-primary-400"
          >
            {title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {truncateDescription(description, 300)}
        </p>
        {/* Autor příspěvku a tlačítko pro smazání */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar name={authorName} image={authorImage} size="sm" />
            <span className="truncate text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {authorName}
            </span>
          </div>
          {/* Tlačítko leží nad roztaženým odkazem, aby šlo kliknout */}
          {canDelete && <DeletePostButton postId={id} className="relative z-10" />}
        </div>
      </div>
    </article>
  );
};

export default SingleBlog;
