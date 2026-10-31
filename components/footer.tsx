import { FC } from 'react';
import { FaGithub } from 'react-icons/fa';
import Logo from './logo';

// Patička aplikace s odkazem na zdrojový kód
const Footer: FC = () => (
  <footer className="border-t border-zinc-200 dark:border-zinc-800">
    <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
      <Logo />
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Built with Next.js, Prisma, Auth.js and Tailwind CSS by Petr Grabovský.
      </p>
      <a
        href="https://github.com/PetrGrabovsky/nextjs-fullstack-blog-grabovsky"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Source code on GitHub"
        className="text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        <FaGithub size={22} />
      </a>
    </div>
  </footer>
);

export default Footer;
