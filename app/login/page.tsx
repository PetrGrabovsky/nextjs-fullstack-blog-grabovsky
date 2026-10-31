import type { Metadata } from 'next';
import { FC, Suspense } from 'react';
import clsx from 'clsx';
import { redirect } from 'next/navigation';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { signIn } from '@/auth';
import Logo from '@/components/logo';
import { getSession } from '@/database/queries';
import { cardClasses, secondaryButtonClasses } from '@/utils/styles';

export const metadata: Metadata = { title: 'Login' };

// Props stránky Login, callbackUrl určuje, kam se uživatel vrátí po přihlášení
interface LoginProps {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
}

// Dostupní OAuth poskytovatelé pro přihlášení
const providers = [
  { id: 'github', label: 'Continue with GitHub', Icon: FaGithub },
  { id: 'google', label: 'Continue with Google', Icon: FaGoogle },
] as const;

/**
 * Převod callbackUrl na bezpečnou relativní cestu v rámci aplikace.
 * URL se parsuje vůči fiktivnímu originu, takže varianty jako //evil.com, /\evil.com
 * nebo cesty s řídicími znaky, které by prohlížeč přesměroval na cizí web, se odmítnou.
 */
const getSafeCallbackUrl = (value?: string | string[]) => {
  const url = Array.isArray(value) ? value[0] : value;
  if (!url?.startsWith('/')) return '/';

  const base = 'http://local.invalid';
  try {
    const parsed = new URL(url, base);
    return parsed.origin === base ? parsed.pathname + parsed.search + parsed.hash : '/';
  } catch {
    return '/';
  }
};

// Tlačítka poskytovatelů (čtou callbackUrl a session, proto běží v <Suspense>)
const ProviderButtons: FC<LoginProps> = async ({ searchParams }) => {
  const redirectTo = getSafeCallbackUrl((await searchParams).callbackUrl);

  // Přihlášený uživatel je rovnou přesměrován zpět
  const session = await getSession();
  if (session?.user) redirect(redirectTo);

  return providers.map(({ id, label, Icon }) => (
    <form
      key={id}
      action={async () => {
        'use server';
        await signIn(id, { redirectTo });
      }}
    >
      <button type="submit" className={clsx(secondaryButtonClasses, 'w-full py-3')}>
        <Icon size={18} aria-hidden />
        {label}
      </button>
    </form>
  ));
};

/**
 * Stránka Login s výběrem poskytovatele (GitHub nebo Google).
 * Karta je předrenderovaná, tlačítka se doplní po načtení session.
 */
const Login: FC<LoginProps> = ({ searchParams }) => (
  <section className="container flex justify-center py-16 sm:py-24">
    <div className={clsx(cardClasses, 'w-full max-w-md text-center')}>
      <div className="flex justify-center">
        <Logo />
      </div>
      <h1 className="mt-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
        Welcome back
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Sign in to write posts and join the discussion.
      </p>
      <div className="mt-8 flex flex-col gap-3">
        <Suspense
          fallback={providers.map(({ id }) => (
            <div key={id} className="h-12 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
          ))}
        >
          <ProviderButtons searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  </section>
);

export default Login;
