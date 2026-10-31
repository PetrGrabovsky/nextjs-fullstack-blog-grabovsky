'use client';

import { FC } from 'react';
import { useTheme } from 'next-themes';
import { HiMoon, HiSun } from 'react-icons/hi';
import { iconButtonClasses } from '@/utils/styles';

// Komponenta ThemeToggler pro přepínání mezi světlým a tmavým režimem
const ThemeToggler: FC = () => {
  // resolvedTheme je na serveru undefined, ikony se proto přepínají pouze přes CSS (dark:)
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={iconButtonClasses}
    >
      {/* Ikona slunce v tmavém režimu a měsíce ve světlém režimu */}
      <HiSun size={20} className="hidden dark:block" />
      <HiMoon size={20} className="dark:hidden" />
    </button>
  );
};

export default ThemeToggler;
