import type { Metadata } from 'next';
import { FC } from 'react';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import BlogDetailsHome from '@/components/blog-details-home';
import { getPostById } from '@/database/queries';
import { truncateDescription } from '@/utils/helpers';

/**
 * Typový interface pro props stránky BlogDetails.
 * V Next.js 15+ jsou parametry cesty asynchronní (Promise).
 */
interface BlogDetailsProps {
  params: Promise<{ id: string }>;
}

// Načtení příspěvku podle ID z URL, neplatné nebo neexistující ID vede na stránku 404
const loadPost = async (params: BlogDetailsProps['params']) => {
  const { id } = await params;
  const postId = Number(id);

  if (!Number.isInteger(postId) || postId <= 0) notFound();

  const post = await getPostById(postId);
  if (!post) notFound();

  return post;
};

// Metadata stránky podle titulku a popisu příspěvku
export const generateMetadata = async ({ params }: BlogDetailsProps): Promise<Metadata> => {
  const post = await loadPost(params);

  return {
    title: post.title,
    description: truncateDescription(post.description, 160),
    openGraph: { images: [post.image] },
  };
};

/**
 * Stránka BlogDetails.
 * Načte detail příspěvku včetně komentářů přímo z databáze a předá jej komponentě
 * BlogDetailsHome. Nové komentáře se zobrazí díky revalidaci v server action.
 */
const BlogDetails: FC<BlogDetailsProps> = async ({ params }) => {
  const [post, session] = await Promise.all([loadPost(params), auth()]);

  return <BlogDetailsHome blogData={post} currentUserId={session?.user?.id} />;
};

export default BlogDetails;
