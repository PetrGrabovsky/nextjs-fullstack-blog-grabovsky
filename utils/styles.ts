import clsx from 'clsx';

/**
 * TailwindCSS třídy pro nastavení stylů header elementu v komponentě Header.
 * Tyto třídy se aplikují, když je header element ve sticky stavu, tedy když uživatel
 * scrolluje stránkou.
 */
export const stickyHeaderClasses = clsx(
  'shadow-sticky dark:!bg-primary !fixed !z-[9999] !bg-white !bg-opacity-80 backdrop-blur-sm',
  '!transition dark:!bg-opacity-20'
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
  'w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color',
  'placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none',
  'dark:bg-[#242B51] dark:shadow-signUp'
);

// Definice opakujících se TailwindCSS tříd pro labely
export const labelClasses = 'text-dark mb-3 block text-sm font-medium dark:text-white';

// Definice opakujících se TailwindCSS tříd pro nadpis <h2>
export const headingH2Classes = clsx(
  'mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl'
);

// Definice opakujících se TailwindCSS tříd pro nadpis <h3>
export const headingH3Classes = clsx(
  'border-b border-body-color border-opacity-10 px-8 py-4 text-lg font-semibold text-black',
  'dark:border-white dark:border-opacity-10 dark:text-white'
);

// Definice opakujících se TailwindCSS tříd pro paragraf <p>
export const paragraphClasses = clsx(
  'mb-8 text-base font-medium text-body-color sm:text-lg lg:text-base leading-relaxed xl:text-lg'
);
