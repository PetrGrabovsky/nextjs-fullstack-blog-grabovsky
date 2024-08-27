import prisma from '@/database/prisma';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handler pro HTTP POST požadavek na vytvoření nového blogového příspěvku.
 * Zpracovává příchozí požadavek, extrahuje data blogového příspěvku z těla požadavku,
 * provádí validaci dat a následně tato data uloží do databáze pomocí Prisma klienta.
 */
export const POST = async (request: NextRequest) => {
  try {
    // Extrahování dat příspěvku z těla požadavku ve formátu JSON
    const extractPostData = await request.json();

    // Server-side validace dat
    if (!extractPostData.image) {
      return NextResponse.json({
        success: false,
        message: 'Image is required.', // Zpráva pro chybějící obrázek
      });
    }

    if (!extractPostData.title || extractPostData.title.trim().length < 3) {
      return NextResponse.json({
        success: false,
        message: 'Title is required and must be at least 3 characters long.', // Zpráva pro chybějící nebo neplatný titulek
      });
    }

    if (!extractPostData.description || extractPostData.description.trim().length < 50) {
      return NextResponse.json({
        success: false,
        message: 'Description is required and must be at least 50 characters long.', // Zpráva pro chybějící nebo neplatný popis
      });
    }

    if (!extractPostData.category) {
      return NextResponse.json({
        success: false,
        message: 'Category is required.', // Zpráva pro chybějící kategorii
      });
    }

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
    } else {
      return NextResponse.json({
        success: false,
        message: 'Something went wrong! Please try again', // Zpráva o neúspěchu
      });
    }
  } catch (error) {
    console.log(error); // Vypíše chybovou zprávu do konzole.

    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again.', // Obecná chybová zpráva
    });
  }
};
