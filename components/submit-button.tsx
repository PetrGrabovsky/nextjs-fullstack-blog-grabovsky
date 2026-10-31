'use client';

import { FC } from 'react';
import { useFormStatus } from 'react-dom';
import Button, { ButtonProps } from './button';

// Rozhraní pro props komponenty SubmitButton
interface SubmitButtonProps extends Pick<ButtonProps, 'text' | 'variant' | 'className'> {
  pendingText?: string; // Text zobrazený během odesílání formuláře
}

/**
 * Tlačítko pro odeslání formuláře se server action.
 * Během odesílání je tlačítko zablokované, aby nebylo možné formulář odeslat vícekrát.
 */
const SubmitButton: FC<SubmitButtonProps> = ({ text, pendingText, ...props }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      type="submit"
      text={pending ? (pendingText ?? text) : text}
      disabled={pending}
    />
  );
};

export default SubmitButton;
