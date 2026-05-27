import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" }
    },
    extend: {
      colors: {
        background: "hsl(0 0% 100%)",
        foreground: "hsl(20 14% 4%)",
        muted: "hsl(60 5% 96%)",
        mutedForeground: "hsl(25 5% 45%)",
        accent: "hsl(16 100% 50%)",
        accentForeground: "hsl(0 0% 100%)",
        border: "hsl(20 6% 90%)",
        ring: "hsl(16 100% 50%)"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"]
      },
      borderRadius: {
        lg: "0.875rem",
        md: "0.625rem",
        sm: "0.375rem"
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
