import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f1f4f8",
          100: "#dee5ee",
          200: "#bcc9d8",
          300: "#8ea4bd",
          400: "#5d7a9f",
          500: "#3d5d85",
          600: "#2b4869",
          700: "#1e3a5f",
          800: "#142a47",
          900: "#0c2340",
          950: "#06152a",
        },
        steel: {
          50: "#f6f7f9",
          100: "#ebedf1",
          200: "#d4d9e0",
          300: "#aeb6c2",
          400: "#828d9d",
          500: "#637084",
          600: "#4f5a6d",
          700: "#414958",
          800: "#383f4b",
          900: "#323741",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(12, 35, 64, 0.06), 0 4px 12px rgba(12, 35, 64, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
