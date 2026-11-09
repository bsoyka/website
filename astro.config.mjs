// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import UnoCSS from "unocss/astro";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    svelte(),
  ],

  adapter: cloudflare(),

  redirects: {
    "/conduct": "https://github.com/bsoyka/policy/blob/main/code-of-conduct.md",
    "/privacy": "https://github.com/bsoyka/policy/blob/main/privacy-policy.md",
    "/security":
      "https://github.com/bsoyka/policy/blob/main/security-policy.md",
    "/pay/%C2%A0": "https://bensoyka.com/pay",
    "/assets/profile-photo.jpg": "https://assets.bensoyka.com/photo/casual.jpg",
    "/cv.pdf": "https://assets.bensoyka.com/doc/cv.pdf",
    // Keys moved to keys.bensoyka.com (bsoyka/keys); keep old links working.
    "/key.asc": "https://keys.bensoyka.com/pgp.asc",
    "/key.txt": "https://keys.bensoyka.com/pgp.asc",
    "/oldkey.asc":
      "https://keys.bensoyka.com/pgp/0CA7CC16A64B68F3048EE8FEA5E726D5A65228EA.asc",
    "/proof.txt": "https://keys.bensoyka.com/keys.txt",
    "/security.txt": "/.well-known/security.txt",
  },
});
