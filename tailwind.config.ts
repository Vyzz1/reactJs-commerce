/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

export const content = [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./app/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}",
];
export const prefix = "";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      "spin-around": {
        "0%": {
          transform: "translateZ(0) rotate(0)",
        },
        "15%, 35%": {
          transform: "translateZ(0) rotate(90deg)",
        },
        "65%, 85%": {
          transform: "translateZ(0) rotate(270deg)",
        },
        "100%": {
          transform: "translateZ(0) rotate(360deg)",
        },
        "border-spin": {
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
      },
      shimmer: {
        from: {
          backgroundPosition: "0 0",
        },
        to: {
          backgroundPosition: "-200% 0",
        },
      },
      scroll: {
        to: {
          transform: "translate(calc(-50% - 0.5rem))",
        },
      },
      "caret-blink": {
        "0%,70%,100%": { opacity: "1" },
        "20%,50%": { opacity: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      shimmer: "shimmer 2s linear infinite",
      "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
      slide: "slide var(--speed) ease-in-out infinite alternate",
      scroll:
        "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      "border-spin": "border-spin 7s linear infinite",
      "caret-blink": "caret-blink 1.25s ease-out infinite",
    },

    fontFamily: {
      sans: ["Fira Sans", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
      beViet: ["Be Vietnam Pro", "sans-serif"],
      lato: ["Lato", "sans-serif"],
    },
    plugins: {
      addVariablesForColors,
    },
    gridTemplateColumns: {
      200: "repeat(auto-fit, minmax(350px, 1fr))",
    },
    slide: {
      to: {
        transform: "translate(calc(100cqw - 100%), 0)",
      },
    },
  },
};
// eslint-disable-next-line @typescript-eslint/no-require-imports
export const plugins = [require("tailwindcss-animate"), addVariablesForColors];
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
