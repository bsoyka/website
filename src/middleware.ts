import { defineMiddleware } from "astro:middleware";
import { isRemotePath } from "@astrojs/internal-helpers/path";

let assets:
  | { fetch: (req: Request | URL | string) => Promise<Response> }
  | undefined;
let assetsInitialized = false;

async function initializeAssets() {
  if (assetsInitialized) return;
  assetsInitialized = true;

  try {
    const { env } = await import("cloudflare:workers");
    assets = (env as any).ASSETS;
  } catch {
    // Not running on Cloudflare (e.g. local preview)
  }
}

export const onRequest = defineMiddleware(async (ctx, next) => {
  if (ctx.url.pathname === "/_image") {
    await initializeAssets();

    const href = ctx.url.searchParams.get("href");
    if (!href) {
      return new Response("Missing 'href' query parameter", {
        status: 400,
      });
    }

    if (isRemotePath(href)) {
      return Response.redirect(href, 302);
    }

    const proxied = new URL(href, ctx.url.origin);
    if (proxied.origin !== ctx.url.origin) {
      return new Response("Forbidden", { status: 403 });
    }

    if (assets) {
      return assets.fetch(proxied);
    }

    // Fallback for local preview
    return fetch(proxied);
  }

  return next();
});
