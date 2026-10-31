import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { pageDescriptionClasses, pageTitleClasses } from '@/utils/styles';

// Rozhraní pro props komponenty PageSection
interface PageSectionProps {
  title?: string; // Volitelný nadpis stránky
  description?: ReactNode; // Volitelný popis pod nadpisem
  children: ReactNode; // Obsah stránky
  className?: string; // Volitelné TailwindCSS třídy
}

// Společné rozvržení podstránek s nadpisem, popisem a jednotným odsazením
const PageSection: FC<PageSectionProps> = ({ title, description, children, className }) => (
  <section className={clsx('container py-12 sm:py-16', className)}>
    {(title || description) && (
      <header className="mb-10">
        {title && <h1 className={pageTitleClasses}>{title}</h1>}
        {description && <p className={pageDescriptionClasses}>{description}</p>}
      </header>
    )}
    {children}
  </section>
);

export default PageSection;
