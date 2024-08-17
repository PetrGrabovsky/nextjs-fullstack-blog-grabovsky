import prisma from '@/database/prisma';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET handler pro získání blogových příspěvků na základě ID kategorie.
 * Tato funkce zpracovává HTTP GET požadavek na API endpoint a vrací seznam blogových
 * příspěvků, které odpovídají zadanému ID kategorie.
 */
export const GET = async (request: NextRequest) => {
  try {
    // Extrakce parametrů z URL požadavku
    const { searchParams } = new URL(request.url);
    const extractCategoryID = searchParams.get('categoryID'); // Získání hodnoty categoryID

    // Načtení seznamu příspěvků na základě ID kategorie z databáze pomocí Prisma OMR
    const getBlogPostListBasedOnCurrentCategoryID = await prisma.post.findMany({
      where: {
        category: extractCategoryID || '', // Použití zadaného ID, nebo prázdného stringu
      },
    });

    // Kontrola, zda byly nalezeny nějaké příspěvky
    if (getBlogPostListBasedOnCurrentCategoryID) {
      return NextResponse.json({
        success: true,
        data: getBlogPostListBasedOnCurrentCategoryID, // Vrácení nalezených příspěvků v JSON
      });
      // V případě, že nebyly nalezeny žádné příspěvky, vrací chybovou zprávu
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to fetch data! Please try again',
      });
    }
    // Zpracování chyb, které mohou nastat při zpracování požadavku, nebo při komunikaci s databází
  } catch (error) {
    console.log(error); // Logování chyby do konzole pro debugovací účely.

    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again', // Vrácení obecné chybové zprávy
    });
  }
};
