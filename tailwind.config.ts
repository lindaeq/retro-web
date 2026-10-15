import type { Config } from "tailwindcss";

// The desk is styled in src/app/globals.css; these tokens mirror its palette
// so any new component can use them as Tailwind utilities (bg-cream, text-ink, ...).
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#2b1a14",
        mocha: "#5a3320",
        wood: "#8a5a38",
        caramel: "#b9764a",
        tan: "#d9a07a",
        beige: "#e6d2b5",
        cream: "#fff4ea",
        blush: "#f4b6c8",
        pink: "#ff5fa2",
        "light-pink": "#ffc2dc",
      },
      fontFamily: {
        display: ["var(--righteous)", "sans-serif"],
        pixel: ["var(--silk)", "monospace"],
        lcd: ["var(--vt)", "monospace"],
        sans: ["var(--courier)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
