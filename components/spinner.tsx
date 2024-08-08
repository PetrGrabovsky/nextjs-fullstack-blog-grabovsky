'use client';

import { FC } from 'react';
import { ProgressBar } from 'react-loader-spinner';

// Funkční komponenta Spinner
const Spinner: FC = () => {
  return (
    <ProgressBar
      height={120} // Výška spinneru
      width={120} // Šířka spinneru
      borderColor="#000000" // Barva rámečku
      barColor="#FFFFFF" // Barva proužku
      ariaLabel="Common Loader" // Popis pro čtečky obrazovek
      wrapperStyle={{ display: 'block', margin: 'auto' }} // Nastavení stylu
    />
  );
};

export default Spinner;
