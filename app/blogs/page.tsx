import BlogList from '@/components/blog-list';
import { FC } from 'react';
import { extractAllBlogs } from '@/utils/helpers';

// Komponenta Blogs zobrazuje seznam všech blogových příspěvků
const Blogs: FC = async () => {
  // Načtení všech blogových příspěvků
  const blogPostsList = await extractAllBlogs();

  // Vrátí komponentu BlogList s načtenými blogovými příspěvky
  return <BlogList lists={blogPostsList} />;
};

export default Blogs;
