'use client';

import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { menuItems } from '@/utils/data-mappings';
import { MenuItem } from '@/utils/types';
import Button from './button';
import ThemeToggler from './theme-toggler';
import { signIn, signOut, useSession } from 'next-auth/react';

// Funkční komponenta Header
const Header: FC = () => {
  // Stav pro správu sticky stavu
  const [sticky, setSticky] = useState<boolean>(false);
  // Stav pro správu otevření a zavření mobilního menu
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  // Použití useSession hooku pro získání dat o session
  const { data: session } = useSession();

  // Funkce pro nastavení sticky navbaru na základě pozice scrollování
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) setSticky(true);
    else setSticky(false);
  };

  // Funkce pro přepínání stavu mobilního menu
  const handleNavbarToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Funkce pro přihlášení/odhlášení uživatele
  const handleLoginButtonClick = () => {
    if (session) signOut();
    else signIn();
  };

  useEffect(() => {
    // Přidání posluchače události scroll při připojení komponenty
    window.addEventListener('scroll', handleStickyNavbar);

    // Odebrání posluchače události při odmontování komponenty
    return () => {
      window.removeEventListener('scroll', handleStickyNavbar);
    };
  }, []); // Prázdné pole závislostí zajistí, že efekt bude spuštěn pouze při mountu

  // Definice tříd pro header ve stavu sticky
  const stickyHeaderClasses = clsx(
    'shadow-sticky dark:!bg-primary !fixed !z-[9999] !bg-white !bg-opacity-80 backdrop-blur-sm',
    '!transition dark:!bg-opacity-20'
  );

  // Společné třídy pro všechny span elementy hamburger ikony
  const hamburgerLineClasses = clsx(
    'relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white'
  );

  return (
    <div>
      <header
        className={clsx(
          sticky ? stickyHeaderClasses : 'absolute', // Podmíněné přídání tříd pro sticky stav
          'left-0 top-0 flex w-full items-center bg-transparent' // Společné pro oba stavy
        )}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              {/* Odkaz na domovskou stránku ve formě loga */}
              <Link
                href={'/'}
                className={clsx(
                  sticky ? 'py-5 lg:py-2' : 'py-8', // Podmíněné přidání tříd pro sticky stav
                  'block w-full cursor-pointer text-[30px] font-extrabold' // Společné pro oba stavy
                )}
              >
                NextBlog
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                {/* Tlačítko pro přepínání stavu mobilního menu */}
                <button
                  onClick={handleNavbarToggle}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className={clsx(
                    'absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px]',
                    'ring-primary focus:ring-2 lg:hidden'
                  )}
                >
                  {/* Elementy span tvořící ikonu hamburger */}
                  <span
                    className={clsx(navbarOpen && 'top-[7px] rotate-45', hamburgerLineClasses)}
                  />
                  <span className={clsx(navbarOpen && 'opacity-0', hamburgerLineClasses)} />
                  <span
                    className={clsx(navbarOpen && 'top-[-8px] -rotate-45', hamburgerLineClasses)}
                  />
                </button>
                {/* Navigační menu */}
                <nav
                  id="navbarCollapse"
                  className={clsx(
                    navbarOpen ? 'visible top-full opacity-100' : 'invisible top-[120%] opacity-0',
                    'absolute right-0 z-30 w-[250px] rounded border-[0.5px] bg-white',
                    'border-body-color/50 px-6 py-4 duration-300 dark:border-body-color/20',
                    'dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none',
                    'lg:!bg-transparent lg:p-0 lg:opacity-100'
                  )}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {/* Dynamické generování položek menu */}
                    {menuItems.map((menuItem: MenuItem) => (
                      <li key={menuItem.id} className="group relative">
                        <Link
                          href={menuItem.path}
                          className={clsx(
                            'flex py-2 text-base text-dark group-hover:opacity-70',
                            'dark:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6'
                          )}
                        >
                          {menuItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-end gap-4 pr-16 lg:pr-0">
                {/* Zobrazí tlačítko Create pouze po přihlášení */}
                {session && <Button onClick={() => {}} text="Create" />}
                {/* Tlačítko pro přihlášení */}
                <Button onClick={handleLoginButtonClick} text={session ? 'Logout' : 'Login'} />
                <div className="flex items-center gap-3">
                  {/* Komponenta pro přepínání mezi světlým a tmavým tématem */}
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
