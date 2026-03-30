import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        imxRed: "#8f2f2f",
        imxGold: "#d3a65a",
        imxDark: "#0f1116",
        imxLight: "#f6f2e9",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"],
        brand: ["var(--font-spartan)", "sans-serif"],
      },
    },
  },
};

export default config;
