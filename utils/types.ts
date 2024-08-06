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
