'use client';

import { FC } from 'react';
import { useTheme } from 'next-themes';
import { MdDarkMode } from 'react-icons/md';
import { BsSunFill } from 'react-icons/bs';

// Komponenta ThemeToggler pro přepínání mezi světlím a tmavým režimem
const ThemeToggler: FC = () => {
  // Použití hooku useTheme pro zíkání a nastavení aktuálního tématu
  const { theme, setTheme } = useTheme();

  // Funkce pro přepínání mezi tématy
  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={handleToggleTheme}>
      {/* Ikona slunce pro světlý režim a měsíce pro tmavý režim */}
      {theme === 'dark' ? <BsSunFill size={30} /> : <MdDarkMode size={30} />}
    </button>
  );
};

export default ThemeToggler;
