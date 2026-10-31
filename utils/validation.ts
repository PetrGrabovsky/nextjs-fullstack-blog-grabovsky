import { z } from 'zod';
import { categories } from './data-mappings';

// Maximální velikost obrázku (Vercel Functions mají limit těla požadavku 4,5 MB)
export const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
export const IMAGE_TOO_LARGE_MESSAGE = 'Image can be at most 4 MB.';

// Povolené formáty obrázků a jejich přípony (SVG a další formáty nejsou povoleny)
export const IMAGE_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
} as const;

// Kontrola, zda hodnota odpovídá některé z definovaných kategorií
export const isValidCategory = (value: string) =>
  categories.some((category) => category.value === value);

// Kontrola, zda je typ souboru mezi povolenými formáty obrázků
export const isAllowedImageType = (type: string): type is keyof typeof IMAGE_TYPES =>
  type in IMAGE_TYPES;

// Validační schéma pro ID záznamu předané z klienta
export const idSchema = z.number().int().positive();

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
  category: z.string().refine(isValidCategory, 'Please choose a category.'),
  image: z
    .instanceof(File, { message: 'Image is required.' })
    .refine((file) => file.size > 0, 'Image is required.')
    .refine((file) => isAllowedImageType(file.type), 'Use a JPG, PNG, WebP, GIF or AVIF image.')
    .refine((file) => file.size <= MAX_IMAGE_SIZE, IMAGE_TOO_LARGE_MESSAGE),
});

// Validační schéma pro komentář
export const commentSchema = z.object({
  text: z
    .string()
    .trim()
    .min(3, 'Comment must be at least 3 characters long.')
    .max(1000, 'Comment can be at most 1000 characters long.'),
});
