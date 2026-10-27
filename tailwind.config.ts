import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#000000",
          subtle: "#09090b",
          elevated: "#121215",
          glass: "rgba(18, 18, 22, 0.65)",
        },
        titanium: {
          50: "#f6f6f7",
          100: "#e5e5e8",
          200: "#d1d1d6",
          300: "#a1a1aa",
          400: "#71717a",
          500: "#52525b",
          600: "#3f3f46",
          700: "#27272a",
          800: "#18181b",
          900: "#0f0f12",
        },
        apple: {
          blue: "#2997ff",
          green: "#30d158",
          orange: "#ff9f0a",
          red: "#ff453a",
          purple: "#bf5af2",
          teal: "#64d2ff",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "SF Pro Display",
          "-apple-system",
          "BlinkMacSystemFont",
          "Space Grotesk",
          "Inter",
          "sans-serif",
        ],
        mono: [
          "SF Mono",
          "JetBrains Mono",
          "GeistMono",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        "apple-glass": "0 24px 48px -12px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
        "apple-subtle": "0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
        "glow-subtle": "0 0 40px -10px rgba(41, 151, 255, 0.15)",
        "glow-green": "0 0 40px -10px rgba(48, 209, 88, 0.18)",
      },
      transitionTimingFunction: {
        "apple-spring": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
