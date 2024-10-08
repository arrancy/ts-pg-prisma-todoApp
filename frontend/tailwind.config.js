/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "13": "3.25rem",
      },
      colors: {
        "sexyMaroon": "#921A40",
        "sexyPink": "#C75B7A",
        "sexyDarkCream": "#D9ABAB",
        "sexyCream": "#F4D9D0",
      },
    },
  },
  plugins: [],
};
