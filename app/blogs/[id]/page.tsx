import type { Metadata } from 'next';
import { FC } from 'react';
import { notFound } from 'next/navigation';
import BlogDetailsHome from '@/components/blog-details-home';
import { getAllPosts, getPostById } from '@/database/queries';
import { truncateDescription } from '@/utils/helpers';
import { idSchema } from '@/utils/validation';

// Props stránky BlogDetails, parametry cesty jsou asynchronní (Promise)
interface BlogDetailsProps {
  params: Promise<{ id: string }>;
}

/**
 * Předrenderování detailů existujících příspěvků při buildu.
 * Nové příspěvky se vyrenderují při první návštěvě a uloží do cache (ISR).
 * Cache Components vyžaduje alespoň jednu cestu, proto se při prázdné databázi
 * vrací zástupné ID, které vede na stránku 404.
 */
export const generateStaticParams = async () => {
  const posts = await getAllPosts();
  return posts.length ? posts.map(({ id }) => ({ id: String(id) })) : [{ id: '0' }];
};

// Načtení příspěvku podle ID z URL, neplatné nebo neexistující ID vede na stránku 404
const loadPost = async (params: BlogDetailsProps['params']) => {
  const id = idSchema.safeParse(Number((await params).id));
  if (!id.success) notFound();

  const post = await getPostById(id.data);
  if (!post) notFound();

  return post;
};

// Metadata stránky podle titulku a popisu příspěvku
export const generateMetadata = async ({ params }: BlogDetailsProps): Promise<Metadata> => {
  const post = await loadPost(params);
  const description = truncateDescription(post.description, 160);

  return {
    title: post.title,
    description,
    openGraph: { title: post.title, description, images: [post.image], type: 'article' },
  };
};

/**
 * Stránka BlogDetails.
 * Příspěvek se načítá z cache (obnovuje se po přidání komentáře nebo smazání příspěvku).
 * Kontrola existence probíhá před streamováním, takže neexistující příspěvek vrací
 * skutečný stavový kód 404.
 */
const BlogDetails: FC<BlogDetailsProps> = async ({ params }) => {
  const post = await loadPost(params);

  return <BlogDetailsHome blogData={post} />;
};

export default BlogDetails;
