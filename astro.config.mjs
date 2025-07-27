// @ts-check
import {defineConfig} from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import UnoCSS from 'unocss/astro';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    integrations: [
        UnoCSS({
            injectReset: true
        }),
        svelte()
    ],

    adapter: cloudflare(),

    redirects: {
        "/privacy": "https://github.com/bsoyka/policy/blob/main/privacy-policy.md",
    }
});