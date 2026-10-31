import { z } from 'zod';
import { categories } from './data-mappings';

// Maximální velikost obrázku (Vercel Functions mají limit těla požadavku 4,5 MB)
export const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

// Kontrola, zda hodnota odpovídá některé z definovaných kategorií
export const isValidCategory = (value: string) =>
  categories.some((category) => category.value === value);

// Validační schéma pro vytvoření blogového příspěvku
export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters long.')
    .max(120, 'Title can be at most 120 characters long.'),
  description: z
    .string()
    .trim()
    .min(50, 'Description must be at least 50 characters long.')
    .max(10000, 'Description can be at most 10 000 characters long.'),
  category: z.string().refine((value) => isValidCategory(value), 'Please choose a category.'),
  image: z
    .instanceof(File, { message: 'Image is required.' })
    .refine((file) => file.size > 0, 'Image is required.')
    .refine((file) => file.type.startsWith('image/'), 'File must be an image.')
    .refine((file) => file.size <= MAX_IMAGE_SIZE, 'Image can be at most 4 MB.'),
});

// Validační schéma pro komentář
export const commentSchema = z.object({
  text: z
    .string()
    .trim()
    .min(3, 'Comment must be at least 3 characters long.')
    .max(1000, 'Comment can be at most 1000 characters long.'),
});
