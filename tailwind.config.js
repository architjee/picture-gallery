/** @type {import('tailwindcss').Config} */
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
  ],
  daisyui: {
    themes: false,
    darkTheme: "dark", // name of one of the included themes for dark mode
    prefix: "d-", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
  },
}

