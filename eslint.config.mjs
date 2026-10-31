import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

// Konfigurace ESLint (flat config): pravidla Next.js, TypeScript a vypnutí pravidel kolidujících s Prettierem
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  // Ignorování build výstupů a generovaného Prisma klienta
  globalIgnores(['.next/**', 'out/**', 'build/**', 'coverage/**', 'generated/**', 'next-env.d.ts']),
]);
