import BlogDetailsHome from '@/components/blog-details-home';
import { FC } from 'react';

/**
 * Asynchronní funkce extractBlockDetails pro získání detailů blogového příspěvku.
 * Tato funkce odesílá GET požadavek na API, které vrací detaily příspěvku na základě jeho ID.
 * Data jsou vrácena, pokud je požadavek úspěšný.
 */
const extractBlogDetails = async (id: string) => {
  const res = await fetch(`${process.env.URL}/api/blog-post/blog-details?blogID=${id}`, {
    method: 'GET',
    cache: 'no-store', // Zajištění, že se vždy načítají aktualní data, cache se nevyužívá
  });

  const data = await res.json(); // Parsování odpovědi z API do JSON formátu

  if (data.success) return data.data; // Pokud je požadavek úspěšný,vrací se data příspěvku
};

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
