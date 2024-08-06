'use client';

import { createContext, FC, ReactNode, useState } from 'react';
import { GlobalContextType } from '@/utils/types';

// Výchozí stav kontextu
const initialState: GlobalContextType = {
  // Inicializace stavu načítání jako false
  loading: false,
  // Výchozí prázdná funkce pro setLoading
  setLoading: () => {},
};

// Vytvoření kontextu GlobalContext s výchozím stavem
export const GlobalContext = createContext<GlobalContextType>(initialState);

interface GlobalStateProps {
  // Potomci komponenty, které budou obaleny poskytovatelem kontextu
  children: ReactNode;
}

// Komponenta GlobalState poskytuje GlobalContext svým potomkům
const GlobalState: FC<GlobalStateProps> = ({ children }) => {
  // Stav a setter pro načítání
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <GlobalContext.Provider value={{ loading, setLoading }}>{children}</GlobalContext.Provider>
  );
};

export default GlobalState;
