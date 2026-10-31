import { FC, ReactNode, Suspense } from 'react';
import { getSession } from '@/database/queries';

// Rozhraní pro props komponenty OwnerOnly
interface OwnerOnlyProps {
  ownerIds: string[]; // ID uživatelů, kterým se obsah zobrazí (např. autor komentáře a příspěvku)
  children: ReactNode; // Obsah zobrazený pouze vlastníkovi (např. tlačítko pro smazání)
}

// Vnitřní část čtoucí session, která běží až při požadavku
const OwnerOnlyContent: FC<OwnerOnlyProps> = async ({ ownerIds, children }) => {
  const userId = (await getSession())?.user?.id;
  return userId && ownerIds.includes(userId) ? children : null;
};

/**
 * Zobrazí obsah pouze přihlášenému vlastníkovi.
 * Session se čte uvnitř <Suspense>, takže zbytek stránky zůstává předrenderovaný
 * a cachovaný. Skutečné oprávnění se vždy znovu ověřuje v server action.
 */
const OwnerOnly: FC<OwnerOnlyProps> = (props) => (
  <Suspense fallback={null}>
    <OwnerOnlyContent {...props} />
  </Suspense>
);

export default OwnerOnly;
