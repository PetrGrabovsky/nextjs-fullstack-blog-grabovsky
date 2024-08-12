// Konfigurace Firebase načtená z environmentálních proměnných
export const firebaseConfig = {
  // API klíč pro autentizaci požadavků
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  // Doména pro autentizaci uživatelů
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  // ID projektu
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  // Úložiště souborů
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  // ID odesílatele pro Cloud Messaging
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  // ID aplikace
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
  // ID pro Google Analytics měření
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT as string,
};
