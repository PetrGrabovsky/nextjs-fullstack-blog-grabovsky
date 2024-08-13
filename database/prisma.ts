import { PrismaClient } from '@prisma/client/extension';

// Definice globální proměnné pro ukládání instance PrismaClient
const globalPrisma = global as unknown as { prisma: PrismaClient };

// Vytvoření nebo použití existující instance PrismaClient
export const prisma = globalPrisma.prisma || new PrismaClient();

/**
 * Pokud se aplikace nachází v prostředí mimo produkci, ukládá instanci PrismaClient
 * do globální proměnné
 */
if (process.env.NODE_ENV !== 'production') globalPrisma.prisma = prisma;

export default prisma;
