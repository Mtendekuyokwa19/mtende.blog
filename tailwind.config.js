/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/blog/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/mdx-components.tsx",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-rowdies)"],
        mono: ["var(--font-roboto-mono)"],
        alltext: ["var(--font-maven-pro)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
