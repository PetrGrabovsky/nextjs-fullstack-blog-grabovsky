import { FC } from 'react';
import Link from 'next/link';
import { getSession } from '@/database/queries';
import { signOutAction } from '@/utils/actions';
import { buttonClasses } from '@/utils/styles';
import Avatar from './avatar';
import Logo from './logo';
import NavLinks from './nav-links';
import MobileMenu from './mobile-menu';
import SubmitButton from './submit-button';
import ThemeToggler from './theme-toggler';

/**
 * Hlavička aplikace (server komponenta).
 * Session se načítá na serveru, takže se tlačítka Login / Logout / Write vykreslí hned
 * bez probliknutí. Interaktivní jsou pouze odkazy navigace a mobilní menu.
 */
const Header: FC = async () => {
  const session = await getSession();
  const user = session?.user;

  // Akce přihlášeného / nepřihlášeného uživatele, sdílené pro desktop i mobilní menu
  const authActions = user ? (
    <>
      <Link href="/create" className={buttonClasses}>
        Write
      </Link>
      <form action={signOutAction}>
        <SubmitButton
          text="Logout"
          pendingText="Logging out..."
          variant="secondary"
          className="w-full"
        />
      </form>
    </>
  ) : (
    <Link href="/login" className={buttonClasses}>
      Login
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-lg dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="container flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-10">
          <Logo />
          {/* Navigace na větších obrazovkách */}
          <nav aria-label="Main" className="hidden md:block">
            <NavLinks />
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggler />
          {/* Akce uživatele na větších obrazovkách */}
          <div className="hidden items-center gap-2 md:flex">
            {user && <Avatar name={user.name ?? 'User'} image={user.image} size="sm" />}
            {authActions}
          </div>
          {/* Mobilní menu */}
          <MobileMenu>{authActions}</MobileMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
