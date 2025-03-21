/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        c: "rgb(12, 14, 15)",
      },
    },
  },
  darkMode: "class",
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
