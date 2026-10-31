'use client';

import { FC, ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi';
import { iconButtonClasses } from '@/utils/styles';
import NavLinks from './nav-links';

// Rozhraní pro props komponenty MobileMenu
interface MobileMenuProps {
  children: ReactNode; // Akce uživatele (Write, Login / Logout) vykreslené na serveru
}

// Rozbalovací menu pro malé obrazovky
const MobileMenu: FC<MobileMenuProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  const [lastPathName, setLastPathName] = useState(pathName);

  // Zavření menu při změně stránky (např. po odhlášení), stav se upraví přímo při renderu
  if (pathName !== lastPathName) {
    setLastPathName(pathName);
    setOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className={iconButtonClasses}
      >
        {open ? <HiX size={22} /> : <HiMenu size={22} />}
      </button>
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-16 border-b border-zinc-200 bg-white px-5 py-4 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <nav aria-label="Mobile">
            <NavLinks vertical onNavigate={() => setOpen(false)} />
          </nav>
          <div className="mt-4 grid gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
