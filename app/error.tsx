'use client';

import { FC, useEffect } from 'react';
import PageSection from '@/components/page-section';
import Button from '@/components/button';
import { paragraphClasses } from '@/utils/styles';

// Rozhraní pro props chybové stránky
interface ErrorPageProps {
  error: unknown; // Zachycená chyba
  retry: () => void; // Funkce pro opětovné načtení a vykreslení segmentu
}

// Chybová stránka zobrazená při neočekávané chybě (např. nedostupná databáze)
const ErrorPage: FC<ErrorPageProps> = ({ error, retry }) => {
  // Logování chyby do konzole prohlížeče
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageSection title="Something went wrong">
      <p className={paragraphClasses}>An unexpected error occurred. Please try again.</p>
      <Button text="Try again" onClick={retry} />
    </PageSection>
  );
};

export default ErrorPage;
