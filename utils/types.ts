import type { DefaultSession } from 'next-auth';
import type { Comment, Post } from '@/generated/prisma/client';

// Rozšíření typu session o ID uživatele, které se nastavuje v auth.ts
declare module 'next-auth' {
  interface Session {
    user: { id?: string } & DefaultSession['user'];
  }
}

// Typy modelů z databáze
export type Blog = Post;
export type BlogWithComments = Post & { comments: Comment[] };

// Rozhraní pro položky menu
export interface MenuItem {
  id: string; // Unikátní identifikátor
  label: string; // Textový popis
  path: string; // Cesta (URL) pro danou položku menu
}

// Rozhraní pro možnosti kategorie
export interface CategoryOption {
  label: string; // Popis, který bude zobrazen uživateli
  value: string; // Hodnota, která bude použita pro logiku
}

// Hodnoty textových polí formuláře pro vytvoření příspěvku
export interface BlogFormValues {
  title: string; // Název příspěvku
  description: string; // Obsah příspěvku
  category: string; // Kategorie příspěvku
}

// Společné vlastnosti položek formuláře pro vytvoření příspěvku
interface FormControlBase {
  id: keyof BlogFormValues; // Identifikátor, odpovídá názvu pole formuláře
  label: string; // Popis položky formuláře
  placeholder: string; // Placeholder
}

// Položka formuláře: textové pole, víceřádkové pole, nebo výběr z možností
export type FormControlItem =
  | (FormControlBase & { component: 'input' | 'textarea' })
  | (FormControlBase & { component: 'select'; options: CategoryOption[] });

// Výsledek server action bez návratových dat
export interface ActionResult {
  success: boolean; // Příznak úspěchu operace
  message?: string; // Chybová zpráva při neúspěchu
}

// Stav formuláře pro vytvoření příspěvku vrácený ze server action
export interface PostFormState {
  values?: BlogFormValues; // Odeslané hodnoty pro opětovné vyplnění formuláře
  errors?: Partial<Record<keyof BlogFormValues | 'image', string>>; // Chyby jednotlivých polí
  message?: string; // Obecná chybová zpráva
}

// Stav formuláře pro přidání komentáře vrácený ze server action
export interface CommentFormState {
  error?: string; // Chybová zpráva
  submissionId?: string; // Unikátní ID úspěšného odeslání (slouží k vyprázdnění formuláře)
}
