import prisma from '@/database/prisma';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handler pro HTTP POST požadavek na vytvoření nového blogového příspěvku.
 * Zpracovává příchozí požadavek, extrahuje data blogového příspěvku z těla požadavku,
 * a následně tato data uloží do databáze pomocí Prisma klienta.
 */
export const POST = async (request: NextRequest) => {
  try {
    // Extrahování dat příspěvku z těla požadavku ve formátu JSON
    const extractPostData = await request.json();

    // Vytvoření nového záznamu v databázi pomocí Prisma klienta
    const newlyCreatedPost = await prisma.post.create({
      data: extractPostData,
    });

    // Pokud se záznam úspěšně vytvoří, vrátí se pozitivní odpověď
    if (newlyCreatedPost) {
      return NextResponse.json({
        success: true,
        message: 'New blog post added successfully', // Zpráva o úspěchu
      });
      // Pokud se záznam nepodaří vytvořit, vrátí se chybová odpověď
    } else {
      return NextResponse.json({
        success: false,
        message: 'Something went wrong! Please try again', // Zpráva o neúspěchu
      });
    }
    // Pokud dojde k chybě během zpracování požadavku, vrátí se obecná chyba
  } catch (error) {
    console.log(error); // Vypíše chybovou zprávu do konzole.

    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again.', // Obecná chybová zpráva
    });
  }
};
