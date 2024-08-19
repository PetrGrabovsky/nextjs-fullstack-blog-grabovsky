import CategoryList from '@/components/category-list';
import { FC } from 'react';

/**
 * Funkce pro načtení příspěvků na základě ID kategorie.
 * Odesílá GET požadavek na API endpoint s připojeným ID kategorie jako parametrem.
 */
const getAllListsByCategory = async (getId: string) => {
  const res = await fetch(`${process.env.URL}/api/category?categoryID=${getId}`, {
    method: 'GET',
    cache: 'no-store', // Zajištění, že se vždy načítají aktuální data z API
  });

  // Parsování odpovědi z API do JSON formátu
  const data = await res.json();

  // Pokud je požadavek úspěšný, vrátí načtená data (blogové příspěvky)
  if (data.success) return data.data;
};

// Definice typu props pro komponentu Category, která obsahuje ID kategorie
interface CategoryProps {
  params: {
    id: string; // ID kategorie předané jako parametr
  };
}

/**
 * Komponenta Category.
 * Tato komponenta zodpovídá za načtení a zobrazení blogových příspěvků podle zadané kategorie.
 * Komponenta příjmá ID kategorie jako parametr z URL, na základě kterého se pomocí funkce
 * getAllListByCategory načtou relevantní příspěvky z API.
 * Následně renderuje komponentu CategoryList pro zobrazení těchto blogových příspěvků.
 */
const Category: FC<CategoryProps> = async ({ params }) => {
  const { id } = params; // Extrakce ID kategorie z parametrů
  const getAllList = await getAllListsByCategory(id); // Načtení příspěvků pro zadanou kategorii

  // Renderování komponenty CategoryList s načtenými příspěvky
  return <CategoryList list={getAllList} />;
};

export default Category;
