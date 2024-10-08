import { Dispatch, SetStateAction } from 'react';

// Definice typu pro kontext GlobalContext
export type GlobalContextType = {
  // Určuje, zda je aplikace ve stavu načítání
  loading: boolean;
  // Funkce pro nastavení stavu načítání
  setLoading: Dispatch<SetStateAction<boolean>>;
  // Data blogového formuláře
  formData: BlogFormData;
  // Funkce pro nastavení dat blogového formuláře
  setFormData: Dispatch<SetStateAction<BlogFormData>>;
  // Vyhledávací dotaz zadaný uživatelem
  searchQuery: string;
  // Funkce pro nastavení vyhledávacího dotazu
  setSearchQuery: Dispatch<SetStateAction<string>>;
  // Výsledky vyhledávání blogových příspěvků
  searchResults: Blog[];
  // Funkce pro nastavení výsledků vyhledávání
  setSearchResults: Dispatch<SetStateAction<Blog[]>>;
};

// Rozhraní pro položky menu
export interface MenuItem {
  id: string; // Unikátní identifikátor
  label: string; // Textový popis
  path: string; // Cesta (URL) pro danou položku menu
}

// Rozhraní pro možnosti kategorie
export interface CategoryOption {
  label: string; // Popis, který bude zobrazen uživateli
  value: string; // Hodnota, která bude použita pro logiku
}

// Rozhraní pro položky formuláře, které definují jednotlivé prvky formuláře
export interface FormControlItem {
  id: string; // Unikátní identifikátor
  label: string; // Popis položky formuláře
  placeholder: string; // Placeholder
  type: string; // Typ vstupu (např. text, email, password...)
  component: string; // Použitá komponenta (např. input, select...)
  options: CategoryOption[]; // Seznam možností, pokud je položka komponenta select
}

// Rozhraní pro data blogového formuláře
export interface BlogFormData {
  title: string; // Název příspěvku
  description: string; // Obsah příspěvku
  image: string; // URL obrázku blogového příspěvku
  category: string; // Kategorie příspěvku
}

// Rozhraní reprezentující blogový příspěvek
export interface Blog {
  id: number; // Unikátní identifikátor
  title: string; // Název příspěvku
  image: string; // Obrázek příspěvku
  description: string; // Obsah příspěvku
  category: string; // Kategorie příspěvku
  userid: string; // ID autora příspěvku
  userimage: string; // URL obrázku autora příspěvku
  comments: string[]; // Pole komentářů k příspěvku
}
