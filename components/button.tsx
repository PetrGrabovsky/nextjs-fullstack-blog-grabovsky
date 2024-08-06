import { FC } from 'react';
import clsx from 'clsx';

// Definice typů pro props komponenty Button
interface ButtonProps {
  // Text tlačítka
  text: string;
  // Funkce volaná při kliknutí na tlačítko
  onClick: () => void;
}

// Funkční komponenta Button
const Button: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition',
        'duration-300 ease-in-out hover:opacity-80 hover:shadow-signUp'
      )}
    >
      {text}
    </button>
  );
};

export default Button;
