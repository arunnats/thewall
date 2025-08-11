/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        patrick: ['"Patrick Hand"', "cursive"],
        googlesanscode: ['"Google Sans Code"', "monospace"],
      },
    },
  },
  plugins: [],
};
