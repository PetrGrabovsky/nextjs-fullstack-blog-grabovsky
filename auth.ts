import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

/**
 * Konfigurace Auth.js (NextAuth v5).
 * Používají se původní názvy environmentálních proměnných, aby nebylo nutné měnit nastavení
 * na Vercelu. Session je uložena v JWT, databáze pro uživatele není potřeba.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  // Vlastní přihlašovací stránka s výběrem poskytovatele
  pages: { signIn: '/login' },
  callbacks: {
    // Při přihlášení se do tokenu uloží stabilní ID uživatele ve tvaru "provider_accountId"
    jwt({ token, account }) {
      if (account) token.uid = `${account.provider}_${account.providerAccountId}`;
      return token;
    },
    // ID uživatele se zpřístupní v session pro kontrolu autorství příspěvků a komentářů
    session({ session, token }) {
      if (typeof token.uid === 'string') session.user.id = token.uid;
      return session;
    },
  },
});
