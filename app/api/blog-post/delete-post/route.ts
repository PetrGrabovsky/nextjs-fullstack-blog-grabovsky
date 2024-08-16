import prisma from '@/database/prisma';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API handler pro mazání blogových příspěvků.
 * Tento handler zpracovává HTTP DELETE požadavky, extrahuje ID blogového příspěvku z query
 * parametrů URL a následně tento příspěvek odstraní z databáze pomocí Prisma klienta.
 */
export const DELETE = async (req: NextRequest) => {
  try {
    // Extrahování URL požadavku
    const url = new URL(req.url);

    // Získání ID blogového příspěvku který má být smazán z query parametrů
    const extractIdOfBlogItemToBeDeleted = url.searchParams.get('id');

    // Smazání blogového příspěvku v databázi podle jeho ID
    const deletedBlogPost = await prisma.post.delete({
      where: {
        id: Number(extractIdOfBlogItemToBeDeleted), // Převedení ID na číslo
      },
    });

    // Pokud se blogový příspěvek úspěšně odstraní, vrátí pozitivní odpověď
    if (deletedBlogPost) {
      return NextResponse.json({
        success: true,
        message: 'Blog deleted successfully', // Zpráva o úspěšném odstranění
      });
      // Pokud se blogový příspěvek nepodaří odstranit, vrátí se chybová odpověď
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to delete the blog! Please try again', // Zpráva o neúspěchu
      });
    }
    // Pokud dojde k jakékoliv chybě při zpracování požadavku, vrátí se obecná chybová odpověď
  } catch (error) {
    console.log(error); // Logování chyby pro účely debugování

    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again.', // Obecná zpráva o chybě
    });
  }
};
