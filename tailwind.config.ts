import type { Config } from 'tailwindcss'
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons';
import daisyui from 'daisyui';
import containerQueryPlugin from '@tailwindcss/container-queries';
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui, 
    containerQueryPlugin,
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

