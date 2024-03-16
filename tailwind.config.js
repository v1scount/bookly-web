/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        primary: "#1f2937",
        secondary: "#e7e9ea",
        backgroundLight: "#fff",
        backgroundDark: "#1f2937",
        textLight: "#373D3F",
        textDark: "#e7e9ea",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
