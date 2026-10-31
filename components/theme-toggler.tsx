'use client';

import { FC } from 'react';
import { useTheme } from 'next-themes';
import { MdDarkMode } from 'react-icons/md';
import { BsSunFill } from 'react-icons/bs';

// Komponenta ThemeToggler pro přepínání mezi světlým a tmavým režimem
const ThemeToggler: FC = () => {
  // resolvedTheme je na serveru undefined, ikony se proto přepínají pouze přes CSS (dark:)
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="text-black dark:text-white"
    >
      {/* Ikona slunce v tmavém režimu a měsíce ve světlém režimu */}
      <BsSunFill size={30} className="hidden dark:block" />
      <MdDarkMode size={30} className="dark:hidden" />
    </button>
  );
};

export default ThemeToggler;
