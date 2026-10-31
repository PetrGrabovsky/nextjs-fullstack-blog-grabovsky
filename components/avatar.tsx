import { FC } from 'react';
import Image from 'next/image';

// Rozhraní pro props komponenty Avatar
interface AvatarProps {
  name: string; // Jméno uživatele (použité pro alt text a iniciálu)
  image?: string | null; // URL avataru
}

// Avatar uživatele, pokud obrázek chybí, zobrazí se iniciála jména
const Avatar: FC<AvatarProps> = ({ name, image }) => (
  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary font-semibold text-white">
    {image ? <Image src={image} alt={name} fill sizes="40px" /> : name.charAt(0).toUpperCase()}
  </div>
);

export default Avatar;
