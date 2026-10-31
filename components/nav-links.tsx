'use client';

import { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuItems } from '@/utils/data-mappings';

// Rozhraní pro props komponenty NavLinks
interface NavLinksProps {
  vertical?: boolean; // Svislé rozložení pro mobilní menu
  onNavigate?: () => void; // Callback po kliknutí na odkaz (zavření mobilního menu)
}

// Kontrola, zda položka menu odpovídá aktuální stránce (podle prvního segmentu cesty)
const isActivePath = (pathName: string, path: string) => {
  const section = '/' + path.split('/')[1];
  return section === '/' ? pathName === '/' : pathName.startsWith(section);
};

// Odkazy hlavní navigace se zvýrazněním aktivní stránky
const NavLinks: FC<NavLinksProps> = ({ vertical = false, onNavigate }) => {
  const pathName = usePathname();

  return (
    <ul className={clsx('flex', vertical ? 'flex-col gap-1' : 'items-center gap-1')}>
      {menuItems.map((menuItem) => {
        const active = isActivePath(pathName, menuItem.path);

        return (
          <li key={menuItem.id}>
            <Link
              href={menuItem.path}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={clsx(
                'block rounded-lg px-3 py-2 text-sm font-medium transition',
                active
                  ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              )}
            >
              {menuItem.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
