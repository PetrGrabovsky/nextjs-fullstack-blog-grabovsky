import prisma from '@/database/prisma';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handler pro HTTP GET požadavek, který vyhledává blogové příspěvky na základě dotazu.
 * Zpracovává příchozí požadavek, extrahuje vyhledávací dotaz z parametru URL a provádí
 * vyhledávání v databázi pomocí Prisma klienta
 */
export const GET = async (req: NextRequest) => {
  try {
    // Vytvoření instance URL pro snadnou manipulaci s parametry URL
    const url = new URL(req.url);

    // Extrakce vyhledávacího dotazu z parametrů URL
    const extractQuery = url.searchParams.get('query');

    /**
     * Vyhledání blogových příspěvků v databázi na základě titulku nebo popisu, které obsahují
     * vyhledávací dotaz
     */
    const searchPostList = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: extractQuery || '', // Vyhledávání v titulcích
            },
          },
          {
            description: {
              contains: extractQuery || '', // Vyhledávání v popisech (obsahu)
            },
          },
        ],
      },
    });

    // Pokud jsou nalezeny výsledky, vrátí se zpráva o úspěchu s požadovanými daty
    if (searchPostList) {
      return NextResponse.json({
        success: true,
        data: searchPostList, // Vrácená data nalezených příspěvků
      });
      // Pokud nejsou nalezeny žádné výsledky, vrátí se chybová zpráva
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to search results', // Zpráva o neúspěchu vyhledávání
      });
    }
    // V případě vyjímky vrácení obecné chybové odpovědi
  } catch (error) {
    console.log(error); // Logování chyby do konzole pro ladění

    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again', // Obecná chybová zpráva
    });
  }
};
