import { v4 as uuidv4 } from 'uuid';
import { storage } from '@/database/firebase';
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';

/**
 * Uloží obrázek do Firebase Storage a vrátí URL k tomuto obrázku.
 * Tato funkce nahrává soubor do Firebase Storage, ke je uložen ve složce blog s unikátním
 * náhodně vygenerovaným názvem. Po dokončení nahrávání vrací přímý odkaz (URL) na tento obrázek.
 * V případě chyby při nahrávání nebo získávání URL vrací chybu.
 */
export const handleImageSaveToFirebase = async (file: File): Promise<string> => {
  try {
    /**
     * Vytvoření reference v úložišti Firebase pro nový soubor.
     * Reference zahrnuje složku blog a unikátní název souboru generovaný pomocí UUID.
     */
    const storageRef = ref(storage, `blog/${uuidv4()}`);

    /**
     * Zahájí nahrávání souboru do FirebaseStorage.
     * uploadBytesResumable umožňuje sledování stavu nahrávání
     */
    const uploadImg = uploadBytesResumable(storageRef, file);

    // Asynchronně čeká na dokončení nahrávání
    await new Promise<void>((resolve, reject) => {
      uploadImg.on('state_changed', null, reject, resolve);
    });

    // Po úspěšném nahrání souboru získá URL pro přístup k nahranému souboru.
    return await getDownloadURL(uploadImg.snapshot.ref);
  } catch (error) {
    // Loguje chybu do konzole a vyhodní novou chybu, která může být zachycena volajícím kódem
    console.error('Error uploading image to Firebase:', error);
    throw new Error('Failed to upload image');
  }
};

/**
 * Smaže obrázek z Firebase Storage podle jeho URL.
 * Tato funkce příjmá URL obrázku, extrahuje z něj cestu k souboru ve Firebase Storage
 * a náslědně tento obrázek odstraní.
 */
const deleteImageFromFirebase = async (imageUrl: string): Promise<void> => {
  try {
    // Extrahování cesty k souboru z URL
    const storagePath = imageUrl.split('/o/')[1].split('?')[0];
    const decodedPath = decodeURIComponent(storagePath);

    // Vytvoření reference k souboru na základě extrahované cesty¨
    const imageRef = ref(storage, decodedPath);

    // Smazání souboru z Firebase Storage
    await deleteObject(imageRef);
  } catch (error) {
    // Logování chyby do konzole a vyhození nové chyby
    console.error('Error deleting image from Firebase:', error);

    throw new Error('Failed to delete image');
  }
};

/**
 * Funkce pro odstranění blogového příspěvku a přidruženého obrázku.
 * Nejprve odstraní obrázek z Firebase Storage pomocí jeho URL, poté odešle požadavek na server
 * pro smazání příspěvku s daným ID
 */
export const handleDeleteBlogPost = async (id: number, imageUrl: string): Promise<boolean> => {
  try {
    // Odstraní obrázek z Firebase Storage
    await deleteImageFromFirebase(imageUrl);

    // Odešle požadavek na smazání příspěvku
    const res = await fetch(`/api/blog-post/delete-post?id=${id}`, {
      method: 'DELETE',
      cache: 'no-store',
    });

    const data = await res.json();

    // Pokud je odstranění úspěšné vrátí true
    return data && data.success;
  } catch (error) {
    console.error('Error deleting blog post or image:', error);

    // Pokud není odstranění úspěšné vrátí false
    return false;
  }
};
