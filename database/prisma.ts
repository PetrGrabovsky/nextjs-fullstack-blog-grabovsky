import 'server-only';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@/generated/prisma/client';

// Vytvoření PrismaClient s driver adapterem pro serverless Neon Postgres
const createPrismaClient = () =>
  new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.POSTGRES_URL }),
  });

// Globální proměnná pro uložení instance PrismaClient mezi hot reloady ve vývoji
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Vytvoření nebo použití existující instance PrismaClient
const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
