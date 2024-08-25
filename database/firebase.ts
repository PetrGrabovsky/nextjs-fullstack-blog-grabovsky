import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from '@/utils/configs';

/**
 * Inicializace Firebase aplikace a úložiště
 * Tento kód inicializuje Firebase aplikaci pomocí konfiguračních údajů z firebaseConfig a získá
 * instanci úložiště (storage) pro nahrávání souborů
 */
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app, 'gs://nextjs-fullstack-grabovsky.appspot.com');
