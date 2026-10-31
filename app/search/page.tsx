import type { Metadata } from 'next';
import { FC } from 'react';
import clsx from 'clsx';
import Form from 'next/form';
import BlogList from '@/components/blog-list';
import SubmitButton from '@/components/submit-button';
import { searchPosts } from '@/database/queries';
import { inputClasses, panelClasses } from '@/utils/styles';

export const metadata: Metadata = { title: 'Search' };

// Props stránky Search, query parametry jsou asynchronní (Promise)
interface SearchProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

// Normalizace vyhledávacího dotazu: odstranění nadbytečných mezer
const normalizeSearchQuery = (query: string) => query.trim().replace(/\s+/g, ' ');

/**
 * Stránka Search pro vyhledávání blogových příspěvků.
 * Dotaz je uložen v URL (?q=...), takže výsledky lze sdílet odkazem a vyhledávání
 * funguje i bez JavaScriptu. Vyhledávání probíhá na serveru přímo v databázi.
 */
const Search: FC<SearchProps> = async ({ searchParams }) => {
  const { q } = await searchParams;
  const query = normalizeSearchQuery(Array.isArray(q) ? (q[0] ?? '') : (q ?? ''));
  const results = query ? await searchPosts(query) : null;

  return (
    <section className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container pt-[60px]">
        <div className={clsx(panelClasses, 'mb-12 lg:mb-5')}>
          {/* Nadpis vyhledávací sekce */}
          <h1 className="mb-6 text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl dark:text-white">
            Search any blog post
          </h1>
          {/* Vyhledávací formulář, odeslání aktualizuje URL a stránku na serveru */}
          <Form action="/search" className="flex flex-col gap-4 sm:flex-row">
            <label htmlFor="search" className="sr-only">
              Search blogs
            </label>
            <input
              id="search"
              name="q"
              type="search"
              placeholder="Search Blogs"
              autoComplete="off"
              autoFocus
              defaultValue={query}
              className={inputClasses}
            />
            <SubmitButton text="Search" pendingText="Searching..." />
          </Form>
        </div>
        {/* Výsledky vyhledávání se zobrazí až po zadání dotazu */}
        {results && (
          <div className="pt-12">
            <h2 className="mb-8 text-xl font-semibold text-black dark:text-white">
              {results.length} result{results.length === 1 ? '' : 's'} for &quot;{query}&quot;
            </h2>
            <BlogList lists={results} emptyMessage="No search results." />
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
