'use client';

import { FC, useEffect } from 'react';
import Button from '@/components/button';

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
    <section className="container flex flex-col items-center py-24 text-center sm:py-32">
      <p className="text-sm font-semibold text-red-600 dark:text-red-400">Error</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
        Something went wrong
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        An unexpected error occurred. Please try again.
      </p>
      <Button text="Try again" onClick={retry} className="mt-10" />
    </section>
  );
};

export default ErrorPage;
