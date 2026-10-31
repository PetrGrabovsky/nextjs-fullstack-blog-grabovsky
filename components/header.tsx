import { FC } from 'react';
import { auth } from '@/auth';
import HeaderClient from './header-client';

/**
 * Serverová část hlavičky.
 * Načte session na serveru, takže se tlačítka Login / Logout / Create vykreslí hned
 * bez čekání na načtení session v prohlížeči.
 */
const Header: FC = async () => {
  const session = await auth();

  return <HeaderClient isLoggedIn={Boolean(session?.user)} />;
};

export default Header;
