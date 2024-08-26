import BlogList from '@/components/blog-list';
import { FC } from 'react';

// Funkce pro získání všech blogových příspěvků pomocí API
const extractAllBlogs = async () => {
  // Odeslání GET požadavku na API pro získání všech blogových příspěvků
  const res = await fetch(`${process.env.URL}/api/blog-post/get-all-posts`, {
    method: 'GET',
    next: {
      /**
       * Tato konfigurace zajišťuje, že žádná data nebudou uchovávána v cache a vždy se
       * získají nejaktuálnější data z API.
       */
      revalidate: 0,
    },
  });

  const data = await res.json();

  // Pokud je odpověď úspěšná vrátí získaná data
  if (data.success) return data.data;
};

// Komponenta Blogs zobrazuje seznam všech blogových příspěvků
const Blogs: FC = async () => {
  // Načtení všech blogových příspěvků
  const blogPostsList = await extractAllBlogs();

  // Vrátí komponentu BlogList s načtenými blogovými příspěvky
  return <BlogList lists={blogPostsList} />;
};

export default Blogs;
