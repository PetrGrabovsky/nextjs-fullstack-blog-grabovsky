import type { Metadata } from 'next';
import { FC } from 'react';
import BlogList from '@/components/blog-list';
import PageSection from '@/components/page-section';
import { getAllPosts } from '@/database/queries';

export const metadata: Metadata = { title: 'All Blogs' };

// Komponenta Blogs zobrazuje seznam všech blogových příspěvků
const Blogs: FC = async () => {
  // Načtení všech blogových příspěvků přímo z databáze
  const blogPostsList = await getAllPosts();

  return (
    <PageSection title="All Blogs">
      <BlogList
        lists={blogPostsList}
        emptyMessage="No blog posts yet. Be the first to write one!"
      />
    </PageSection>
  );
};

export default Blogs;
