import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { headingH2Classes } from '@/utils/styles';

// Rozhraní pro props komponenty PageSection
interface PageSectionProps {
  title?: string; // Volitelný nadpis sekce
  children: ReactNode; // Obsah sekce
  className?: string; // Volitelné TailwindCSS třídy
}

// Společné rozvržení stránek s odsazením pod absolutně umístěnou hlavičkou
const PageSection: FC<PageSectionProps> = ({ title, children, className }) => (
  <section className={clsx('pt-[150px] pb-[120px]', className)}>
    <div className="container">
      {title && <h1 className={headingH2Classes}>{title}</h1>}
      {children}
    </div>
  </section>
);

export default PageSection;
