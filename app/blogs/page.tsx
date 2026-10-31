import type { Metadata } from 'next';
import { FC } from 'react';
import Link from 'next/link';
import BlogList from '@/components/blog-list';
import PageSection from '@/components/page-section';
import { getAllPosts } from '@/database/queries';
import { buttonClasses } from '@/utils/styles';

export const metadata: Metadata = { title: 'All Posts' };

// Stránka se seznamem všech blogových příspěvků
const Blogs: FC = async () => {
  const blogPostsList = await getAllPosts();

  return (
    <PageSection title="All posts" description="Stories, ideas and notes from the community.">
      <BlogList
        lists={blogPostsList}
        emptyMessage="No posts yet. Be the first to write one!"
        emptyAction={
          <Link href="/create" className={buttonClasses}>
            Write the first post
          </Link>
        }
      />
    </PageSection>
  );
};

export default Blogs;
