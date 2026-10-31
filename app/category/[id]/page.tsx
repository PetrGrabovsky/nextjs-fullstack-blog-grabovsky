import type { Metadata } from 'next';
import { FC } from 'react';
import { notFound } from 'next/navigation';
import CategoryList from '@/components/category-list';
import { getPostsByCategory } from '@/database/queries';
import { categories } from '@/utils/data-mappings';
import { getCategoryLabel } from '@/utils/helpers';
import { isValidCategory } from '@/utils/validation';

// Definice typu props pro stránku Category, parametry cesty jsou asynchronní (Promise)
interface CategoryProps {
  params: Promise<{ id: string }>;
}

// Předgenerování cest pro všechny známé kategorie
export const generateStaticParams = () => categories.map(({ value }) => ({ id: value }));

// Metadata stránky podle názvu kategorie
export const generateMetadata = async ({ params }: CategoryProps): Promise<Metadata> => {
  const { id } = await params;
  if (!isValidCategory(id)) notFound();

  return { title: `${getCategoryLabel(id)} Blogs` };
};

/**
 * Stránka Category.
 * Načte blogové příspěvky podle kategorie z URL přímo z databáze a předá je komponentě
 * CategoryList. Neznámá kategorie vede na stránku 404.
 */
const Category: FC<CategoryProps> = async ({ params }) => {
  const { id } = await params;
  if (!isValidCategory(id)) notFound();

  const list = await getPostsByCategory(id);

  return <CategoryList list={list} currentCategory={id} />;
};

export default Category;
