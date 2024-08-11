import { CategoryOption, FormControlItem, MenuItem } from './types';

// Pole objektů pro položky menu
export const menuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/', // Adresa domovké (home) stránky
  },
  {
    id: 'category',
    label: 'Category',
    path: '/category', // Adresa category stránky
  },
  {
    id: 'blogs',
    label: 'Blogs',
    path: '/blogs', // Adresa blogs stránky
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
    placeholder: 'Enter Blog Title',
    type: 'text',
    component: 'input',
    options: [],
  },
  {
    id: 'description',
    label: 'Description',
    placeholder: 'Enter Blog Description',
    type: 'text',
    component: 'textarea',
    options: [],
  },
  {
    id: 'category',
    label: 'Category',
    placeholder: 'Choose Blog Category',
    type: '',
    component: 'select',
    options: categories,
  },
];
