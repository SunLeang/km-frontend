/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  arkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Branding Colors
        'primary': '#FF4F4F',
        'primary-1': '#4D0000',
        'primary-2': '#800000',
        'primary-3': '#B20000',
        'primary-4': '#FF4F4F',
        'primary-5': '#FFB3B3',
        'primary-6': '#FFE5E6',
        'primary-7': '#FFF5F5',
        'secondary': '#FFA200',
        'secondary-1': '#4D3100',
        'secondary-2': '#805100',
        'secondary-3': '#B27200',
        'secondary-4': '#FFA200',
        'secondary-5': '#FFE3B3',
        'secondary-6': '#FFF6E5',
        'secondary-7': '#FFFBF5',
        'tertiary': '#009DFF',
        'tertiary-1': '#002F4D',
        'tertiary-2': '#004F80',
        'tertiary-3': '#006EB2',
        'tertiary-4': '#009DFF',
        'tertiary-5': '#B3E2FF',
        'tertiary-6': '#E5F5FF',
        'tertiary-7': '#F5FBFF',

        // Text
        'primary-text': '#4C0000',
        'secondary-text': '#4C3100',
        'tertiary-text': '#002F4C',

        // Title
        'title': '#1A1A1A',
        'title-1': '#262626',

        // Subtitle
        'subtitle': '#4D4D4D',
        'subtitle-1': '#F2F2F2',
        'subtitle-2': '#808080',

        // background
        'background': '#F2F2F2',
        'background-1': '#E6E6E6',
        'background-2': '#FFFFFF',

        // Msg status
        'success': '#4caf50',
        'danger': '#fee2e2',
        'warning': '#ea8c02',
        'indigo': '#e0e7ff',
        'light': '#f9fafb',
        'dark': '#242A38'
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}

