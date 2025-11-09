const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage:{
        'bgI':'url("src/assets/bg.jpg")'
      }
    },
  },
  plugins: [
    flowbite.plugin(),
    require('daisyui'),
  ],
}

