/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bl: "#101010",
        gr: "#444344",
        pdark: "#5641f5",
        plight: "#c7c2fd",
        pmid: "#b5a3d9",
      },
      fontFamily: {
        dmsans: ["'DM Sans'", "'sans-serif'"],
        lato: ["'Lato'", "'sans-serif'"],
      },
    },
  },
  plugins: [],
};
