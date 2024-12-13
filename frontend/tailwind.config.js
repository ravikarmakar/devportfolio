/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1A237E",
        secondary: "#37474F",
        accent: "#00BCD4",
        textLight: "#E0E0E0",
        bgDark: "#121212",
        // Light mode colors
        bgLight: "#ffffff",
        textDark: "#1a1a1a",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
