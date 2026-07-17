# zachsim.one

Personal website and blog, statically generated with [Eleventy](https://www.11ty.dev) and hosted on Netlify. Migrated from Squarespace in July 2026 with all URLs preserved.

## Development

```sh
npm install
npm run serve    # local dev server at http://localhost:8080
npm run build    # output to _site/
```

## Writing a blog post

Add a markdown file to `src/blog/`. Front matter:

```yaml
---
title: "My New Post"
date: 2026-07-17T09:00:00+10:00
permalink: "/blog/2026/7/17/my-new-post.html"
layout: layouts/post.njk
tags: ["Swift"]
description: "Optional summary used for SEO and the RSS feed."
image: "/images/optional/og-image.png"
---
```

Conventions (kept from Squarespace for URL consistency):

- The permalink is `/blog/YYYY/M/D/slug.html` with **no zero-padding** on month or day. The `.html` suffix is required — Netlify serves the page at the extensionless URL (`/blog/2026/7/17/my-new-post`).
- Dates are AEST/AEDT; include the UTC offset.
- Post images live in `src/images/`.

## URL preservation

Every URL from the Squarespace sitemap (250 URLs) is preserved:

- 125 blog posts across both historical URL formats (`/blog/slug` and `/blog/YYYY/M/D/slug`), with original publish timestamps.
- 94 tag archives at `/blog/tag/Tag+Name` (Squarespace's `+`-for-space encoding). Ten tag URLs that were empty on Squarespace 301 to `/blog` (see `netlify.toml`).
- The RSS feed subscribers used at `/blog?format=rss` 301s to `/blog/rss.xml`.
- File downloads under `/s/` are hosted at their original paths.
- Pages are generated as `foo.html` (not `foo/index.html`) so canonical URLs have no trailing slash, exactly matching Squarespace.

Tag pages with names differing only by case (e.g. `wwdc` and `WWDC`) collide on macOS's case-insensitive filesystem, so a local `_site/` folds them into one file. Netlify builds on Linux where they are distinct — this only affects local previews.

## Deploying (done by Zach, manually)

1. Push this repository to GitHub and create a new Netlify site from it. `netlify.toml` supplies the build command, publish directory, and redirects.
2. Preview the deploy on the `*.netlify.app` URL. Worth checking:
   - a dated post (`/blog/2020/8/4/swiftui-map`) and a flat post (`/blog/airpods`)
   - a tag URL with a plus sign, e.g. `/blog/tag/Apple+Watch` (confirming Netlify serves `+` paths literally)
   - `/blog?format=rss` redirects to `/blog/rss.xml`
3. In Netlify → Domain management, add `zachsim.one` (primary) and `www.zachsim.one`, then point DNS away from Squarespace per Netlify's instructions. Only cancel the Squarespace subscription after DNS has cut over and the checks above pass on the live domain, because the Squarespace CDN image URLs die with the subscription (all images are rehosted locally here, so nothing on this site depends on them).
4. After cutover, in Google Search Console submit `https://zachsim.one/sitemap.xml`.
