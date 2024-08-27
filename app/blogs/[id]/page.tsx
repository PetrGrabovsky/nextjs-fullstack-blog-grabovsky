import BlogDetailsHome from '@/components/blog-details-home';
import { FC } from 'react';
import { extractBlogDetails } from '@/utils/helpers';

/**
 * Typový interface pro props komponenty BlogDetails.
 * Komponenta příjmá ID blogového příspěvku prostřednictvím objektu params.
 */
interface BlogDetailsProps {
  params: {
    id: string; // ID příspěvku jako string
  };
}

/**
 * Komponenta BlogDetails
 * Tato komponenta (stránka) slouží k načtení a zobrazení detailních informací o příspěvku.
 * Nejprve se na základě ID načtou jeho detaily pomocí funkce extractBlogDetails.
 * Poté se tyto detaily předají komponentě BlogDetailsHome pro zobrazení.
 */
const BlogDetails: FC<BlogDetailsProps> = async ({ params }) => {
  const { id } = params; // Extrakce ID příspěvku z parametrů

  const blogData = await extractBlogDetails(id); // Načtení detailů příspěvku

  // Rendrování komponenty BlogDetailsHome s načtenými daty blogového příspěvku
  return <BlogDetailsHome blogData={blogData} />;
};

export default BlogDetails;
