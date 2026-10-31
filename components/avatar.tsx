import { FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

// Rozměry avataru v pixelech podle velikosti
const sizes = { sm: 32, md: 40 };

// Rozhraní pro props komponenty Avatar
interface AvatarProps {
  name: string; // Jméno uživatele (použité pro alt text a iniciálu)
  image?: string | null; // URL avataru
  size?: keyof typeof sizes; // Velikost avataru
}

// Avatar uživatele, pokud obrázek chybí, zobrazí se iniciála jména
const Avatar: FC<AvatarProps> = ({ name, image, size = 'md' }) => (
  <span
    className={clsx(
      'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full',
      'bg-linear-to-br from-primary-500 to-violet-500 font-semibold text-white',
      size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm'
    )}
  >
    {image ? (
      <Image src={image} alt="" width={sizes[size]} height={sizes[size]} />
    ) : (
      <span aria-hidden>{name.charAt(0).toUpperCase()}</span>
    )}
  </span>
);

export default Avatar;
