'use client';

import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

// Funkční komponenta Header
const Header: FC = () => {
  // Stav pro správu sticky stavu
  const [sticky, setSticky] = useState<boolean>(false);

  // Funkce pro nastavení sticky navbaru na základě pozice scrollování
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) setSticky(true);
    else setSticky(false);
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
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
