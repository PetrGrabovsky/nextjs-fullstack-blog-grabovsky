import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

// Načtení citlivých údajů z environmentálních  proměnných
const clientId = process.env.GITHUB_CLIENT_ID as string;
const clientSecret = process.env.GITHUB_CLIENT_SECRET as string;
const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const secret = process.env.NEXTAUTH_SECRET as string;

// Kontrola, zda jsou všechny environmentální proměnné nastaveny
if (!clientId || !clientSecret || !googleClientId || !googleClientSecret || !secret) {
  throw new Error('Environment variables for authentication or NextAuth secret are missing');
}

// Konfigurace NextAuth
const authOptions: AuthOptions = {
  // Poskytovatelé autentizace
  providers: [
    GithubProvider({
      clientId,
      clientSecret,
    }),
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  // Callbacky pro úpravu session
  callbacks: {
    async session({ session, token }) {
      // Přidání ID tokenu k uživatelskému jménu v session
      if (session?.user && token?.sub) {
        session.user.name = `${session.user.name}_${token.sub}`;
      }

      return session;
    },
  },
  // Tajný klíč pro NextAuth
  secret,
};

// Inicializace NextAuth s konfigurací
const nextAuth = NextAuth(authOptions);

// Export pro GET a POST metody
export { nextAuth as GET, nextAuth as POST };
