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
      padding: "1.25rem",
      screens: { "2xl": "1280px" }
    },
    extend: {
      colors: {
        // Brand & Build Guide v1.0 — exact hex
        background: "#fafaf7",       // Chalk
        foreground: "#0a0a0b",       // Ink
        muted: "#f3f0eb",            // Slightly darker Chalk for subtle surfaces
        mutedForeground: "#737070",  // Concrete
        accent: "#ff5a1f",           // Track Orange
        accentForeground: "#fafaf7", // Chalk on orange
        border: "#e6e2dc",           // Hairline
        ring: "#ff5a1f",             // Track Orange focus ring
        paceMint: "#5dd39e",         // Streaks, success, "going" RSVPs
        laneSky: "#3284c4"           // Sponsorship, info
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"]
      },
      borderRadius: {
        sm: "0.375rem",  // 6px chips
        md: "0.625rem",  // 10px buttons
        lg: "0.875rem",  // 14px cards
        xl: "1.5rem"     // 24px modals
      },
      letterSpacing: {
        tightest: "-0.02em",
        eyebrow: "0.18em"
      },
      boxShadow: {
        soft: "0 8px 30px rgba(10, 10, 11, 0.08)"
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
