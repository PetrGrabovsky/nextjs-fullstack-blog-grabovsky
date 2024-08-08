'use client';

import { createContext, FC, ReactNode, useState } from 'react';
import { GlobalContextType } from '@/utils/types';
import { useSession } from 'next-auth/react';
import Spinner from '@/components/spinner';

// Výchozí stav kontextu
const initialState: GlobalContextType = {
  loading: false, // Inicializace stavu načítání jako false
  setLoading: () => {}, //Výchozí prázdná funkce pro setLoading
};

// Vytvoření kontextu GlobalContext s výchozím stavem
export const GlobalContext = createContext<GlobalContextType>(initialState);

interface GlobalStateProps {
  children: ReactNode; // Potomci komponenty, které budou obaleny poskytovatelem kontextu
}

// Komponenta GlobalState poskytuje GlobalContext svým potomkům
const GlobalState: FC<GlobalStateProps> = ({ children }) => {
  // Stav a setter pro načítání
  const [loading, setLoading] = useState<boolean>(false);
  // Použití useSession hooku pro získání dat o session
  const { data: session } = useSession();

  // Pokud není session ještě načtena, zobrazí se Spinner komponenta
  if (session === undefined) return <Spinner />;

  return (
    // Poskytuje hodnoty a funkce všem potomkům
    <GlobalContext.Provider value={{ loading, setLoading }}>{children}</GlobalContext.Provider>
  );
};

export default GlobalState;
