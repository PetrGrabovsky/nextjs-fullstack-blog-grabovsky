import { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';
import { buttonClasses, secondaryButtonClasses } from '@/utils/styles';

// Vizuální varianty tlačítka
const variants = {
  primary: buttonClasses,
  secondary: secondaryButtonClasses,
};

// Definice typů pro props komponenty Button (přijímá všechny atributy elementu <button>)
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string; // Text tlačítka
  variant?: keyof typeof variants; // Vizuální varianta tlačítka
}

// Funkční komponenta Button, výchozí typ je "button", aby tlačítko neodesílalo formulář omylem
const Button: FC<ButtonProps> = ({
  text,
  variant = 'primary',
  className,
  type = 'button',
  ...props
}) => (
  <button type={type} className={clsx(variants[variant], className)} {...props}>
    {text}
  </button>
);

export default Button;
