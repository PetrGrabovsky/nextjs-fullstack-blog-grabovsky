import { CategoryOption, FormControlItem, MenuItem } from './types';

// Pole objektů pro položky menu
export const menuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/', // Adresa domovské (home) stránky
  },
  {
    id: 'blogs',
    label: 'Posts',
    path: '/blogs', // Adresa stránky se všemi příspěvky
  },
  {
    id: 'category',
    label: 'Categories',
    path: '/category/application', // Adresa stránky kategorií (výchozí kategorie)
  },
  {
    id: 'search',
    label: 'Search',
    path: '/search', // Adresa search stránky
  },
];

// Seznam dostupných kategorií pro blogové příspěvky
export const categories: CategoryOption[] = [
  {
    value: 'application',
    label: 'Application',
  },
  {
    value: 'data',
    label: 'Data',
  },
  {
    value: 'software',
    label: 'Software',
  },
  {
    value: 'technology',
    label: 'Technology',
  },
  {
    value: 'science',
    label: 'Science',
  },
];

// Definice formulářových polí pro vytváření blogových příspěvků
export const formControls: FormControlItem[] = [
  {
    id: 'title',
    label: 'Title',
    placeholder: 'Give your post a catchy title',
    component: 'input',
  },
  {
    id: 'category',
    label: 'Category',
    placeholder: 'Choose a category',
    component: 'select',
    options: categories,
  },
  {
    id: 'description',
    label: 'Content',
    placeholder: 'Write your story (at least 50 characters)...',
    component: 'textarea',
  },
];
