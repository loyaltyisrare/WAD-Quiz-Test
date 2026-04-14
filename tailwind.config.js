/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#090909",
          surface: "#121212",
          line: "#2A2A2A",
          text: "#F4F3EF",
          muted: "#A7A39A",
          accent: "#D9D3C5",
          red: "#F33939"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(244,243,239,0.12), 0 8px 32px rgba(0,0,0,0.45)"
      }
    },
  },
  plugins: [],
}

