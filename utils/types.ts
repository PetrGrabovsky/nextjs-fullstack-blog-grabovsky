import { Dispatch, SetStateAction } from 'react';

// Definice typu pro kontext GlobalContext
export type GlobalContextType = {
  // Určuje, zda je aplikace ve stavu načítání
  loading: boolean;
  // Funkce pro nastavení stavu načítání
  setLoading: Dispatch<SetStateAction<boolean>>;
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
