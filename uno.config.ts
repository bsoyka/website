import presetMini from '@unocss/preset-mini'
import presetWebFonts from '@unocss/preset-web-fonts'
import {defineConfig} from 'unocss'

export default defineConfig({
    presets: [presetMini(), presetWebFonts({
        provider: 'bunny', // Privacy-friendly Google Fonts alternative
        fonts: {
            // Extends default theme
            sans: 'Space Grotesk'
        },
    })],
    theme: {
        colors: {
            primary: "#507dbc", secondary: "#51b0bd", light: "#f4f9f9", dark: "#04080f"
        }
    }
})