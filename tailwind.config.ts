import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fff5ed",
          100: "#ffe8d5",
          200: "#ffceaa",
          300: "#ffaa73",
          400: "#fa7b38",
          500: "#e8520f",
          600: "#d63e08",
          700: "#b12c09",
          800: "#8d250f",
          900: "#722210",
          950: "#3d0e06",
        },
      },
      boxShadow: {
        glow: "0 0 80px rgba(232, 82, 15, 0.22)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
