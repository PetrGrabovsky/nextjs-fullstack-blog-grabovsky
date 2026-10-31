'use server';

import { del, put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signOut } from '@/auth';
import prisma from '@/database/prisma';
import { commentSchema, postSchema } from './validation';
import { CommentFormState, PostFormState } from './types';

/**
 * Server actions aplikace.
 * Každá akce, která mění data, nejprve ověří přihlášeného uživatele a jeho oprávnění.
 * Klient tak už nemůže mazat cizí příspěvky ani přepisovat cizí komentáře.
 */

// Vrátí přihlášeného uživatele, nebo null, pokud uživatel není přihlášen
const getCurrentUser = async () => {
  const session = await auth();
  return session?.user?.id ? session.user : null;
};

// Smaže obrázek z Vercel Blob, chyba při mazání nesmí zablokovat smazání příspěvku
const deleteImage = async (url: string) => {
  try {
    await del(url);
  } catch (error) {
    console.error('Failed to delete image from Vercel Blob:', error);
  }
};

// Odhlášení uživatele a přesměrování na úvodní stránku
export const signOutAction = async () => {
  await signOut({ redirectTo: '/' });
};

/**
 * Vytvoření nového blogového příspěvku.
 * Data formuláře se validují na serveru, obrázek se nahraje do Vercel Blob
 * a po uložení je uživatel přesměrován na detail nového příspěvku.
 */
export const createPost = async (
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> => {
  const user = await getCurrentUser();
  if (!user) return { message: 'You must be logged in to create a post.' };

  const values = {
    title: String(formData.get('title') ?? ''),
    description: String(formData.get('description') ?? ''),
    category: String(formData.get('category') ?? ''),
  };

  const parsed = postSchema.safeParse({ ...values, image: formData.get('image') });

  // Při neúspěšné validaci se vrátí chyby jednotlivých polí a vyplněné hodnoty
  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      values,
      errors: {
        title: fieldErrors.title?.[0],
        description: fieldErrors.description?.[0],
        category: fieldErrors.category?.[0],
        image: fieldErrors.image?.[0],
      },
    };
  }

  const { title, description, category, image } = parsed.data;
  let postId: number;

  try {
    // Nahrání obrázku do Vercel Blob s náhodnou příponou názvu
    const blob = await put(`blog/${image.name}`, image, {
      access: 'public',
      addRandomSuffix: true,
    });

    const post = await prisma.post.create({
      data: {
        title,
        description,
        category,
        image: blob.url,
        authorId: user.id!,
        authorName: user.name ?? 'Anonymous',
        authorImage: user.image,
      },
    });
    postId = post.id;
  } catch (error) {
    console.error('Failed to create post:', error);
    return { values, message: 'Something went wrong! Please try again.' };
  }

  revalidatePath('/', 'layout');
  redirect(`/blogs/${postId}`);
};

/**
 * Smazání blogového příspěvku včetně obrázku a komentářů.
 * Smazat příspěvek může pouze jeho autor.
 */
export const deletePost = async (postId: number) => {
  const user = await getCurrentUser();
  if (!user) return { success: false, message: 'You must be logged in.' };

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) return { success: false, message: 'Post not found.' };
  if (post.authorId !== user.id) return { success: false, message: 'Not allowed.' };

  // Komentáře se smažou automaticky díky onDelete: Cascade
  await prisma.post.delete({ where: { id: postId } });
  await deleteImage(post.image);

  revalidatePath('/', 'layout');
  return { success: true };
};

/**
 * Přidání komentáře k příspěvku.
 * Komentář se ukládá jako samostatný záznam, takže souběžné komentáře se navzájem nepřepíší.
 */
export const addComment = async (
  postId: number,
  _prevState: CommentFormState,
  formData: FormData
): Promise<CommentFormState> => {
  const user = await getCurrentUser();
  if (!user) return { error: 'You must be logged in to comment.' };

  const parsed = commentSchema.safeParse({ text: formData.get('text') });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  try {
    await prisma.comment.create({
      data: {
        text: parsed.data.text,
        postId,
        authorId: user.id!,
        authorName: user.name ?? 'Anonymous',
      },
    });
  } catch (error) {
    console.error('Failed to add comment:', error);
    return { error: 'Something went wrong! Please try again.' };
  }

  revalidatePath(`/blogs/${postId}`);
  return { success: true };
};

/**
 * Smazání komentáře.
 * Komentář může smazat jeho autor nebo autor příspěvku.
 */
export const deleteComment = async (commentId: number) => {
  const user = await getCurrentUser();
  if (!user) return;

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: { post: { select: { authorId: true } } },
  });
  if (!comment || (comment.authorId !== user.id && comment.post.authorId !== user.id)) return;

  await prisma.comment.delete({ where: { id: commentId } });
  revalidatePath(`/blogs/${comment.postId}`);
};
