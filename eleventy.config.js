import fs from "node:fs";
import path from "node:path";
import { DateTime } from "luxon";

const TZ = "Australia/Sydney";

// Assets referenced only by hidden posts must not ship: passthrough copy is
// all-or-nothing per directory, so they are pruned from the output instead.
function hiddenOnlyAssets() {
    const assetRefs = (text) =>
        new Set(Array.from(text.matchAll(/\/(?:images|s)\/[^\s"')\]]+/g), (m) =>
            decodeURIComponent(m[0])
        ));
    const visible = new Set();
    const hidden = new Set();
    const skip = new Set(["src/images", "src/s", "src/assets", "src/_data"]);
    const walk = (root) => {
        for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
            const full = path.join(root, entry.name);
            if (entry.isDirectory()) {
                if (!skip.has(full)) walk(full);
                continue;
            }
            if (!/\.(md|njk)$/.test(entry.name)) continue;
            const text = fs.readFileSync(full, "utf8");
            const fm = text.match(/^---\n[\s\S]*?\n---/);
            const isHidden = fm ? /^hidden:\s*true\s*$/m.test(fm[0]) : false;
            for (const ref of assetRefs(text)) {
                (isHidden ? hidden : visible).add(ref);
            }
        }
    };
    walk("src");
    return new Set([...hidden].filter((ref) => !visible.has(ref)));
}

// images/ and s/ are synced here rather than via addPassthroughCopy so that
// hidden-only assets can be filtered out (passthrough copy races with the
// eleventy.after event, so post-copy deletion is unreliable).
function syncAssets(srcRoot, outputDir, urlPrefix, excluded) {
    const srcFiles = new Map();
    const collect = (dir) => {
        if (!fs.existsSync(dir)) return;
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                collect(full);
            } else {
                const url = urlPrefix + "/" + path.relative(srcRoot, full).split(path.sep).join("/");
                if (!excluded.has(url)) srcFiles.set(url, full);
            }
        }
    };
    collect(srcRoot);

    for (const [url, src] of srcFiles) {
        const dest = path.join(outputDir, url);
        const s = fs.statSync(src);
        const d = fs.existsSync(dest) ? fs.statSync(dest) : null;
        if (!d || d.size !== s.size || d.mtimeMs < s.mtimeMs) {
            fs.mkdirSync(path.dirname(dest), { recursive: true });
            fs.copyFileSync(src, dest);
        }
    }

    const prune = (dir) => {
        if (!fs.existsSync(dir)) return;
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                prune(full);
                if (fs.readdirSync(full).length === 0) fs.rmdirSync(full);
            } else {
                const url = "/" + path.relative(outputDir, full).split(path.sep).join("/");
                if (!srcFiles.has(url)) fs.rmSync(full);
            }
        }
    };
    prune(path.join(outputDir, urlPrefix.replace(/^\//, "")));
}

function toSydney(date) {
    return DateTime.fromJSDate(date, { zone: "utc" }).setZone(TZ);
}

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({
        "src/assets": "assets",
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

    eleventyConfig.on("eleventy.after", ({ dir }) => {
        const excluded = hiddenOnlyAssets();
        syncAssets("src/images", dir.output, "/images", excluded);
        syncAssets("src/s", dir.output, "/s", excluded);
    });

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
