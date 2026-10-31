import { config } from 'dotenv';
import { defineConfig, env } from 'prisma/config';

// Načtení environmentálních proměnných (lokálně z .env.local, na Vercelu jsou již nastavené)
config({ path: ['.env.local', '.env'], quiet: true });

// Konfigurace Prisma CLI (migrace, generování klienta)
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Migrace běží přes přímé připojení bez poolingu
    url: env('POSTGRES_URL_NON_POOLING'),
  },
});
