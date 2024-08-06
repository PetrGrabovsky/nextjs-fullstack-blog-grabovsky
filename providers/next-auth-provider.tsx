'use client';

import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';

// Rozhraní pro props komponenty NextAuthProvider
interface NextAuthProviderProps {
  // Potomci komponenty, kteří budou obaleni poskytovatelem session
  children: ReactNode;
}

// Komponenta poskytující SessionProvider svým potomkům
const NextAuthProvider: FC<NextAuthProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
