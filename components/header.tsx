'use client';

import { FC, useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { menuItems } from '@/utils/data-mappings';
import { MenuItem } from '@/utils/types';
import Button from './button';
import ThemeToggler from './theme-toggler';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { GlobalContext } from '@/contexts/global-context';
import { stickyHeaderClasses, hamburgerLineClasses } from '@/utils/styles';

// Funkční komponenta Header
const Header: FC = () => {
  // Stav pro správu sticky stavu
  const [sticky, setSticky] = useState<boolean>(false);
  // Stav pro správu otevření a zavření mobilního menu
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  // Použití useSession hooku pro získání dat o session
  const { data: session } = useSession();
  // Získání funkcí pro aktualizaci výsledků vyhledávání a vyhledávacího dotazu
  const { setSearchResults, setSearchQuery } = useContext(GlobalContext);
  // Použití Next.js routeru pro navigaci mezi stránkami
  const router = useRouter();
  /**
   * Získání aktuální cesty URL pomocí hooku usePathname.
   * pathName se používá k rozpoznání změny stránky a vymazání výsledků vyhledávání při
   * každé změně.
   */
  const pathName = usePathname();

  // Funkce pro nastavení sticky navbaru na základě pozice scrollování
  const handleStickyNavbar = () => {
    setSticky(window.scrollY >= 80);
  };

  // Funkce pro přepínání stavu mobilního menu
  const handleNavbarToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Funkce pro přihlášení/odhlášení uživatele
  const handleLoginButtonClick = () => {
    if (session) signOut();
    else signIn('github');
  };

  // Funkce pro navigaci na stránku vytvoření nového blogu
  const handleCreateButtonClick = () => {
    router.push('/create');
  };

  useEffect(() => {
    // Přidání posluchače události scroll při připojení komponenty
    window.addEventListener('scroll', handleStickyNavbar);

    // Odebrání posluchače události při odmontování komponenty
    return () => {
      window.removeEventListener('scroll', handleStickyNavbar);
    };
  }, []); // Prázdné pole závislostí zajistí, že efekt bude spuštěn pouze při mountu

  /**
   * Tento efekt se spustí při změně URL cesty, vymaže výsledky vyhledávání a resetuje
   * vyhledávací dotaz.
   */
  useEffect(() => {
    setSearchResults([]);
    setSearchQuery('');
  }, [pathName]);

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
                {session && <Button onClick={handleCreateButtonClick} text="Create" />}
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
