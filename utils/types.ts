import { Dispatch, SetStateAction } from 'react';

// Definice typu pro kontext GlobalContext
export type GlobalContextType = {
  // Určuje, zda je aplikace ve stavu načítání
  loading: boolean;
  // Funkce pro nastavení stavu načítání
  setLoading: Dispatch<SetStateAction<boolean>>;
};
