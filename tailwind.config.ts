import type { Config } from 'tailwindcss'
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons';

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    iconsPlugin({
      collections: getIconCollections(["heroicons"]),
    }),
  ],
  daisyui: {
    themes: false,
    darkTheme: "dark", // name of one of the included themes for dark mode
    prefix: "d-", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
  },
} satisfies Config;

