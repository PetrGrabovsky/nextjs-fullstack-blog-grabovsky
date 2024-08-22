'use client';

import { createContext, FC, ReactNode, useState } from 'react';
import { GlobalContextType } from '@/utils/types';
import { useSession } from 'next-auth/react';
import Spinner from '@/components/spinner';
import { BlogFormData } from '@/utils/types';
import { initialGlobalContextState } from '@/utils/initial-data';
import { Blog } from '@/utils/types';
import { usePathname, useRouter } from 'next/navigation';

// Vytvoření kontextu GlobalContext s výchozím stavem
export const GlobalContext = createContext<GlobalContextType>(initialGlobalContextState);

interface GlobalStateProps {
  children: ReactNode; // Potomci komponenty, které budou obaleny poskytovatelem kontextu
}

// Komponenta GlobalState poskytuje GlobalContext svým potomkům
const GlobalState: FC<GlobalStateProps> = ({ children }) => {
  // Stav a setter pro načítání
  const [loading, setLoading] = useState<boolean>(initialGlobalContextState.loading);
  // Data formuláře pro blogový příspěvek, inicializovaná výchozími hodnotami
  const [formData, setFormData] = useState<BlogFormData>(initialGlobalContextState.formData);
  // Stav a setter pro vyhledávací dotaz
  const [searchQuery, setSearchQuery] = useState<string>(initialGlobalContextState.searchQuery);
  // Stav a setter pro výsledky vyhledávání
  const [searchResults, setSearchResults] = useState<Blog[]>(
    initialGlobalContextState.searchResults
  );
  // Použití useSession hooku pro získání dat o session
  const { data: session } = useSession();
  const pathName = usePathname(); // Získání aktuální cesty URL
  const router = useRouter(); // Použití routeru pro navigaci

  // Pokud není session ještě načtena, zobrazí se Spinner komponenta
  if (session === undefined) return <Spinner />;
  // Pokud není uživatel přihlášen, a je na stránce Create, bude přesměrován na Home
  if (session === null && pathName === '/create') router.push('/');

  return (
    // Poskytuje hodnoty a funkce všem potomkům
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
        formData,
        setFormData,
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
