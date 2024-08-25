import { v4 as uuidv4 } from 'uuid';
import { storage } from '@/database/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

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
