'use client';

import { ThemeProvider } from 'next-themes';
import { FC, ReactNode } from 'react';

// Rozhraní pro props komponenty NextThemeProvider
interface NextThemeProviderProps {
  // Potomci, kteří budou obaleni poskytovatelem tématu
  children: ReactNode;
}

// Komponenta poskytující ThemeProvider svým potomkům
const NextThemeProvider: FC<NextThemeProviderProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
};

export default NextThemeProvider;
