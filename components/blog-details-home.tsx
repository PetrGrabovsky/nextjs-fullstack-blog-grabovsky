import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import { BlogWithComments } from '@/utils/types';
import { formatDate, getCategoryLabel } from '@/utils/helpers';
import { categoryBadgeClasses, mutedTextClasses, sectionTitleClasses } from '@/utils/styles';
import Avatar from './avatar';
import CommentComposer from './comment-composer';
import DeleteCommentButton from './delete-comment-button';
import DeletePostButton from './delete-post-button';
import OwnerOnly from './owner-only';
import PostMeta from './post-meta';

/**
 * Typový interface pro props komponenty BlogDetailsHome.
 * Komponenta přijímá příspěvek včetně komentářů.
 */
interface BlogDetailsHomeProps {
  blogData: BlogWithComments; // Objekt reprezentující blogový příspěvek
}

/**
 * Komponenta BlogDetailsHome.
 * Zobrazuje celý blogový příspěvek (titulek, autora, obrázek, obsah) a diskuzi pod ním.
 * Obsah je cachovaný a předrenderovaný, části závislé na přihlášeném uživateli
 * (formulář komentáře, tlačítka pro smazání) se načítají v <Suspense>.
 */
const BlogDetailsHome: FC<BlogDetailsHomeProps> = ({ blogData }) => {
  return (
    <div className="container py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blogs"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          <HiArrowLeft aria-hidden />
          All posts
        </Link>
        {/* Kategorie a datum */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Link href={`/category/${blogData.category}`} className={categoryBadgeClasses}>
            {getCategoryLabel(blogData.category)}
          </Link>
          <PostMeta createdAt={blogData.createdAt} text={blogData.description} />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-balance text-zinc-900 sm:text-5xl dark:text-white">
          {blogData.title}
        </h1>
        {/* Autor příspěvku a smazání pro autora */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar name={blogData.authorName} image={blogData.authorImage} />
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                {blogData.authorName}
              </p>
              <p className={mutedTextClasses}>Author</p>
            </div>
          </div>
          <OwnerOnly ownerIds={[blogData.authorId]}>
            <DeletePostButton postId={blogData.id} redirectToList />
          </OwnerOnly>
        </div>
        {/* Obrázek příspěvku */}
        <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={blogData.image}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
        {/* Obsah příspěvku, zalomení řádků z textu zůstává zachováno */}
        <div className="mt-10 text-lg leading-8 whitespace-pre-line text-zinc-700 dark:text-zinc-300">
          {blogData.description}
        </div>

        {/* Diskuze pod příspěvkem */}
        <section
          aria-labelledby="discussion-heading"
          className="mt-16 border-t border-zinc-200 pt-10 dark:border-zinc-800"
        >
          <h2 id="discussion-heading" className={sectionTitleClasses}>
            Discussion ({blogData.comments.length})
          </h2>
          {/* Formulář pro přidání komentáře, nebo výzva k přihlášení */}
          <div className="mt-6">
            <CommentComposer postId={blogData.id} />
          </div>
          {/* Seznam komentářů */}
          <ul className="mt-8 space-y-6">
            {blogData.comments.map((comment) => (
              <li key={comment.id} className="flex gap-4">
                <Avatar name={comment.authorName} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm">
                      <span className="font-semibold text-zinc-900 dark:text-white">
                        {comment.authorName}
                      </span>
                      {/* Autor příspěvku je u svých komentářů označen */}
                      {comment.authorId === blogData.authorId && (
                        <span className={`${categoryBadgeClasses} ml-2`}>Author</span>
                      )}
                      <time
                        dateTime={comment.createdAt.toISOString()}
                        className="ml-2 text-zinc-500 dark:text-zinc-400"
                      >
                        {formatDate(comment.createdAt)}
                      </time>
                    </p>
                    {/* Smazání komentáře pro autora komentáře a autora příspěvku */}
                    <OwnerOnly ownerIds={[comment.authorId, blogData.authorId]}>
                      <DeleteCommentButton commentId={comment.id} />
                    </OwnerOnly>
                  </div>
                  <p className="mt-1 whitespace-pre-line text-zinc-700 dark:text-zinc-300">
                    {comment.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
};

export default BlogDetailsHome;
