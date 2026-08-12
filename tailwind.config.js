/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#f6f3ed",
        charcoal: "#22231f",
        sage: "#66715e",
        taupe: "#a99683",
      },
    },
  },
  plugins: [],
};
