import { FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { BlogWithComments } from '@/utils/types';
import {
  buttonClasses,
  categoryBadgeClasses,
  headingH2Classes,
  paragraphClasses,
} from '@/utils/styles';
import { formatDate, getCategoryLabel } from '@/utils/helpers';
import Avatar from './avatar';
import CommentForm from './comment-form';
import DeleteCommentButton from './delete-comment-button';
import DeletePostButton from './delete-post-button';

/**
 * Typový interface pro props komponenty BlogDetailsHome.
 * Komponenta přijímá příspěvek včetně komentářů a ID přihlášeného uživatele.
 */
interface BlogDetailsHomeProps {
  blogData: BlogWithComments; // Objekt reprezentující blogový příspěvek
  currentUserId?: string; // ID přihlášeného uživatele, pokud je přihlášen
}

/**
 * Komponenta BlogDetailsHome.
 * Tato komponenta zobrazuje detailní informace o konkrétním blogovém příspěvku,
 * včetně titulku, obrázku, popisu, autora a kategorie.
 * Umožňuje také přidání komentáře k příspěvku a zobrazení diskuze pod příspěvkem.
 */
const BlogDetailsHome: FC<BlogDetailsHomeProps> = ({ blogData, currentUserId }) => {
  const isPostAuthor = blogData.authorId === currentUserId;

  return (
    <section className="pt-[150px] pb-[120px]">
      <div className="container">
        <div className="mx-auto flex flex-col gap-4 lg:w-8/12">
          <article>
            {/* Zobrazení nadpisu příspěvku */}
            <h1 className={headingH2Classes}>{blogData.title}</h1>
            <div
              className={clsx(
                'mb-10 flex flex-wrap items-center justify-between gap-4 border-b',
                'border-body-color/10 pb-4 dark:border-white/10'
              )}
            >
              {/* Sekce s informacemi o autorovi příspěvku */}
              <div className="flex items-center gap-4">
                <Avatar name={blogData.authorName} image={blogData.authorImage} />
                <div>
                  <p className="text-base font-medium text-body-color">
                    By <span className="text-dark dark:text-white">{blogData.authorName}</span>
                  </p>
                  <time
                    dateTime={blogData.createdAt.toISOString()}
                    className="text-sm text-body-color"
                  >
                    {formatDate(blogData.createdAt)}
                  </time>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Odkaz na kategorii blogového příspěvku */}
                <Link href={`/category/${blogData.category}`} className={categoryBadgeClasses}>
                  {getCategoryLabel(blogData.category)}
                </Link>
                {/* Smazání příspěvku pouze pro autora */}
                {isPostAuthor && <DeletePostButton postId={blogData.id} redirectTo="/blogs" />}
              </div>
            </div>
            {/* Obrázek příspěvku */}
            <div className="relative mb-10 aspect-[97/60] w-full overflow-hidden rounded sm:aspect-[97/44]">
              <Image
                src={blogData.image}
                alt={blogData.title}
                fill
                priority
                sizes="(min-width: 992px) 66vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            {/* Zobrazení popisu (obsahu) příspěvku */}
            <p className={paragraphClasses}>{blogData.description}</p>
          </article>
          {/* Sekce pro zobrazení diskuze pod příspěvkem */}
          <section className="w-full py-8 lg:py-16">
            <h2 className="mb-6 text-lg font-bold text-black lg:text-2xl dark:text-white">
              Discussion ({blogData.comments.length})
            </h2>
            {/* Formulář pro přidání komentáře, nebo výzva k přihlášení */}
            {currentUserId ? (
              <CommentForm postId={blogData.id} />
            ) : (
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-body-color">Log in to join the discussion.</p>
                <Link href="/login" className={buttonClasses}>
                  Login
                </Link>
              </div>
            )}
            {/* Seznam komentářů */}
            <ul className="mt-6">
              {blogData.comments.map((comment) => (
                <li
                  key={comment.id}
                  className="border-b border-body-color/10 py-6 text-base dark:border-white/10"
                >
                  <div className="mb-2 flex items-center justify-between gap-4">
                    {/* Jméno autora komentáře, autor příspěvku je označen (Author) */}
                    <p className="text-sm font-semibold text-black dark:text-white">
                      {comment.authorName}
                      {comment.authorId === blogData.authorId && (
                        <span className="ml-2 font-normal text-primary">(Author)</span>
                      )}
                      <time
                        dateTime={comment.createdAt.toISOString()}
                        className="ml-3 font-normal text-body-color"
                      >
                        {formatDate(comment.createdAt)}
                      </time>
                    </p>
                    {/* Smazání komentáře pro autora komentáře a autora příspěvku */}
                    {(comment.authorId === currentUserId || isPostAuthor) && (
                      <DeleteCommentButton commentId={comment.id} />
                    )}
                  </div>
                  <p className="whitespace-pre-line text-body-color">{comment.text}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsHome;
