import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Include paths for Material Tailwind components
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    // Include paths for NextUI components
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {


    extend: {
      colors: {
        'main-bg': 'f7f4ee',
        // 'white': '#ffffff',
        'dimoran': '#DC6548',
        'dimblack': '#1E1E1E',
        'midnight': '#121063',
        'midgray': '#D9D9D9',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'cyan-500': '#00BCD4',
        'blue-500': '#2196F3',

        // Custom colors
        black: {
          DEFAULT: '#1E1E1E',
          10: '#111111',
          20: '#222222',
          30: '#333333',
          40: '#444444',
          100: '#f7f7f7',
          200: '#f0f0f0',
          300: '#e8e8e8',
          400: '#d9d9d9',
          500: '#bfbfbf',
          600: '#a6a6a6',
          700: '#8c8c8c',
          800: '#737373',
          900: '#4a4a4a',
        }
      },

      screens: {
        // Custom screen sizes
        'min_640': { 'min': '640px' },
        'max_639': { 'max': '639px' },


        // Max-only breakpoints
        'max-xxs': { 'max': '345px' },
        'max-xs': { 'max': '375px' },
        'max-sm': { 'max': '425px' },
        'max-md': { 'max': '768px' },
        'max-lg': { 'max': '1024px' },
        'max-xl': { 'max': '1280px' },
        'max-2xl': { 'max': '1536px' },
        'max-3xl': { 'max': '1920px' },
        'max-4xl': { 'max': '2560px' },

        // Min-only breakpoints
        'min-xs': { 'min': '376px' },
        'min-sm': { 'min': '426px' },
        'min-md': { 'min': '769px' },
        'min-lg': { 'min': '1025px' },
        'min-xl': { 'min': '1281px' },
        'min-2xl': { 'min': '1537px' },
        'min-3xl': { 'min': '1921px' },
        'min-4xl': { 'min': '2561px' },

        // Min and Max together
        'xs-sm': { 'min': '376px', 'max': '425px' },
        'sm-md': { 'min': '426px', 'max': '768px' },
        'md-lg': { 'min': '769px', 'max': '1024px' },
        'lg-xl': { 'min': '1025px', 'max': '1280px' },
        'xl-2xl': { 'min': '1281px', 'max': '1536px' },
        '2xl-3xl': { 'min': '1537px', 'max': '1920px' },
        '3xl-4xl': { 'min': '1921px', 'max': '2560px' },
      },

    },
  },
  darkMode: "class",
  plugins: [nextui()]
}