'use server';

import { del, put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { signOut } from '@/auth';
import prisma from '@/database/prisma';
import { getSession } from '@/database/queries';
import { IMAGE_TYPES, commentSchema, idSchema, postSchema } from './validation';
import { ActionResult, CommentFormState, PostFormState } from './types';

/**
 * Server actions aplikace.
 * Server actions jsou veřejné HTTP endpointy, proto každá akce ověřuje vstupy z klienta,
 * přihlášeného uživatele a jeho oprávnění. Neočekávané chyby se zachytí a uživatel dostane
 * srozumitelnou zprávu místo chybové stránky.
 */

const GENERIC_ERROR = 'Something went wrong! Please try again.';

// Vrátí přihlášeného uživatele s ID, nebo null, pokud uživatel není přihlášen
const getCurrentUser = async () => {
  const user = (await getSession())?.user;
  return user?.id ? { ...user, id: user.id } : null;
};

// Smaže obrázek z Vercel Blob, chyba při mazání nesmí zablokovat zbytek operace
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
 * Data formuláře se validují na serveru, obrázek se nahraje do Vercel Blob pod náhodným
 * názvem s příponou odpovídající typu a po uložení je uživatel přesměrován na nový příspěvek.
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
    const { fieldErrors } = z.flattenError(parsed.error);
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
  const contentType = image.type as keyof typeof IMAGE_TYPES;
  let imageUrl: string | null = null;
  let postId: number;

  try {
    const blob = await put(`blog/${crypto.randomUUID()}.${IMAGE_TYPES[contentType]}`, image, {
      access: 'public',
      contentType,
    });
    imageUrl = blob.url;

    const post = await prisma.post.create({
      data: {
        title,
        description,
        category,
        image: blob.url,
        authorId: user.id,
        authorName: user.name ?? 'Anonymous',
        authorImage: user.image,
      },
    });
    postId = post.id;
  } catch (error) {
    console.error('Failed to create post:', error);
    // Úklid již nahraného obrázku, pokud se příspěvek nepodařilo uložit
    if (imageUrl) await deleteImage(imageUrl);
    return { values, message: GENERIC_ERROR };
  }

  revalidatePath('/', 'layout');
  redirect(`/blogs/${postId}`);
};

/**
 * Smazání blogového příspěvku včetně obrázku a komentářů.
 * Smazat příspěvek může pouze jeho autor. Při mazání z detailu příspěvku se uživatel
 * přesměruje na seznam příspěvků přímo na serveru.
 */
export const deletePost = async (postId: number, redirectToList = false): Promise<ActionResult> => {
  const user = await getCurrentUser();
  if (!user) return { success: false, message: 'You must be logged in.' };

  const id = idSchema.safeParse(postId);
  if (!id.success) return { success: false, message: 'Invalid post.' };

  try {
    const post = await prisma.post.findUnique({
      where: { id: id.data },
      select: { authorId: true, image: true },
    });
    if (!post || post.authorId !== user.id) {
      return { success: false, message: 'Post not found or not allowed.' };
    }

    // Podmínka na autora zabrání smazání cizího příspěvku i při souběžných požadavcích
    const { count } = await prisma.post.deleteMany({ where: { id: id.data, authorId: user.id } });
    if (count) await deleteImage(post.image);
  } catch (error) {
    console.error('Failed to delete post:', error);
    return { success: false, message: GENERIC_ERROR };
  }

  revalidatePath('/', 'layout');
  if (redirectToList) redirect('/blogs');
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

  const id = idSchema.safeParse(postId);
  const parsed = commentSchema.safeParse({ text: formData.get('text') });
  if (!id.success) return { error: 'Invalid post.' };
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  try {
    await prisma.comment.create({
      data: {
        text: parsed.data.text,
        postId: id.data,
        authorId: user.id,
        authorName: user.name ?? 'Anonymous',
      },
    });
  } catch (error) {
    console.error('Failed to add comment:', error);
    return { error: GENERIC_ERROR };
  }

  revalidatePath(`/blogs/${id.data}`);
  return { submissionId: crypto.randomUUID() };
};

/**
 * Smazání komentáře.
 * Komentář může smazat jeho autor nebo autor příspěvku.
 */
export const deleteComment = async (commentId: number): Promise<ActionResult> => {
  const user = await getCurrentUser();
  if (!user) return { success: false, message: 'You must be logged in.' };

  const id = idSchema.safeParse(commentId);
  if (!id.success) return { success: false, message: 'Invalid comment.' };

  try {
    // Smaže se pouze komentář, jehož autorem je uživatel, nebo komentář pod jeho příspěvkem
    const comment = await prisma.comment.findUnique({
      where: { id: id.data },
      select: { postId: true },
    });
    const { count } = await prisma.comment.deleteMany({
      where: { id: id.data, OR: [{ authorId: user.id }, { post: { authorId: user.id } }] },
    });
    if (!comment || !count) return { success: false, message: 'Comment not found or not allowed.' };

    revalidatePath(`/blogs/${comment.postId}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to delete comment:', error);
    return { success: false, message: GENERIC_ERROR };
  }
};
