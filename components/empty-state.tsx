import { FC, ReactNode } from 'react';
import { HiOutlineDocumentText } from 'react-icons/hi';

// Rozhraní pro props komponenty EmptyState
interface EmptyStateProps {
  title: string; // Hlavní text prázdného stavu
  action?: ReactNode; // Volitelná akce (např. odkaz na vytvoření příspěvku)
}

// Prázdný stav zobrazený, pokud seznam neobsahuje žádné položky
const EmptyState: FC<EmptyStateProps> = ({ title, action }) => (
  <div className="flex flex-col items-center rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
    <HiOutlineDocumentText size={40} className="text-zinc-400" aria-hidden />
    <p className="mt-4 text-base font-medium text-zinc-600 dark:text-zinc-400">{title}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
