import { BlogFormData, GlobalContextType } from './types';

// Výchozí data pro formulář blogového příspěvku
export const initialBlogFormData: BlogFormData = {
  title: '', // Výchozí titulek
  description: '', // Výchozí obsah
  image: '', // Výchozí obrázek
  category: '', // Výchozí kategorie
};

// Výchozí stav kontextu GlobalContext
export const initialGlobalContextState: GlobalContextType = {
  loading: false, // Inicializace stavu načítání jako false
  setLoading: () => {}, // Výchozí prázdná funkce pro setLoading
  formData: initialBlogFormData, // Inicializace formulářových dat na prázdné hodnoty
  setFormData: () => {}, // Výchozí prázdná funkce pro setFormData
};
