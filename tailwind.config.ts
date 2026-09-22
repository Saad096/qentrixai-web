import type { Config } from "tailwindcss";

/**
 * Aurora (2026-09-20). Every colour is a semantic token backed by a CSS
 * variable in globals.css, so components never name a hue and both themes
 * come free. The previous iris `brand-50..900` ramp is gone.
 *
 * Theme switching is `.light` on <html>; dark is the default at :root.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: ["selector", ":root:not(.light)"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--color-surface) / <alpha-value>)",
          2: "rgb(var(--color-surface-2) / <alpha-value>)",
        },
        text: "rgb(var(--color-text) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        "text-2": "rgb(var(--color-text-2) / <alpha-value>)",
        brand: "rgb(var(--color-brand) / <alpha-value>)",
        link: "rgb(var(--color-link) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "on-brand": "rgb(var(--color-on-brand) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        warn: "rgb(var(--color-warn) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
        n: {
          0: "rgb(var(--n-0) / <alpha-value>)",
          50: "rgb(var(--n-50) / <alpha-value>)",
          100: "rgb(var(--n-100) / <alpha-value>)",
          200: "rgb(var(--n-200) / <alpha-value>)",
          300: "rgb(var(--n-300) / <alpha-value>)",
          400: "rgb(var(--n-400) / <alpha-value>)",
          500: "rgb(var(--n-500) / <alpha-value>)",
          600: "rgb(var(--n-600) / <alpha-value>)",
          700: "rgb(var(--n-700) / <alpha-value>)",
          800: "rgb(var(--n-800) / <alpha-value>)",
          900: "rgb(var(--n-900) / <alpha-value>)",
          850: "rgb(var(--n-850) / <alpha-value>)",
          950: "rgb(var(--n-950) / <alpha-value>)",
          1000: "rgb(var(--n-1000) / <alpha-value>)",
        },
      },
      borderColor: {
        DEFAULT: "var(--color-border)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        xs: ["var(--text-xs)", { lineHeight: "1.45" }],
        sm: ["var(--text-sm)", { lineHeight: "1.5" }],
        base: ["var(--text-base)", { lineHeight: "1.6" }],
        md: ["var(--text-md)", { lineHeight: "1.6" }],
        lg: ["var(--text-lg)", { lineHeight: "1.5" }],
        xl: ["var(--text-xl)", { lineHeight: "1.32", letterSpacing: "-0.02em" }],
        "2xl": ["var(--text-2xl)", { lineHeight: "1.2", letterSpacing: "-0.025em" }],
        // 1.05 was set for a single-line heading and nearly every heading on
        // the site wraps to two or three. At that leading the lines touch.
        "3xl": ["var(--text-3xl)", { lineHeight: "1.14", letterSpacing: "-0.03em" }],
        hero: ["var(--text-hero)", { lineHeight: "1.04", letterSpacing: "-0.035em" }],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        1: "var(--shadow-1)",
        2: "var(--shadow-2)",
        3: "var(--shadow-3)",
      },
      maxWidth: {
        container: "1260px",
        measure: "62ch",
      },
    },
  },
  plugins: [],
};

export default config;
