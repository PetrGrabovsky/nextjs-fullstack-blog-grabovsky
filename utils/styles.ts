import clsx from 'clsx';

// Definice opakujících se TailwindCSS tříd pro inputy
export const inputClasses = clsx(
  'w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color',
  'placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none',
  'dark:bg-[#242B51] dark:shadow-signUp'
);

// Definice opakujících se TailwindCSS tříd pro labely
export const labelClasses = 'text-dark mb-3 block text-sm font-medium dark:text-white';
