import type { Metadata } from 'next';
import { FC } from 'react';
import { notFound } from 'next/navigation';
import BlogDetailsHome from '@/components/blog-details-home';
import { getPostById, getSession } from '@/database/queries';
import { truncateDescription } from '@/utils/helpers';
import { idSchema } from '@/utils/validation';

// Props stránky BlogDetails, parametry cesty jsou asynchronní (Promise)
interface BlogDetailsProps {
  params: Promise<{ id: string }>;
}

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
 * Načte detail příspěvku včetně komentářů přímo z databáze a předá jej komponentě
 * BlogDetailsHome. Nové komentáře se zobrazí díky revalidaci v server action.
 */
const BlogDetails: FC<BlogDetailsProps> = async ({ params }) => {
  const [post, session] = await Promise.all([loadPost(params), getSession()]);

  return <BlogDetailsHome blogData={post} currentUserId={session?.user?.id} />;
};

export default BlogDetails;
