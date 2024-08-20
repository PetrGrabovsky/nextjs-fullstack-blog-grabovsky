import prisma from '@/database/prisma';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET handler pro získání detailů blogového příspěvku.
 * Tento handler zpracovává GET požadavky, které obsahují ID příspěvku v query parametru.
 * Na základě ID se vyhledá příslušný záznam v databázi a vrátí se jeho detaily.
 */
export const GET = async (req: NextRequest) => {
  try {
    // Vytvoření URL objektu pro snadnější manipulaci s query parametry
    const url = new URL(req.url);

    // Získání hodnoty query parametru blogId
    const blogID = url.searchParams.get('blogID');

    // Vyhledání detailů příspěvku v databázi na základě ID pomocí Prisma OMR
    const blogDetails = await prisma.post.findUnique({
      where: {
        id: Number(blogID), // Převod ID z query parametru na číslo a použití ve vyhledávání
      },
    });

    // Kontrola, zda byly detaily příspěvku nalezeny
    if (blogDetails) {
      // Pokud byl příspěvek nalezen, vrátí se jeho detaily jako JSON
      return NextResponse.json({
        success: true,
        data: blogDetails,
      });
    } else {
      // Pokud nebyl nalezen, vrátí se chybová zpráva
      return NextResponse.json({
        success: false,
        message: 'Failed to fetch the blog details! Please try again',
      });
    }
    // Pokud dojde k chybě během zpracování požadavku
  } catch (error) {
    console.log(error); // Logování chyby do konzole pro účely ladění

    // Vrácení obecné chybové odpovědi
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again', // Obecná chybová zpráva
    });
  }
};
