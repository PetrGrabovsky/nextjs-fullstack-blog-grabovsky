import prisma from '@/database/prisma';
import { NextResponse } from 'next/server';

/**
 * Handler pro HTTP GET požadavek pro získání všech blogových příspěvků.
 * Funkce komunikuje s databází pomocí Prisma klienta, aby načetla všechy dostupné blogové
 * příspěvky, a následně je vrací jako JSON odpověď
 */
export const GET = async () => {
  try {
    // Načtení všech blogových příspěvků z databáze pomocí Prisma klienta
    const getAllBlogPosts = await prisma.post.findMany();

    // Pokud jsou příspěvky úspěšně načteny a existují, vrátí se odpověď o úspěchu
    if (getAllBlogPosts && getAllBlogPosts.length) {
      return NextResponse.json({
        success: true,
        data: getAllBlogPosts, // Vrácení seznamu všech blogových příspěvků.
      });
      // Pokud se nepodaří načíst žádné příspěvky vrátí se chybová odpověď
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to fetch blog posts. Please try again', // Zpráva o neúspěchu
      });
    }
    // Pokud dojde k chybě během zpracování požadavku, vrátí se obecná chyba
  } catch (error) {
    console.log(error); // Vypíše chybovou zprávu do konzole pro ladění

    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again.', // Obecná chybová zpráva
    });
  }
};
