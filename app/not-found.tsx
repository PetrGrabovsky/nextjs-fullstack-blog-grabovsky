import { FC } from 'react';
import Link from 'next/link';
import PageSection from '@/components/page-section';
import { buttonClasses, paragraphClasses } from '@/utils/styles';

// Stránka zobrazená pro neexistující cestu, příspěvek nebo kategorii
const NotFound: FC = () => (
  <PageSection title="Page not found">
    <p className={paragraphClasses}>The page you are looking for does not exist.</p>
    <Link href="/blogs" className={buttonClasses}>
      Back to all blogs
    </Link>
  </PageSection>
);

export default NotFound;
