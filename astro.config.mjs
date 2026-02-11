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
        "/conduct": "https://github.com/bsoyka/policy/blob/main/code-of-conduct.md",
        "/privacy": "https://github.com/bsoyka/policy/blob/main/privacy-policy.md",
        "/security": "https://github.com/bsoyka/policy/blob/main/security-policy.md",
        "/pay/%C2%A0": "https://bsoyka.me/pay",
    }
});
