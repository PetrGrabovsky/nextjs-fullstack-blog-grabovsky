import { FC, Suspense } from 'react';
import Logo from './logo';
import NavLinks from './nav-links';
import MobileMenu from './mobile-menu';
import ThemeToggler from './theme-toggler';
import UserActions, { UserActionsSkeleton } from './user-actions';

/**
 * Hlavička aplikace.
 * Logo, navigace a přepínač tématu jsou součástí předrenderované stránky. Akce závislé
 * na přihlášení (Login / Write / Logout) se načítají v <Suspense>, takže čtení session
 * nezdržuje zobrazení zbytku stránky.
 */
const Header: FC = () => (
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
          <Suspense fallback={<UserActionsSkeleton />}>
            <UserActions />
          </Suspense>
        </div>
        {/* Mobilní menu */}
        <MobileMenu>
          <Suspense fallback={<UserActionsSkeleton />}>
            <UserActions mobile />
          </Suspense>
        </MobileMenu>
      </div>
    </div>
  </header>
);

export default Header;
