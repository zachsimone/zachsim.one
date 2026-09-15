export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        // Squarespace served the blog RSS feed on a query parameter; keep existing
        // subscribers working. _redirects can't match query strings.
        if (url.pathname === "/blog" && url.searchParams.get("format") === "rss") {
            return Response.redirect(new URL("/blog/rss.xml", url).href, 301);
        }
        return env.ASSETS.fetch(request);
    }
};
