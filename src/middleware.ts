import { defineMiddleware } from "astro:middleware";
import { isRemotePath } from "@astrojs/internal-helpers/path";

let assets:
  { fetch: (req: Request | URL | string) => Promise<Response> } | undefined;
let assetsPromise: Promise<void> | undefined;

async function initializeAssets() {
  // Return the existing promise if initialization is in progress
  if (assetsPromise) {
    return assetsPromise;
  }

  assetsPromise = (async () => {
    try {
      const { env } = await import("cloudflare:workers");
      assets = (env as any).ASSETS;
    } catch {
      // Not running on Cloudflare (e.g. local preview)
    }
  })();

  await assetsPromise;
}

// TODO: Temporary workaround for Astro v6 beta issue:
// https://github.com/withastro/astro/issues/15319
// Remove this middleware once the issue is fixed in a stable Astro release.
export const onRequest = defineMiddleware(async (ctx, next) => {
  // Detect Minnesota visitors via Cloudflare geolocation
  const cf = (ctx.request as any).cf as { region?: string } | undefined;
  if (cf?.region === "MN") {
    ctx.request.headers.set("x-is-minnesota", "1");
  }
  // Redirect bsoyka.me (and www.bsoyka.me) to the canonical domain bensoyka.com
  if (
    ctx.url.hostname === "bsoyka.me" ||
    ctx.url.hostname === "www.bsoyka.me"
  ) {
    const canonical = new URL(ctx.url);
    canonical.hostname = "bensoyka.com";
    return Response.redirect(canonical.toString(), 301);
  }
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
