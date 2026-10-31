'use client';

import { FC } from 'react';
import { useFormStatus } from 'react-dom';
import Button from './button';

// Rozhraní pro props komponenty SubmitButton
interface SubmitButtonProps {
  text: string; // Text tlačítka
  pendingText?: string; // Text zobrazený během odesílání formuláře
  className?: string; // Volitelné TailwindCSS třídy
}

/**
 * Tlačítko pro odeslání formuláře se server action.
 * Během odesílání je tlačítko zablokované, aby nebylo možné formulář odeslat vícekrát.
 */
const SubmitButton: FC<SubmitButtonProps> = ({ text, pendingText, className }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      text={pending ? (pendingText ?? text) : text}
      disabled={pending}
      aria-disabled={pending}
      className={className}
    />
  );
};

export default SubmitButton;
