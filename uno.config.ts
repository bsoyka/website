import { defineConfig, presetWebFonts, presetWind4 } from "unocss";

export default defineConfig({
  presets: [
    presetWind4(),
    presetWebFonts({
      provider: "bunny", // Privacy-friendly Google Fonts alternative
      fonts: {
        sans: {
          name: "Space Grotesk",
          weights: [300, 400, 500, 600, 700],
        },
      },
    }),
  ],
  theme: {
    colors: {
      primary: "#507dbc",
      secondary: "#51b0bd",
      light: "#f4f9f9",
      dark: "#04080f",
    },
    font: {
      sans: "Space Grotesk, sans-serif",
    },
  },
  shortcuts: {
    "btn-primary":
      "p-2.5 bg-primary color-white rounded-lg shadow-sm hover:shadow-lg",
    "btn-primary-outline":
      "p-2.5 border border-primary color-primary rounded-lg shadow-sm hover:shadow-lg",
  },
});
