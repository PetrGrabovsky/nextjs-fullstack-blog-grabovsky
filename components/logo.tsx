import { FC } from 'react';
import Link from 'next/link';

// Logo aplikace s odkazem na úvodní stránku
const Logo: FC = () => (
  <Link href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
    <span
      aria-hidden
      className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary-500 to-violet-500 text-sm font-extrabold text-white shadow-sm"
    >
      N
    </span>
    NextBlog
  </Link>
);

export default Logo;
