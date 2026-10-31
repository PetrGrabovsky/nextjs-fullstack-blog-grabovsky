import { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { getSession } from '@/database/queries';
import { signOutAction } from '@/utils/actions';
import { buttonClasses } from '@/utils/styles';
import Avatar from './avatar';
import SubmitButton from './submit-button';

// Rozhraní pro props komponenty UserActions
interface UserActionsProps {
  mobile?: boolean; // Rozložení pro mobilní menu (tlačítka přes celou šířku, bez avataru)
}

/**
 * Akce uživatele v hlavičce: Write a Logout pro přihlášeného, Login pro nepřihlášeného.
 * Čte session, proto se vykresluje uvnitř <Suspense> (viz Header).
 */
const UserActions: FC<UserActionsProps> = async ({ mobile = false }) => {
  const user = (await getSession())?.user;

  if (!user) {
    return (
      <Link href="/login" className={buttonClasses}>
        Login
      </Link>
    );
  }

  return (
    <>
      {!mobile && <Avatar name={user.name ?? 'User'} image={user.image} size="sm" />}
      <Link href="/create" className={buttonClasses}>
        Write
      </Link>
      <form action={signOutAction}>
        <SubmitButton
          text="Logout"
          pendingText="Logging out..."
          variant="secondary"
          className={clsx(mobile && 'w-full')}
        />
      </form>
    </>
  );
};

// Zástupný obsah zobrazený, než se načte session
export const UserActionsSkeleton: FC = () => (
  <span aria-hidden className="h-10 w-24 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
);

export default UserActions;
