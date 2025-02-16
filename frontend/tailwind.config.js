import daisyui from 'daisyui';

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // 🛠️ Ajoute cette ligne !
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Ajout de DaisyUI
};
