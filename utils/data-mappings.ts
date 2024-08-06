import { MenuItem } from './types';

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
