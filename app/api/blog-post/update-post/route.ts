import prisma from '@/database/prisma';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API handler pro aktualizaci blogového příspěvku.
 * Tento handler zpracovává PUT požadavky, které obsahují aktualizovaná data blogového příspěvku
 * Na základě ID se záznam v databázi aktualizuje, přičemž se upraví pole komentářů.
 * V případě úspěchu vrací JSON odpověď se zprávou o úspěšné aktualizaci, jinak vrací
 * chybovou zprávu.
 */
export const PUT = async (request: NextRequest) => {
  try {
    // Extrakce JSON dat z požadavku
    const extractData = await request.json();

    // Validace posledního přidaného komentáře
    const newComment = extractData.comments[extractData.comments.length - 1];
    const commentText = newComment.split('|')[0];

    // Kontrola, zda má nový komentář alespoň 3 neprázdné znaky
    if (commentText.trim().length < 3) {
      return NextResponse.json({
        success: false,
        message: 'Comment must be at least 3 characters long.', // Zpráva pro neplatný komentář
      });
    }

    // Aktualizace příspěvku v databázi na základě ID a nových komentářů
    const updatedBlogPost = await prisma.post.update({
      where: {
        id: Number(extractData.id), // Převod ID příspěvku na číslo
      },
      data: {
        comments: extractData.comments, // Aktualizace pole komentářů v příspěvku
      },
    });

    // Kontrola, zda byla aktualizace úspěšná
    if (updatedBlogPost) {
      // Pokud byla aktualizace úspěšná, vrátí se odpověď o úspěchu operace
      return NextResponse.json({
        success: true,
        message: 'Blog post updated', // Zpráva o úspěchu aktualizace
      });
    } else {
      // Pokud aktualizace selhala, vrátí se chybová odpověď
      return NextResponse.json({
        success: false,
        message: 'Failed to update the post! Please try again', // Zpráva o neúspěchu aktualizace
      });
    }
  } catch (error) {
    console.log(error); // Logování chyby pro účely ladění

    // V případě chyby během zpracování požadavku vrátí obecnou chybovou odpověď
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again.', // Obecná chybová zpráva
    });
  }
};
