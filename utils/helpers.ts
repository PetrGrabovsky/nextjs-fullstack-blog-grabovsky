import { v4 as uuidv4 } from 'uuid';
import { storage } from '@/database/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

/**
 * Funkce pro uložení obrázku do Firebase a získání URL
 * Tato funkce nahrává obrázek do Firebase Storage a vrací URL tohoto obrázku
 * Proces je asynchronní, aby nedošlo k blokování hlavního vlákna
 */
export const handleImageSaveToFirebase = async (file: File): Promise<string> => {
  // Vytvoření reference k souboru s unikátním názvem
  const storageRef = ref(storage, `blog/${uuidv4()}`);
  // Nahrání souboru
  const uploadImg = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadImg.on(
      'state_changed', // Sleduje stav nahrávání
      () => {}, // Nevyužitá funkce pro zpracování změn stavu
      (error) => reject(error), // Pokud dojde k chybě při nahrávání, vrátí ji
      () => {
        // Po úspěšném nahrání souboru získá jeho URL
        getDownloadURL(uploadImg.snapshot.ref).then(resolve).catch(reject);
      }
    );
  });
};
