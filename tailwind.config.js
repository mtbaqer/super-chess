/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      board: {
        black: "#B7C0D8",
        white: "#E8EDF9",
        highlight: "yellow",
      },
    },
    extend: {},
  },
  plugins: [],
};
