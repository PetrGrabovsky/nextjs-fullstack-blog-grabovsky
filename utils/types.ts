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
export type BlogComment = Comment;
export type BlogWithComments = Post & { comments: Comment[] };

// Přihlášený uživatel předávaný do klientských komponent
export interface CurrentUser {
  id: string;
  name?: string | null;
  image?: string | null;
}

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

// Rozhraní pro položky formuláře, které definují jednotlivé prvky formuláře
export interface FormControlItem {
  id: keyof BlogFormValues; // Unikátní identifikátor, odpovídá názvu pole formuláře
  label: string; // Popis položky formuláře
  placeholder: string; // Placeholder
  type: string; // Typ vstupu (např. text, email, password...)
  component: 'input' | 'textarea' | 'select'; // Použitá komponenta
  options: CategoryOption[]; // Seznam možností, pokud je položka komponenta select
}

// Hodnoty textových polí formuláře pro vytvoření příspěvku
export interface BlogFormValues {
  title: string; // Název příspěvku
  description: string; // Obsah příspěvku
  category: string; // Kategorie příspěvku
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
  success?: boolean; // Příznak úspěšného uložení
}
