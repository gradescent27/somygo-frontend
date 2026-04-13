// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, 
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        nunitoSans: ["Nunito Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      container: {
        center: true,
        padding: "2rem",
      },
      mobileContainer: {
        center: true,
        padding: "1rem",
      },
      colors: {
        acBlack: "#131313",
        acGray: "#7E7E7E",
        acBg: "#EEF2FF",
        acblue: "#021BAB",
        acGold: "#F5B800",

      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
     
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
