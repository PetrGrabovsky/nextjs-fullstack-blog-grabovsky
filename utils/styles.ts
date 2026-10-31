import clsx from 'clsx';

/**
 * Sdílené TailwindCSS třídy pro opakující se prvky rozhraní.
 * Udržují jednotný vzhled tlačítek, formulářů a nadpisů napříč aplikací.
 */

// Základ všech tlačítek (velikost, zaoblení, fokus, zakázaný stav)
const buttonBase = clsx(
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold',
  'transition duration-200 disabled:cursor-not-allowed disabled:opacity-60'
);

// Primární tlačítko (hlavní akce)
export const buttonClasses = clsx(
  buttonBase,
  'bg-primary-600 text-white shadow-sm shadow-primary-600/20 hover:bg-primary-500'
);

// Sekundární tlačítko (vedlejší akce)
export const secondaryButtonClasses = clsx(
  buttonBase,
  'border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50',
  'dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800'
);

// Tlačítko s ikonou bez pozadí (mazání, přepnutí tématu)
export const iconButtonClasses = clsx(
  'inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition',
  'hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-50',
  'dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
);

// Vstupní pole formulářů
export const inputClasses = clsx(
  'block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-base text-zinc-900',
  'transition placeholder:text-zinc-400 focus:border-primary-500 focus:ring-4',
  'focus:ring-primary-500/15 focus:outline-none aria-invalid:border-red-500',
  'dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500'
);

// Popisky formulářových polí
export const labelClasses = 'mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300';

// Chybové hlášky formulářů
export const errorClasses = 'mt-2 text-sm text-red-600 dark:text-red-400';

// Štítek kategorie
export const categoryBadgeClasses = clsx(
  'inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold',
  'text-primary-700 dark:bg-primary-500/15 dark:text-primary-300'
);

// Filtrovací čip kategorie (aktivní a neaktivní stav)
export const chipClasses = (active: boolean) =>
  clsx(
    'inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition',
    active
      ? 'border-primary-600 bg-primary-600 text-white'
      : clsx(
          'border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50',
          'dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900'
        )
  );

// Hlavní nadpis stránky
export const pageTitleClasses =
  'text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white';

// Podnadpis / popis pod hlavním nadpisem stránky
export const pageDescriptionClasses = 'mt-3 text-lg text-zinc-600 dark:text-zinc-400';

// Nadpis sekce
export const sectionTitleClasses =
  'text-xl font-semibold tracking-tight text-zinc-900 dark:text-white';

// Karta / panel s ohraničením (formuláře, přihlášení)
export const cardClasses = clsx(
  'rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10',
  'dark:border-zinc-800 dark:bg-zinc-900/50'
);

// Tlumený doplňkový text (datum, autor)
export const mutedTextClasses = 'text-sm text-zinc-500 dark:text-zinc-400';
