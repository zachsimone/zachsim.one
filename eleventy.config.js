import { DateTime } from "luxon";

const TZ = "Australia/Sydney";

function toSydney(date) {
    return DateTime.fromJSDate(date, { zone: "utc" }).setZone(TZ);
}

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({
        "src/assets": "assets",
        "src/images": "images",
        "src/s": "s",
        "src/favicon.ico": "favicon.ico"
    });

    eleventyConfig.addFilter("readableDate", (date) =>
        toSydney(date).toFormat("d LLLL yyyy")
    );

    eleventyConfig.addFilter("isoDate", (date) =>
        toSydney(date).toISO({ suppressMilliseconds: true })
    );

    eleventyConfig.addFilter("rfc822Date", (date) =>
        toSydney(date).toFormat("EEE, dd LLL yyyy HH:mm:ss ZZZ")
    );

    eleventyConfig.addFilter("w3cDate", (date) =>
        toSydney(date).toFormat("yyyy-MM-dd")
    );

    // Squarespace tag URLs percent-encode then use '+' for spaces (Python
    // urllib.parse.quote semantics, not encodeURIComponent — parentheses and
    // apostrophes are escaped too).
    const tagToUrl = (tag) =>
        Array.from(tag, (ch) =>
            /[A-Za-z0-9_.~-]/.test(ch)
                ? ch
                : ch === " "
                    ? "+"
                    : Array.from(new TextEncoder().encode(ch), (b) =>
                        "%" + b.toString(16).toUpperCase().padStart(2, "0")
                    ).join("")
        ).join("");
    eleventyConfig.addFilter("tagToUrl", tagToUrl);

    eleventyConfig.addFilter("absoluteContentUrls", (html, base) =>
        html.replace(/(href|src)="\/(?!\/)/g, `$1="${base}/`)
    );

    eleventyConfig.addFilter("absoluteUrl", (path, base) =>
        new URL(path, base).href
    );

    // The Squarespace site's canonical URLs have no .html suffix and no
    // trailing slash; Netlify serves foo.html for /foo.
    eleventyConfig.addFilter("canonical", (url) => {
        if (url === "/" || url === "/index.html") return "/";
        return url.replace(/\/index\.html$/, "").replace(/\.html$/, "");
    });

    eleventyConfig.addCollection("posts", (api) =>
        api.getFilteredByGlob("src/blog/*.md").sort((a, b) => b.date - a.date)
    );

    eleventyConfig.addCollection("microblogPosts", (api) =>
        api.getFilteredByGlob("src/microblog/*.md").sort((a, b) => b.date - a.date)
    );

    eleventyConfig.addCollection("tagList", (api) => {
        const tags = new Map();
        for (const post of api.getFilteredByGlob("src/blog/*.md")) {
            for (const tag of post.data.tags ?? []) {
                if (!tags.has(tag)) {
                    tags.set(tag, []);
                }
                tags.get(tag).push(post);
            }
        }
        return Array.from(tags, ([name, posts]) => ({
            name,
            posts: posts.sort((a, b) => b.date - a.date)
        })).sort((a, b) => a.name.localeCompare(b.name));
    });

    eleventyConfig.addCollection("tagPageUrls", (api) => {
        const tags = new Set();
        for (const post of api.getFilteredByGlob("src/blog/*.md")) {
            for (const tag of post.data.tags ?? []) {
                tags.add(tag);
            }
        }
        return Array.from(tags, (t) => `/blog/tag/${tagToUrl(t)}`).sort();
    });

    eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

    eleventyConfig.addFilter("head", (arr, n) => arr.slice(0, n));

    eleventyConfig.addFilter("postYearSydney", (date) => toSydney(date).year);

    eleventyConfig.setLiquidOptions({ jsTruthy: true });

    eleventyConfig.amendLibrary("md", (md) => md.set({ html: true }));

    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site"
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk"
    };
}
