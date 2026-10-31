'use client';

import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuItems } from '@/utils/data-mappings';
import { buttonClasses, hamburgerLineClasses, stickyHeaderClasses } from '@/utils/styles';
import { signOutAction } from '@/utils/actions';
import ThemeToggler from './theme-toggler';
import SubmitButton from './submit-button';

// Rozhraní pro props komponenty HeaderClient
interface HeaderClientProps {
  isLoggedIn: boolean; // Příznak, zda je uživatel přihlášen
}

// Tlačítka Create a Login / Logout, sdílená pro mobilní i desktopové menu
const AuthButtons: FC<HeaderClientProps & { onNavigate: () => void }> = ({
  isLoggedIn,
  onNavigate,
}) =>
  isLoggedIn ? (
    <>
      <Link href="/create" onClick={onNavigate} className={buttonClasses}>
        Create
      </Link>
      <form action={signOutAction}>
        <SubmitButton text="Logout" pendingText="Logging out..." className="w-full lg:w-auto" />
      </form>
    </>
  ) : (
    <Link href="/login" onClick={onNavigate} className={buttonClasses}>
      Login
    </Link>
  );

// Klientská část hlavičky se sticky stavem a mobilním menu
const HeaderClient: FC<HeaderClientProps> = ({ isLoggedIn }) => {
  // Stav pro správu sticky stavu
  const [sticky, setSticky] = useState<boolean>(false);
  // Stav pro správu otevření a zavření mobilního menu
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  // Aktuální cesta pro zvýraznění aktivní položky menu
  const pathName = usePathname();

  const closeNavbar = () => setNavbarOpen(false);

  useEffect(() => {
    // Nastavení sticky navbaru na základě pozice scrollování
    const handleStickyNavbar = () => setSticky(window.scrollY >= 80);

    handleStickyNavbar();
    window.addEventListener('scroll', handleStickyNavbar, { passive: true });

    // Odebrání posluchače události při odmontování komponenty
    return () => window.removeEventListener('scroll', handleStickyNavbar);
  }, []);

  // Kontrola, zda položka menu odpovídá aktuální stránce
  const isActive = (path: string) =>
    path === '/' ? pathName === '/' : pathName.startsWith(path.split('/').slice(0, 2).join('/'));

  return (
    <header
      className={clsx(
        sticky ? stickyHeaderClasses : 'absolute', // Podmíněné přidání tříd pro sticky stav
        'top-0 left-0 z-40 flex w-full items-center bg-transparent' // Společné pro oba stavy
      )}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4 xl:mr-12">
            {/* Odkaz na domovskou stránku ve formě loga */}
            <Link
              href="/"
              onClick={closeNavbar}
              className={clsx(
                sticky ? 'py-5 lg:py-2' : 'py-8',
                'block w-full text-[30px] font-extrabold text-black dark:text-white'
              )}
            >
              NextBlog
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              {/* Tlačítko pro přepínání stavu mobilního menu */}
              <button
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
                aria-label="Mobile Menu"
                aria-expanded={navbarOpen}
                aria-controls="navbarCollapse"
                className={clsx(
                  'absolute top-1/2 right-4 block translate-y-[-50%] rounded-lg px-3 py-[6px]',
                  'ring-primary focus:ring-2 lg:hidden'
                )}
              >
                {/* Elementy span tvořící ikonu hamburger */}
                <span className={clsx(navbarOpen && 'top-[7px] rotate-45', hamburgerLineClasses)} />
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
                  'absolute right-0 z-30 w-[250px] rounded border-[0.5px] border-body-color/50',
                  'bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark',
                  'lg:visible lg:static lg:w-auto lg:border-none lg:bg-transparent! lg:p-0',
                  'lg:opacity-100'
                )}
              >
                {/* ThemeToggler na malých obrazovkách */}
                <div className="absolute top-6 right-6 z-50 lg:hidden">
                  <ThemeToggler />
                </div>
                <ul className="block lg:flex lg:space-x-12">
                  {/* Dynamické generování položek menu */}
                  {menuItems.map((menuItem) => (
                    <li key={menuItem.id} className="group relative">
                      <Link
                        href={menuItem.path}
                        onClick={closeNavbar}
                        aria-current={isActive(menuItem.path) ? 'page' : undefined}
                        className={clsx(
                          isActive(menuItem.path) ? 'text-primary' : 'text-dark dark:text-white',
                          'flex py-2 text-base group-hover:opacity-70 lg:mr-0 lg:inline-flex',
                          'lg:px-0 lg:py-6'
                        )}
                      >
                        {menuItem.label}
                      </Link>
                    </li>
                  ))}
                  {/* Tlačítka Create a Login / Logout na malých obrazovkách */}
                  <li className="mt-4 flex flex-col gap-2 lg:hidden">
                    <AuthButtons isLoggedIn={isLoggedIn} onNavigate={closeNavbar} />
                  </li>
                </ul>
              </nav>
            </div>
            {/* Tlačítka Create a Login / Logout na větších obrazovkách */}
            <div className="hidden items-center justify-end gap-4 pr-16 lg:flex lg:pr-0">
              <AuthButtons isLoggedIn={isLoggedIn} onNavigate={closeNavbar} />
              {/* Komponenta pro přepínání mezi světlým a tmavým tématem */}
              <ThemeToggler />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderClient;
