# NEXVERR TECHNOLOGIES — Website

**IDEATE • BUILD • SCALE** — Business digitalization and custom software, from Erode, Tamil Nadu.

Corporate site, project portfolio and inquiry front end. Frontend only: no backend, no
database, no CRM, no paid APIs. Inquiries are handed off to WhatsApp or the visitor's own
email client.

React · TypeScript · Vite · Tailwind · React Router · Framer Motion · React Hook Form · Zod

---

## Before you launch

### 1. Set the environment values

Edit `.env` (and the same keys in the hosting dashboard — Vite inlines them at build time,
so a change needs a rebuild):

```
VITE_WHATSAPP_NUMBER=91XXXXXXXXXX     # digits only, with country code
VITE_CONTACT_EMAIL=you@nexverrtech.com
VITE_CONTACT_PHONE=                   # optional, e.g. +91 99999 99999
VITE_SITE_URL=https://nexverrtech.com # canonical origin, no trailing slash
VITE_GA_MEASUREMENT_ID=               # optional, G-XXXXXXXXXX
```

While a value is blank the site hides what depends on it rather than rendering something
wrong: no WhatsApp button without a number, no phone row without a phone, no analytics
script (and no cookies) without a measurement ID. They are read in exactly one place,
`src/lib/config.ts`.

`VITE_SITE_URL` is the one that matters most — every canonical tag, OpenGraph URL and
sitemap entry is built from it, and the build fails loudly if it is not a bare `https://`
origin.

### 2. Regenerate the brand files if the logo changes

Master file: `brand/logo-master.png` (transparent PNG, any size).

```bash
npm run brand
npm run og
```

`brand` writes the mark, favicon and iOS icon; `og` writes one 1200×630 social card per
entry in `src/lib/ogCards.ts`. Both are hand-rolled PNG pipelines — no image dependency.

### 3. Add the real project screenshots

`public/projects/<project-slug>/` is where they go. Add them to the `screenshots` array in
`src/data/projects.ts` with width and height, and the case study starts showing them
instead of the branded placeholder. Nothing else changes.

---

## Running it

```bash
npm install
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:5173 |
| `npm run build` | Type-check, build, then generate every SEO artefact |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Types only, no build |
| `npm run seo:check` | Audit `dist/` for SEO problems (run after a build) |
| `npm run brand` | Regenerate `public/brand/*` from the master logo |
| `npm run og` | Regenerate `public/og/*` social cards |

> **Deploy setting:** the hosting build command must be `npm run build`, not `vite build`.
> The latter skips SEO generation, and the deploy ships with no sitemap, no `robots.txt`,
> no `404.html` and identical tags on every URL.

> **Windows note:** if `npm install` fails with `ERR_INVALID_ARG_TYPE`, your shell is
> missing `ComSpec`. Run `set ComSpec=C:\Windows\System32\cmd.exe` (cmd) or
> `$env:ComSpec="C:\Windows\System32\cmd.exe"` (PowerShell) first.

---

## Site structure

```
/                        Home
/services                Catalog of 20 services, filterable by capability group
/services/:slug          One page per service
/solutions               Industries
/solutions/:slug         One page per industry
/projects                Delivered client work
/projects/:slug          Case study
/blog                    Insights
/blog/:slug              Article
/about  /contact  /privacy-policy  /terms-and-conditions
/404                     Also written to dist/404.html
```

---

## SEO architecture

Four things have to agree: the tags a visitor's browser ends up with, the tags baked into
the static HTML, the visible breadcrumb trail, and the URL list in `sitemap.xml`. All four
come from the same place.

- **`src/lib/routeSeo.ts`** — every route's title, description, canonical path, social
  card, breadcrumb trail and structured data. It imports *types* only, never content
  collections, because the homepage imports it.
- **`src/lib/siteRoutes.ts`** — the full list, assembled from the content collections. Only
  the build script imports this.
- **`scripts/build-seo.mjs`** — runs after `vite build`. Writes one real HTML file per route
  with that route's own `<title>`, description, canonical, OpenGraph tags and JSON-LD
  already in the markup, plus `sitemap.xml`, `robots.txt` and `404.html`. It fails the build
  on a duplicate title or description.
- **`scripts/check-seo.mjs`** — reads `dist/` the way a crawler would and fails on missing
  or duplicated metadata, a canonical pointing at the wrong URL, a social card that was
  never rendered, JSON-LD that does not parse, or a sitemap URL with no page behind it.

The injected tags carry `data-nx-seo`, the same marker the runtime head manager
(`src/lib/seo.ts`) uses, so React replaces them on client-side navigation rather than
duplicating them.

To add a page: add it to `routeSeo.ts`, add it to `siteRoutes.ts`, point the page's
`useSeo()` at the entry, and it appears in the prerender, the sitemap and the breadcrumbs
together.

---

## Where things live

```
src/
├── components/
│   ├── hero/         Hero; the animated scene is a lazy chunk
│   ├── sections/     Page sections (FAQ, related links, CTA, 404 body…)
│   ├── cards/        Service, solution, project, team cards
│   ├── forms/        Inquiry form, modal, Zod schema
│   ├── navigation/   Navbar, mobile menu, breadcrumbs, footer
│   ├── effects/      Reveal, ambient glow, floating WhatsApp
│   └── ui/           Button, Modal, Container, Logo, SmartImage, Preloader…
├── data/             ALL CONTENT LIVES HERE — edit these, not JSX
├── lib/              config, seo, routeSeo, siteRoutes, analytics, whatsapp, email
├── hooks/            seo, analytics, media queries, reduced motion, parallax
├── pages/            One file per route
├── routes/           Route table (lazy-loaded)
└── styles/           tokens · globals · animations · responsive
```

### Editing content

| What | File |
| --- | --- |
| Service catalog + per-service search copy | `src/data/services.ts` |
| Long-form service page content (problem, benefits, use cases, FAQs) | `src/data/serviceContent.ts` |
| Industries and their solution pages | `src/data/industries.ts` |
| Projects / case studies | `src/data/projects.ts` |
| Articles | `src/data/blog.ts` |
| Privacy policy and terms | `src/data/legal.ts` |
| Homepage capability groups | `src/data/solutions.ts` |
| Founding team | `src/data/team.ts` |
| Office locations | `src/data/branches.ts` |
| Client logos | `src/data/companies.ts` (empty — the strip appears when filled) |
| Nav + footer links | `src/data/navigation.ts` |
| Social card definitions | `src/lib/ogCards.ts` |
| Brand name, tagline, URL, contact config | `src/lib/config.ts` |
| Colours, spacing, motion timings | `src/styles/tokens.css` |

---

## Analytics

Frontend only. `src/lib/analytics.ts` loads gtag.js once, sends a `page_view` per route
change (the SPA never reloads, so GA's automatic one would fire exactly once), and reports:

`contact_click` · `whatsapp_click` · `email_click` · `phone_click` · `form_start` ·
`form_submit` · `service_cta_click` · `project_cta_click` · `start_project_click`

With `VITE_GA_MEASUREMENT_ID` unset, every one of those is a no-op.

---

## Deploying

Static build — any CDN host works. Build command `npm run build`, output directory `dist`.

`vercel.json` sets `cleanUrls`, `trailingSlash: false`, cache headers and the security
headers (HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy`, CSP).

**There is deliberately no catch-all rewrite to `/index.html`.** Every real route is
prerendered as its own HTML file, so the host serves those directly, and an unknown URL
falls through to `dist/404.html` — which means a real 404 status instead of the homepage
answered with 200. Adding a rewrite back would turn every mistyped URL into a soft 404.

On a host other than Vercel, reproduce the same three things: serve the prerendered
directories, serve `404.html` with a 404 status for anything unmatched, and do not rewrite
everything to `index.html`.

---

## Performance notes

- **Critical path**: HTML + CSS + the React chunk + the app chunk. The animation library
  (~39 kB gzipped) and the form libraries (~23 kB gzipped) are behind lazy boundaries and
  are fetched after first paint, or on interaction.
- **The hero heading has no entrance animation.** It is the LCP element on most visits;
  fading it in would add that delay to every page load.
- **The preloader holds for two frames**, not a fixed duration — `index.html` paints the
  mark before the bundle arrives, so the sequence still reads as one brand moment.
- **`Reveal` is CSS plus one IntersectionObserver per element**, not an animated component,
  because a long page holds dozens of them.
- **Images** carry intrinsic width and height, are lazy except where marked `priority`, and
  fall back to a branded panel when the file does not exist yet (`SmartImage`).
- Everything decorative collapses under `prefers-reduced-motion`.

---

## Notes on how it is built

- **No invented content.** Client names, project results, statistics, testimonials, ratings,
  phone numbers and addresses are absent unless verified. Empty data renders an honest
  empty state or nothing at all, never filler.
- **No false confirmations.** With no backend, the form says your inquiry is *ready to
  send* and hands it to WhatsApp or your email app. It never claims receipt.
- **Structured data matches the page.** FAQ schema is only emitted where the questions are
  visible; no review, rating, award or price schema appears anywhere.
- **Accessibility.** Semantic landmarks, one `<h1>` per page, skip link, visible
  breadcrumbs, focus-trapped modal with ESC, labelled fields with `aria-invalid` and
  `role="alert"` errors, 44px touch targets, and measured colour contrast.

---

## Still needs client input

- Real screenshots for both case studies (`public/projects/<slug>/`).
- Verified features, technology and outcomes per project — the case studies deliberately
  omit these sections until the detail is confirmed.
- Social profile URLs for the footer and `sameAs` (`siteConfig.socialProfiles`).
- A verified street address and phone number, if the business wants them published.
- Client logo files and permission to display them (`src/data/companies.ts`).
- A GA4 measurement ID, if analytics is wanted.
