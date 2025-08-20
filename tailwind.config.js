module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "galactic-tealgt-85-c1f1ef": "var(--galactic-tealgt-85-c1f1ef)",
        "intergalactic-purpuleip40": "var(--intergalactic-purpuleip40)",
        "lightcolorbrandprimary-fc7a69": "var(--lightcolorbrandprimary-fc7a69)",
        "lightcolortext-03": "var(--lightcolortext-03)",
        "space-yellowsy-75-fad785": "var(--space-yellowsy-75-fad785)",
        "space-yellowsy40": "var(--space-yellowsy40)",
        "spacefiresf-60": "var(--spacefiresf-60)",
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
      fontFamily: {
        "body-b-3-regular-eu-bodysmall":
          "var(--body-b-3-regular-eu-bodysmall-font-family)",
        "headline-h1-demibold-eu-headinglarge":
          "var(--headline-h1-demibold-eu-headinglarge-font-family)",
        "headline-h3-demibold-eu-headingsmall":
          "var(--headline-h3-demibold-eu-headingsmall-font-family)",
        "hero-h1-bold-eu-herolarge":
          "var(--hero-h1-bold-eu-herolarge-font-family)",
        "hero-h2-bold-eu-heromedium":
          "var(--hero-h2-bold-eu-heromedium-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
