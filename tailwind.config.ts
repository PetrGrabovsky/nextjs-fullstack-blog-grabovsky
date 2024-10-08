import type { Config } from 'tailwindcss';

// Konfigurace pro TailwindCSS
const config: Config = {
  // Soubory, ve kterých bude TailwindCSS hledat třídy
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Soubory v adresáři pages
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Soubory v adresáři components
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Soubory v adresáři app
    './utils/**/*.{js,ts,jsx,tsx}', // Soubory z adresáře utils
  ],
  // Povolení tmavého režimu
  darkMode: 'class',
  theme: {
    // Konfigurace pro kontejner
    container: {
      // Centrovat kontejner
      center: true,
      // Vnitřní odsazení kontejneru
      padding: '1rem',
    },
    // Definice breakpointů pro responzivní design
    screens: {
      xs: '450px',
      sm: '575px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px',
    },
    extend: {
      // Definice vlastních barev
      colors: {
        current: 'currentColor',
        transparent: 'transparent',
        white: '#FFFFFF',
        black: '#090E34',
        dark: '#1D2144',
        primary: '#4A6CF7',
        yellow: '#FBB040',
        'body-color': '#959CB1',
      },
      // Definice stínů
      boxShadow: {
        signUp: '0px 5px 10px rgba(4, 10, 34, 0.2)',
        one: '0px 2px 3px rgba(7, 7, 77, 0.05)',
        sticky: 'inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)',
      },
    },
  },
  // Prostor pro případné přidání pluginů
  plugins: [],
};
export default config;
