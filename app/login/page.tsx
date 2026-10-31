import type { Metadata } from 'next';
import { FC } from 'react';
import clsx from 'clsx';
import { redirect } from 'next/navigation';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { auth, signIn } from '@/auth';
import { buttonClasses, panelClasses } from '@/utils/styles';

export const metadata: Metadata = { title: 'Login' };

// Props stránky Login, callbackUrl určuje, kam se uživatel vrátí po přihlášení
interface LoginProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

// Dostupní OAuth poskytovatelé pro přihlášení
const providers = [
  { id: 'github', label: 'Continue with GitHub', Icon: FaGithub },
  { id: 'google', label: 'Continue with Google', Icon: FaGoogle },
] as const;

// Povolení pouze relativních cest, aby nešlo přesměrovat na cizí web
const getSafeCallbackUrl = (url?: string) =>
  url?.startsWith('/') && !url.startsWith('//') ? url : '/';

/**
 * Stránka Login s výběrem poskytovatele (GitHub nebo Google).
 * Přihlášený uživatel je rovnou přesměrován zpět.
 */
const Login: FC<LoginProps> = async ({ searchParams }) => {
  const { callbackUrl } = await searchParams;
  const redirectTo = getSafeCallbackUrl(callbackUrl);

  const session = await auth();
  if (session?.user) redirect(redirectTo);

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container pt-[60px]">
        <div className={clsx(panelClasses, 'mx-auto max-w-[500px] text-center')}>
          <h1 className="mb-3 text-2xl font-bold text-black sm:text-3xl dark:text-white">
            Sign in to NextBlog
          </h1>
          <p className="mb-10 text-base font-medium text-body-color">
            Sign in to create blog posts and join the discussion.
          </p>
          <div className="flex flex-col gap-4">
            {providers.map(({ id, label, Icon }) => (
              <form
                key={id}
                action={async () => {
                  'use server';
                  await signIn(id, { redirectTo });
                }}
              >
                <button type="submit" className={clsx(buttonClasses, 'w-full gap-3')}>
                  <Icon size={20} aria-hidden />
                  {label}
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
