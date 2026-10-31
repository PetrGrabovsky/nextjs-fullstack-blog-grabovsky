import clsx from 'clsx';

/**
 * TailwindCSS třídy pro nastavení stylů header elementu v komponentě Header.
 * Tyto třídy se aplikují, když je header element ve sticky stavu, tedy když uživatel
 * scrolluje stránkou.
 */
export const stickyHeaderClasses = clsx(
  'fixed! z-9999! bg-white/80! shadow-sticky backdrop-blur-sm transition! dark:bg-primary/20!'
);

/**
 * Společné třídy pro všechny span elementy hamburger ikony v Header komponentě.
 * Tyto třídy definují vzhled a chování jednotlivých čar ikony hamburger menu.
 */
export const hamburgerLineClasses = clsx(
  'relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white'
);

// Definice opakujících se TailwindCSS tříd pro inputy
export const inputClasses = clsx(
  'w-full rounded-md border border-transparent bg-white px-6 py-3 text-base text-body-color',
  'placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none',
  'dark:bg-[#242B51] dark:shadow-signup'
);

// Definice opakujících se TailwindCSS tříd pro labely
export const labelClasses = 'mb-3 block text-sm font-medium text-dark dark:text-white';

// Definice opakujících se TailwindCSS tříd pro chybové hlášky formulářů
export const errorClasses = 'mt-2 text-sm text-red-500';

// Definice opakujících se TailwindCSS tříd pro tlačítka
export const buttonClasses = clsx(
  'inline-flex items-center justify-center rounded-md bg-primary px-9 py-4 text-base font-medium',
  'text-white transition duration-300 ease-in-out hover:opacity-80 hover:shadow-signup',
  'disabled:cursor-not-allowed disabled:opacity-60'
);

// Definice opakujících se TailwindCSS tříd pro štítek kategorie
export const categoryBadgeClasses = clsx(
  'inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm',
  'font-semibold text-white'
);

// Definice opakujících se TailwindCSS tříd pro nadpis <h2>
export const headingH2Classes = clsx(
  'mb-8 text-3xl leading-tight font-bold text-black sm:text-4xl dark:text-white'
);

// Definice opakujících se TailwindCSS tříd pro nadpis <h3>
export const headingH3Classes = clsx(
  'border-b border-body-color/10 px-8 py-4 text-lg font-semibold text-black',
  'dark:border-white/10 dark:text-white'
);

// Definice opakujících se TailwindCSS tříd pro paragraf <p>
export const paragraphClasses = clsx(
  'mb-8 text-base leading-relaxed font-medium whitespace-pre-line text-body-color sm:text-lg',
  'lg:text-base xl:text-lg'
);

// Definice opakujících se TailwindCSS tříd pro panel (formuláře, boxy v postranním sloupci)
export const panelClasses = clsx(
  'rounded-md bg-primary/3 px-8 py-10 sm:p-[55px] lg:px-8 xl:p-[55px] dark:bg-dark'
);
