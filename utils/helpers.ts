import { categories } from './data-mappings';

// Funkce pro zkrácení textu popisu na zadaný maximální počet znaků
export const truncateDescription = (description: string, maxLength: number) => {
  if (description.length > maxLength) {
    return description.slice(0, maxLength).trimEnd() + '...';
  }
  return description;
};

// Převod hodnoty kategorie na její zobrazovaný název
export const getCategoryLabel = (value: string) =>
  categories.find((category) => category.value === value)?.label ?? value;

// Formátování data pro zobrazení u příspěvků a komentářů
export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);

// Odhad doby čtení textu v minutách (průměrně 200 slov za minutu)
export const getReadingTime = (text: string) =>
  Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));
