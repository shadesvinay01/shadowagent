/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        syne: ["Syne", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        cyan: {
          400: "#22D3EE",
          500: "#06B6D4",
        },
        purple: {
          500: "#A855F7",
        }
      }
    },
  },
  plugins: [],
}
