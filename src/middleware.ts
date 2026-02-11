import { defineMiddleware } from "astro:middleware";
import { isRemotePath } from "@astrojs/internal-helpers/path";

export const onRequest = defineMiddleware(async (ctx, next) => {
  if (ctx.url.pathname === "/_image") {
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

    return fetch(proxied);
  }

  return next();
});