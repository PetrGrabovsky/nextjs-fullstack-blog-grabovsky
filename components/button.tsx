import { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';
import { buttonClasses } from '@/utils/styles';

// Definice typů pro props komponenty Button (přijímá všechny atributy elementu <button>)
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Text tlačítka
  text: string;
}

// Funkční komponenta Button, výchozí typ je "button", aby tlačítko neodesílalo formulář omylem
const Button: FC<ButtonProps> = ({ text, className, type = 'button', ...props }) => {
  return (
    <button type={type} className={clsx(buttonClasses, className)} {...props}>
      {text}
    </button>
  );
};

export default Button;
