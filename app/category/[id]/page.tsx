import type { Metadata } from 'next';
import { FC } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogList from '@/components/blog-list';
import PageSection from '@/components/page-section';
import { getPostsByCategory } from '@/database/queries';
import { categories } from '@/utils/data-mappings';
import { getCategoryLabel } from '@/utils/helpers';
import { buttonClasses, chipClasses } from '@/utils/styles';
import { isValidCategory } from '@/utils/validation';

// Props stránky Category, parametry cesty jsou asynchronní (Promise)
interface CategoryProps {
  params: Promise<{ id: string }>;
}

// Předrenderování stránek všech kategorií při buildu
export const generateStaticParams = () => categories.map(({ value }) => ({ id: value }));

// Metadata stránky podle názvu kategorie, neznámá kategorie vede na stránku 404
export const generateMetadata = async ({ params }: CategoryProps): Promise<Metadata> => {
  const { id } = await params;
  if (!isValidCategory(id)) notFound();

  return { title: `${getCategoryLabel(id)} Posts` };
};

/**
 * Stránka Category.
 * Zobrazuje filtrovací čipy všech kategorií a příspěvky ve zvolené kategorii.
 */
const Category: FC<CategoryProps> = async ({ params }) => {
  const { id } = await params;
  if (!isValidCategory(id)) notFound();

  const list = await getPostsByCategory(id);

  return (
    <PageSection
      title={getCategoryLabel(id)}
      description={`${list.length} post${list.length === 1 ? '' : 's'} in this category.`}
    >
      {/* Filtrování podle kategorií */}
      <nav aria-label="Categories" className="mb-10 flex flex-wrap gap-2">
        {categories.map(({ value, label }) => (
          <Link
            key={value}
            href={`/category/${value}`}
            aria-current={value === id ? 'page' : undefined}
            className={chipClasses(value === id)}
          >
            {label}
          </Link>
        ))}
      </nav>
      <BlogList
        lists={list}
        emptyMessage="No posts in this category yet."
        emptyAction={
          <Link href="/create" className={buttonClasses}>
            Write a post
          </Link>
        }
      />
    </PageSection>
  );
};

export default Category;
