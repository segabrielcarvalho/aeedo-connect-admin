import headlessuiPlugin from "@headlessui/tailwindcss";
import aspectRatio from "@tailwindcss/aspect-ratio";
import formsPlugin from "@tailwindcss/forms";
import { Config } from "tailwindcss/types/config";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "2rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["2rem", { lineHeight: "2.5rem" }],
      "4xl": ["2.5rem", { lineHeight: "3.5rem" }],
      "5xl": ["3rem", { lineHeight: "3.5rem" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1.1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    extend: {
      transitionTimingFunction: {
        "smooth-in-out": "cubic-bezier(0.25, 0.8, 0.25, 1)",
      },
      transitionDuration: {
        "300": "300ms",
        "500": "500ms",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      fontFamily: {
        sans: "var(--font-inter)",
        display: "var(--font-lexend)",
      },
      maxWidth: {
        "2xl": "40rem",
      },
      colors: {
        primary: {
          default: "#E50808",
          100: "#FDE5E5",
          200: "#F9B3B3",
          300: "#F58080",
          400: "#F14D4D",
          500: "#E50808",
          600: "#B10606",
          700: "#7E0505",
          800: "#4B0303",
          900: "#1E0101",
        },
        secondary: {
          default: "#071108",
          100: "#E3E6E4",
          200: "#BAC7BC",
          300: "#92A893",
          400: "#69896B",
          500: "#071108",
          600: "#050D06",
          700: "#040A05",
          800: "#020503",
          900: "#010201",
        },
        error: {
          default: "#FF6B6B",
          100: "#FFE5E5",
          200: "#FFB3B3",
          300: "#FF8080",
          400: "#FF4D4D",
          500: "#FF6B6B",
          600: "#CC5656",
          700: "#994040",
          800: "#662B2B",
          900: "#331515",
        },
        success: {
          default: "#4CAF50",
          100: "#E8F5E9",
          200: "#C8E6C9",
          300: "#A5D6A7",
          400: "#81C784",
          500: "#4CAF50",
          600: "#43A047",
          700: "#388E3C",
          800: "#2E7D32",
          900: "#1B5E20",
        },
        warn: {
          default: "#FFC107",
          100: "#FFF3CD",
          200: "#FFEBB3",
          300: "#FFE299",
          400: "#FFD966",
          500: "#FFC107",
          600: "#FFA000",
          700: "#FF8F00",
          800: "#FF6F00",
          900: "#E65100",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [formsPlugin, headlessuiPlugin, aspectRatio],
} satisfies Config;
