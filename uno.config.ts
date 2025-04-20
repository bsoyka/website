import presetWind4 from '@unocss/preset-wind4'
import presetWebFonts from '@unocss/preset-web-fonts'
import {defineConfig} from 'unocss'

export default defineConfig({
    presets: [presetWind4(), presetWebFonts({
        provider: 'bunny', // Privacy-friendly Google Fonts alternative
        fonts: {
            sans: 'Space Grotesk'
        },
    })],
    theme: {
        colors: {
            primary: "#507dbc", secondary: "#51b0bd", light: "#f4f9f9", dark: "#04080f"
        }, font: {
            sans: "Space Grotesk, sans-serif"
        }
    }
})