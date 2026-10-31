import type { Metadata } from 'next';
import { FC, Suspense } from 'react';
import Form from 'next/form';
import { HiOutlineSearch } from 'react-icons/hi';
import BlogList from '@/components/blog-list';
import PageSection from '@/components/page-section';
import SubmitButton from '@/components/submit-button';
import { searchPosts } from '@/database/queries';
import { inputClasses, mutedTextClasses } from '@/utils/styles';

export const metadata: Metadata = { title: 'Search' };

// Props stránky Search, query parametry jsou asynchronní (Promise)
interface SearchProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

// Normalizace vyhledávacího dotazu: odstranění nadbytečných mezer a omezení délky
const normalizeSearchQuery = (query: string) => query.trim().replace(/\s+/g, ' ').slice(0, 100);

// Vyhledávací formulář, odeslání aktualizuje URL a stránku na serveru
const SearchForm: FC<{ query: string }> = ({ query }) => (
  <Form action="/search" role="search" className="flex max-w-2xl gap-3">
    <div className="relative flex-1">
      <label htmlFor="search" className="sr-only">
        Search posts
      </label>
      <HiOutlineSearch
        aria-hidden
        size={20}
        className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-zinc-400"
      />
      <input
        id="search"
        name="q"
        type="search"
        placeholder="Search posts..."
        autoComplete="off"
        // Fokus se nastaví pouze na prázdné stránce vyhledávání, ne při zobrazení výsledků
        autoFocus={!query}
        defaultValue={query}
        className={`${inputClasses} pl-11`}
      />
    </div>
    <SubmitButton text="Search" pendingText="Searching..." />
  </Form>
);

// Formulář s dotazem z URL a výsledky vyhledávání (čte searchParams, proto běží v <Suspense>)
const SearchContent: FC<SearchProps> = async ({ searchParams }) => {
  const { q } = await searchParams;
  const query = normalizeSearchQuery(Array.isArray(q) ? (q[0] ?? '') : (q ?? ''));
  const results = query ? await searchPosts(query) : null;

  return (
    <>
      <SearchForm query={query} />
      {/* Výsledky vyhledávání se zobrazí až po zadání dotazu */}
      {results && (
        <div className="mt-10">
          <h2 className={`${mutedTextClasses} mb-6`}>
            {results.length} result{results.length === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
          </h2>
          <BlogList lists={results} emptyMessage="No posts match your search." />
        </div>
      )}
    </>
  );
};

/**
 * Stránka Search pro vyhledávání blogových příspěvků.
 * Dotaz je uložen v URL (?q=...), takže výsledky lze sdílet odkazem a vyhledávání
 * funguje i bez JavaScriptu. Výsledky jsou cachované podle dotazu.
 */
const Search: FC<SearchProps> = ({ searchParams }) => (
  <PageSection title="Search" description="Find posts by their title or content.">
    <Suspense fallback={<SearchForm query="" />}>
      <SearchContent searchParams={searchParams} />
    </Suspense>
  </PageSection>
);

export default Search;
