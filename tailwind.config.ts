import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF8F5", // Warm Alabaster
        surface: "#F3EFEA",    // Soft Editorial Sand
        brand: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          600: "#0D9488",
          700: "#0F766E",      // Primary Healing Teal
          800: "#115E59",
          900: "#134E4A",
        },
        accent: {
          50: "#FFFBEB",
          500: "#F59E0B",
          600: "#D97706",      // Sunrise Amber
        },
        ink: {
          900: "#0F172A",      // Deep Slate Ink
          600: "#475569",      // Muted Editorial Gray
          400: "#94A3B8",
        },
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "apple-mesh":
          "radial-gradient(at 15% 15%, rgba(15, 118, 110, 0.08) 0px, transparent 55%), radial-gradient(at 85% 20%, rgba(217, 119, 6, 0.07) 0px, transparent 50%), radial-gradient(at 50% 85%, rgba(204, 251, 241, 0.4) 0px, transparent 60%)",
        "dark-mesh":
          "radial-gradient(at 20% 20%, rgba(13, 148, 136, 0.25) 0px, transparent 55%), radial-gradient(at 80% 80%, rgba(217, 119, 6, 0.15) 0px, transparent 50%)",
      },
      boxShadow: {
        apple: "0 10px 40px -10px rgba(15, 23, 42, 0.06)",
        "apple-hover": "0 20px 50px -12px rgba(15, 118, 110, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;